import { ChangeEvent, useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import classes from "./RoomForm.module.css";
import {
  MAX_FILE_SIZE,
  MAX_ROOM_PHOTO,
  VALID_IMAGE_TYPES,
} from "../../constants";
import { closeIcon } from "../Custom";

type InitialDnDStateType = {
  draggedFrom: number | null;
  draggedTo: number | null;
  isDragging: boolean;
  originalOrder: string[];
  updatedOrder: string[];
};
const initialDnDState: InitialDnDStateType = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
};

export const RoomForm = () => {
  const [fileData, setFileData] = useState<string[]>([]);
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);
  const [updated, setUpdated] = useState(false);
  const uploadRef = useRef<HTMLInputElement>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

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
      if (VALID_IMAGE_TYPES.includes(file.type) && file.size < MAX_FILE_SIZE) {
        const reader = new FileReader();
        const newList = fileData;
        reader.onloadend = () => {
          if (
            reader.result &&
            !newList.includes(reader.result.toString()) &&
            newList.length < MAX_ROOM_PHOTO
          ) {
            newList.push(reader.result.toString());
            setFileData(newList);
            setUpdated(!updated);
          }
        };
        reader.readAsDataURL(file);
      }
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

  return (
    <>
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
                  onClick={() => deleteImage(index)}
                  className={classes["close-button"]}
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
      </section>
    </>
  );
};
