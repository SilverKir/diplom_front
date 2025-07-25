import classes from "./customButton.module.css";

type IButtonProps = {
  className?: string;
  type: "submit" | "reset" | "button" | undefined;
  text?: string;
  isLoading?: boolean;
  isDisable?: boolean;
  onClick?: () => void;
};

export const CustomButton = (props: IButtonProps) => {
  const { className, type, text, isLoading, isDisable, onClick } = props;

  const circle = (
    <svg
      className={classes["loader"]}
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
  return (
    <>
      <button
        className={`${className} ${classes["form-button"]} ${
          isLoading ? classes["loading-button"] : ""
        } `}
        type={type}
        disabled={isDisable}
        onClick={onClick}
      >
        {text}
        <i className={classes["loader-icon"]}>{isLoading ? circle : ""}</i>
      </button>
    </>
  );
};
