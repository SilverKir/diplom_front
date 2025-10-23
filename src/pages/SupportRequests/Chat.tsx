import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../../hooks";
import classes from "./Chat.module.css";
import { GetDataFromApiThunk } from "../../redux";
import { useParams } from "react-router-dom";
import { GetChatMessages, GetDataFromAPI, SendMessage } from "../../scripts";
import { IChatMessage } from "../../interfaces";
import { MessageForm } from "../../components";

export const Chat = () => {
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false);
  const { data } = useAppSelector((state) => state.apiAction);
  const URL = import.meta.env.VITE_APP_NAMES_WS;
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IChatMessage[]>([]);

  const socket = io(URL);

  useEffect(() => {
    async function fetchData() {
      if (id) {
        await dispatch(GetDataFromApiThunk(GetChatMessages(id)));
        setLoaded(true);
      }
    }

    fetchData();

    if (id) {
      socket.on(id, (msg: IChatMessage) => {
        setMessages((messages) => [...messages, msg]);
      });
    }

    return () => {
      socket.off(id);
    };
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() && id) {
      await GetDataFromAPI(SendMessage(id, message));
    }
    setMessage("");
  };

  return (
    <>
      {loaded && (
        <div className={classes["form-wrap"]}>
          <h3>Чат</h3>
          {data &&
            Object.prototype.toString.call(data) === "[object Array]" && (
              <ul>
                {(data as IChatMessage[]).map(
                  (item: IChatMessage, index: number) => {
                    let isMyId = "";
                    if (index === 0) {
                      isMyId = item.author.id;
                    }

                    return (
                      <div
                        className={`${classes.clearfix} ${classes.container} }`}
                      >
                        <div className={classes["chat"]}>
                          <div className={classes["chat-history"]}>
                            <MessageForm
                              key={index}
                              isMyMessage={isMyId === item.author.id}
                              chatMessage={item}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </ul>
            )}
          <div>
            <ul>
              {messages.map((msg, index) => (
                <li key={index} className={classes["chat-history"]}>
                  <MessageForm
                    key={index}
                    isMyMessage={true}
                    chatMessage={msg}
                  />
                </li>
              ))}
            </ul>
            <form onSubmit={sendMessage}>
              <input
                className={classes["input-field"]}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit">Отправить</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
