import { useEffect, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { DataContext } from "../store/GlobalState";
import { getData } from "../utils/fetchData";

function users() {
  const { state, dispatch } = useContext(DataContext);
  const { auth, users } = state;

  useEffect(() => {
    if (auth.user && auth.user.role === "admin") {
      getData("user", auth.token).then((res) => {
        if (res.err)
          return dispatch({ type: "NOTIFY", payload: { error: res.err } });
        dispatch({ type: "ADD_USERS", payload: res.users });
      });
    }
  }, [auth.token]);

  return (
    <div className="table-responsive">
      <Head>
        <title>Users</title>
      </Head>

      <table className="table w-100">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Avater</th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} style={{ cursor: "pointer" }}>
              <th>{index + 1}</th>
              <td>{user._id}</td>
              <td>
                <img
                  src={user.avatar}
                  alt={user.avatar}
                  style={{
                    width: "30px",
                    height: "30px",
                    overflow: "hidden",
                    objectFit: "cover",
                  }}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.role === "admin" ? (
                  user.root ? (
                    <i className="fas fa-check text-success"> Root</i>
                  ) : (
                    <i className="fas fa-check text-success"></i>
                  )
                ) : (
                  <i className="fas fa-times text-danger"></i>
                )}
              </td>
              <td>
                <Link
                  href={
                    (auth.user.root && auth.user.email) || user.email
                      ? `/edit_user/${user._id}`
                      : "#!"
                  }
                >
                  <a>
                    <i className="fas fa-edit text-info mr-2"></i>
                  </a>
                </Link>
                {(auth.user.root && auth.user.email) || user.email ? (
                  <i
                    className="fas fa-trash-alt text-danger ml-2"
                    title="Remove"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  ></i>
                ) : (
                  <i
                    className="fas fa-trash-alt text-danger ml-2"
                    title="Remove"
                  ></i>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default users;
