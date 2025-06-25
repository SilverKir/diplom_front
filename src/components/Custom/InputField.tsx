import classes from "./inputField.module.css";
type InputFieldProps = {
  className?: string | undefined;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isError?: string;
  isChecked?: boolean;
};

export const InputField = (props: InputFieldProps) => {
  const {
    className,
    type,
    name,
    value,
    placeholder,
    onChange,
    isError,
    isChecked,
  } = props;
  const iconAlert = (
    <svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff0000">
      <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
    </svg>
  );
  const iconPass = (
    <svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#008000">
      <path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z" />
    </svg>
  );

  return (
    <>
      <div className={classes["messageBlock"]}>
        <div
          className={`${className} ${classes["formField"]} ${
            isError
              ? classes["errorField"]
              : isChecked
              ? classes["checkedField"]
              : ""
          }`}
        >
          <input
            type={type}
            placeholder={placeholder}
            className={classes["inputField"]}
            name={name}
            value={value}
            onChange={onChange}
          />
          <i className={classes["icon"]}>
            {isError ? iconAlert : isChecked ? iconPass : null}
          </i>
        </div>
        <div className={classes["errorMessage"]}>{isError ? isError : ""}</div>
      </div>
    </>
  );
};
