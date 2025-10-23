import { IChatMessage } from "../../interfaces";
import { ConvertDate } from "../../scripts";
import classes from "./MessageForm.module.css";

export const MessageForm = (props: {
  isMyMessage: boolean;
  chatMessage: IChatMessage;
}) => {
  const { isMyMessage, chatMessage } = props;
  if (isMyMessage) {
    return (
      <li>
        <div className={classes["message_data"]}>
          <span className={classes["message-data-name"]}>
            <i className={classes["online"]}></i>
            {chatMessage.author.name}
          </span>
          <span className={classes["message-data-time"]}>
            {ConvertDate(chatMessage.createdAt)}
          </span>
        </div>
        <div className={`${classes.message} ${classes.my_message}`}>
          {chatMessage.text}
        </div>
      </li>
    );
  } else {
    return (
      <li className={classes["clearfix"]}>
        <div className={`${classes.message_data} ${classes.align_right}`}>
          <div className={classes["message_data"]}>
            <span className={classes["message-data-time"]}>
              {ConvertDate(chatMessage.createdAt)}
            </span>
            <span className={classes["message-data-name"]}>
              {chatMessage.author.name}
            </span>
            <i className={classes["me"]}></i>
          </div>
          <div
            className={`${classes.message} ${classes.other_message} ${classes.float_right}`}
          >
            {chatMessage.text}
          </div>
        </div>
      </li>
    );
  }
};
