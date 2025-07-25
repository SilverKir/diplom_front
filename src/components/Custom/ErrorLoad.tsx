import classes from "./errorLoad.module.css";

type IErrorLoadProps = {
  className?: string;
  text?: string;
  errorText?: string | null;
  isLoading?: boolean;
};

export const ErrorLoad = (props: IErrorLoadProps) => {
  const { className, text, errorText, isLoading } = props;

  const circle = (
    <svg
      className={classes["loader"]}
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
  return (
    <>
      <div className={`${className} ${classes["error-loading-wrap"]} `}>
        <div>{text}</div>

        <div className={classes["error-text"]}>{errorText}</div>
        <i className={classes["loader-icon"]}>{isLoading ? circle : ""}</i>
      </div>
    </>
  );
};
