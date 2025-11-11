import { useState } from "react";
import { CustomButton, InputField } from "../../components";
import { CreateChat, GetData } from "../../scripts";
import { useNavigate } from "react-router-dom";

type INewChat = {
  changeWiew: (data: boolean) => void;
};

export const NewChat: React.FC<INewChat> = ({ changeWiew }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.trim()) {
      const result = await GetData(CreateChat(message));
      setMessage("");
      if (
        result &&
        Object.prototype.toString.call(result) === "[object Array]"
      ) {
        const chatId = result[0].id;
        navigate(`/common/support-requests/${chatId}`);
      }
    }
  };

  return (
    <>
      <h2>Создать обращение</h2>
      <form onSubmit={sendMessage}>
        <InputField
          type="text"
          name="text"
          value={message}
          placeholder="Введите сообщение"
          onChange={(e) => setMessage(e.target.value)}
        />
        <CustomButton type="submit" text="Создать" />

        <CustomButton
          type="reset"
          text="Отменить"
          onClick={() => changeWiew(false)}
        />
      </form>
    </>
  );
};
