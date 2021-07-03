import Head from "next/head";
import { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import { useRouter } from "next/router";

const EditUser = () => {
  const router = useRouter();
  const { id } = router.query;

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  return <div>Edit user {id}</div>;
};

export default EditUser;
