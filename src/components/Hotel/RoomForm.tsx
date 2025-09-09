import { ChangeEvent, useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import classes from "./RoomForm.module.css";
import {
  DATA_NOT_CHANGED,
  DATA_REQUIRED,
  IMAGE_REQUIRED,
  MAX_FILE_SIZE,
  MAX_IMAGE_COUNT,
  MAX_ROOM_PHOTO,
  THIS_IMAGE_ALREADY_EXISTS,
  TOO_LAGE_FILE_SIZE,
  VALID_IMAGE_TYPES,
} from "../../constants";
import { closeIcon, CustomButton, InputField } from "../Custom";
import { useAppDispatch } from "../../hooks";
import { SetError } from "../../redux";
import { IUpdateRoomProps } from "../../interfaces";

type InitialDnDStateType = {
  draggedFrom: number | null;
  draggedTo: number | null;
  isDragging: boolean;
  originalOrder: string[];
  updatedOrder: string[];
};

type RoomFormProps = {
  images: string[];
  description?: string;
  isEnabled?: boolean;
  onCancel: () => void;
  onSubmit: (newRoom: IUpdateRoomProps) => Promise<void>;
};

export const RoomForm = (props: RoomFormProps) => {
  const initialDnDState: InitialDnDStateType = {
    draggedFrom: null,
    draggedTo: null,
    isDragging: false,
    originalOrder: [],
    updatedOrder: [],
  };
  const [fileData, setFileData] = useState<string[]>(props.images);
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);
  const [updated, setUpdated] = useState(false);
  const uploadRef = useRef<HTMLInputElement>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const dispatch = useAppDispatch();
  const [description, setDescription] = useState(props.description);
  const [hasError, setError] = useState<string>("");
  const [isChecked, setChecked] = useState<boolean>(false);
  const [enabled, setEnabled] = useState(props.isEnabled);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage("");
  };

  const onDragStart = (event: React.DragEvent<HTMLLIElement>) => {
    const initialPosition = Number(event.currentTarget.dataset.position);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: fileData,
    });
    event.dataTransfer.setData("text/html", "");
  };

  const onDragOver = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();
    let newList = dragAndDrop.originalOrder;
    const draggedFrom = dragAndDrop.draggedFrom;
    const draggedTo = Number(event.currentTarget.dataset.position);
    const fileDragged = newList[draggedFrom ? draggedFrom : 0];
    const remainingFiles = newList.filter(
      (item, index) => index !== draggedFrom
    );
    newList = [
      ...remainingFiles.slice(0, draggedTo),
      fileDragged,
      ...remainingFiles.slice(draggedTo),
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo,
      });
    }
  };

  const onDrop = () => {
    setFileData(dragAndDrop.updatedOrder);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    });
  };

  const onDragLeave = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null,
    });
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const setImageInArray = (file: File) => {
    if (file) {
      if (!VALID_IMAGE_TYPES.includes(file.type)) {
        dispatch(SetError(IMAGE_REQUIRED));
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        dispatch(SetError(TOO_LAGE_FILE_SIZE));
        return;
      }
      const reader = new FileReader();
      const newList = fileData;
      reader.onloadend = () => {
        if (reader.result) {
          if (newList.includes(reader.result.toString())) {
            dispatch(SetError(THIS_IMAGE_ALREADY_EXISTS));
            return;
          }

          if (newList.length >= MAX_ROOM_PHOTO) {
            dispatch(SetError(MAX_IMAGE_COUNT + " - " + MAX_ROOM_PHOTO));
            return;
          }

          newList.push(reader.result.toString());
          dispatch(SetError(""));
          setFileData(newList);
          setUpdated(!updated);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteImage = (deletedIndex: number) => {
    const newList = fileData.filter((item, index) => index !== deletedIndex);
    setFileData(newList);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    setImageInArray(file);
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) {
      return;
    }
    setImageInArray(event.target.files[0]);
  };

  useEffect(() => {}, [fileData, updated]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDescription(value);
    if (value) {
      setError("");
      dispatch(SetError(""));
      setChecked(true);
    } else {
      setError(DATA_REQUIRED);
      dispatch(SetError(DATA_REQUIRED));
      setChecked(false);
    }
  };

  const handleNullLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (description) {
      setChecked(true);
      setError("");
      dispatch(SetError(""));
    } else {
      setError(DATA_REQUIRED);
      dispatch(SetError(DATA_REQUIRED));
      setChecked(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      JSON.stringify(fileData) === JSON.stringify(props.images) &&
      description === props.description &&
      enabled === props.isEnabled
    ) {
      dispatch(SetError(DATA_NOT_CHANGED));
    } else {
      await props.onSubmit({
        images: fileData,
        description: description,
        isEnabled: enabled,
      });
    }
  };

  return (
    <>
      <form
        className={classes["room-form"]}
        autoComplete="on"
        onFocus={handleNullLogin}
        onSubmit={(e) => {
          if (isChecked) handleSubmit(e);
        }}
        onReset={() => {
          props.onCancel();
        }}
      >
        <section className={classes["insert-field"]}>
          <div
            className={classes["insert-wrap"]}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <p onClick={() => uploadRef.current?.click()}>+</p>
            <input
              type="file"
              ref={uploadRef}
              onChange={handleUpload}
              className={classes["input-field"]}
            />
          </div>
          <ul className={classes["images-wrap"]}>
            {fileData.map((file, index) => {
              return (
                <li
                  className={classes["room-image-wrap"]}
                  key={index}
                  data-position={index}
                  draggable
                  onDragStart={onDragStart}
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                  onDragLeave={onDragLeave}
                >
                  <button
                    className={classes["close-button"]}
                    onClick={() => deleteImage(index)}
                  >
                    {closeIcon}
                  </button>
                  <img
                    alt={"Room image " + { index }}
                    src={file}
                    className={classes["room-image"]}
                    onClick={() => openModal(file)}
                  />
                </li>
              );
            })}
          </ul>
        </section>
        <div className={classes["form-wrap"]}>
          <InputField
            className={classes["room-description"]}
            type="text"
            name="description"
            value={description}
            placeholder="Введите описание комнаты (обязательно)"
            onChange={handleChange}
            isError={hasError}
            isChecked={isChecked}
          />
          <div className={classes["checkbox-wrap"]}>
            <input
              type="checkbox"
              checked={enabled}
              onChange={() => setEnabled(!enabled)}
            />
            <p>Cостояние: {enabled ? "доступна" : "недоступна"}</p>
          </div>
          <div className={classes["buttons-wrap"]}>
            <CustomButton
              className={classes["form-data"]}
              type="submit"
              text="Сохранить"
            />

            <CustomButton
              className={classes["cancel-button"]}
              type="reset"
              text="Отмена"
            />
          </div>
        </div>
      </form>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Просмотр изображения"
      >
        <div className={classes["modal-wrap"]}>
          <button onClick={closeModal} className={classes["modal-button"]}>
            {closeIcon}
          </button>
          {selectedImage && (
            <img src={selectedImage} alt="Увеличенное изображение" />
          )}
        </div>
      </Modal>
    </>
  );
};
