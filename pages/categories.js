import Head from "next/head";
import { useContext, useState } from "react";
import { DataContext } from "../store/GlobalState";
import { updateItem } from "../store/Actions";
import { putData, postData } from "../utils/fetchData";

function Categories() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const { state, dispatch } = useContext(DataContext);
  const { categories, auth } = state;

  const createCategory = async () => {
    if (!name)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Name cannot be blank" },
      });
    if (auth.user.role !== "admin")
      return dispatch({ type: "NOTIFY", payload: { error: "Unauthorized" } });
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    if (id) {
      const res = await putData(`categories/${id}`, { name }, auth.token);
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      dispatch(updateItem(categories, id, res.category, "ADD_CATEGORIES"));
      setId("");
      setName("");
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    } else {
      const res = await postData("categories", { name }, auth.token);
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      console.log(res);
      dispatch({
        type: "ADD_CATEGORIES",
        payload: [...categories, res.newCategory],
      });
      setId("");
      setName("");
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    }
  };

  const handleEdit = (category) => {
    setName(category.name);
    setId(category._id);
  };

  return (
    <div className="col-md-6 mx-auto my-3">
      <Head>
        <title>Categories</title>{" "}
      </Head>
      <div className="d-flex">
        <div className="input-group mb-3 ">
          <input
            type="text"
            className="form-control"
            placeholder="Add a new category"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group mb-3 ml-1">
          <button className="btn btn-secondary" onClick={createCategory}>
            {id ? "Update" : "Create"}
          </button>
        </div>
      </div>

      <div>
        {categories.map((category) => (
          <div key={category._id} className="card my-2 text-capitalize">
            <div className="card-body d-flex justify-content-between">
              {category.name}
              <div style={{ cursor: "pointer" }}>
                <i
                  className="fas fa-edit text-primary mr-2"
                  onClick={() => handleEdit(category)}
                ></i>
                <i
                  className="fas fa-trash-alt ml-2 text-danger"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={() =>
                    dispatch({
                      type: "ADD_MODAL",
                      payload: {
                        data: categories,
                        id: category._id,
                        title: category.title,
                        type: "ADD_CATEGORIES",
                      },
                    })
                  }
                ></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
