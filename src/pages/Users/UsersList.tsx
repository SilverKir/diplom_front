import { Pagination } from "../../components";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { GetError, GetUsers } from "../../scripts";
import { IFindUser, IUser } from "../../interfaces";
import { GetDataFromApiThunk } from "../../redux";
import { ROWS_PER_PAGE } from "../../constants";
import classes from "./UsersList.module.css";
import { FindUserForm } from "../../components/Users/FindUserForm";
import { UserListForm } from "../../components/Users/UserListForm";

export const UsersList = (props: { role: string }) => {
  const { role } = props;

  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.apiAction);
  const [form, setForm] = useState<IFindUser>({
    email: "",
    name: "",
    contactPhone: "",
  });

  const [page, setPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(0);
  const [notFirstPage, setNotFirstPage] = useState(false);
  const [morePage, setMorePage] = useState(true);
  const [updated, setUpdated] = useState(false);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 80);
    setNotFirstPage(true);
    if (data && Object.prototype.toString.call(data) === "[object Array]") {
      if (data.length === 0) {
        setPage(page - 1);
      }
      if (data.length === ROWS_PER_PAGE && morePage) {
        if (newPage === page - 1) {
          setPage(page + 1);
        }
      } else {
        setMorePage(false);
      }
    }
  };

  const HandleGetData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(
      GetDataFromApiThunk(
        GetUsers({ ...form, offset: 0, limit: ROWS_PER_PAGE, role: role })
      )
    );
    setUpdated(true);
  };

  const onPaginationClick = async (clickPage: number) => {
    await dispatch(
      GetDataFromApiThunk(
        GetUsers({
          ...form,
          offset: clickPage * ROWS_PER_PAGE,
          limit: ROWS_PER_PAGE,
          role: role,
        })
      )
    );
    handlePageChange(clickPage);
  };

  return (
    <>
      <div>{role}</div>
      <FindUserForm
        form={form}
        setForm={setForm}
        onSubmit={HandleGetData}
        isError={error ? GetError(error) : undefined}
        isLoading={loading}
      />
      <div>
        {updated ? (
          data && Object.prototype.toString.call(data) === "[object Array]" ? (
            <>
              <table className={classes["table-wrap"]}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>ФИО</th>
                    <th>Телефон</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item: IUser, index: number) => (
                    <tr>
                      <td>{index + 1 + currentPage * ROWS_PER_PAGE}</td>
                      {<UserListForm user={item} role={role} />}
                    </tr>
                  ))}
                </tbody>
              </table>

              {(notFirstPage || data.length === ROWS_PER_PAGE) && (
                <div className={classes["pagination"]}>
                  <Pagination onClick={onPaginationClick} totalPages={page} />
                  <div>{morePage && "..."}</div>
                </div>
              )}
            </>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
    </>
  );
};
