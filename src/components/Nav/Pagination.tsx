type PaginationProps = {
  totalPages: number;
  onClick: (page: number) => Promise<void>;
};

export const Pagination = (props: PaginationProps) => {
  return (
    <div>
      {Array.from({ length: props.totalPages }, (_, index) => (
        <button
          key={index}
          onClick={(e) => {
            e.preventDefault();
            props.onClick(index);
          }}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};
