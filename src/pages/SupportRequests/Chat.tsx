import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import classes from "./Chat.module.css";
import { GetDataFromApiThunk } from "../../redux";
import { useParams } from "react-router-dom";
import { GetChatMessages } from "../../scripts";
import { IChatMessage } from "../../interfaces";
import { MessageForm } from "../../components";

export const Chat = () => {
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [update, setUpdate] = useState(false);
  const { data } = useAppSelector((state) => state.apiAction);
  const { name } = useAppSelector((state) => state.authActions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (id) {
        await dispatch(GetDataFromApiThunk(GetChatMessages(id)));
        setLoaded(true);
      }
    }
    fetchData();
  }, []);

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
                      <MessageForm
                        key={index}
                        isMyMessage={isMyId === item.author.id}
                        chatMessage={item}
                      />
                    );
                  }
                )}
              </ul>
            )}
        </div>
      )}
    </>
  );
};
