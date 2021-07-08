import Head from "next/head";
import { useContext, useState } from "react";
import { DataContext } from "../store/GlobalState";
import { updateItem } from "../store/Actions";
import { putData, postData } from "../utils/fetchData";

function Products() {
  const initialState = {
    product_id: "",
    title: "",
    price: 0,
    inStock: 0,
    description: "",
    content: "",
    category: "",
  };

  const [product, setProduct] = useState(initialState);
  const [images, setImages] = useState([]);

  const { product_id, title, price, description, content, category, inStock } =
    product;

  const { state, dispatch } = useContext(DataContext);
  const { categories } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleUpload = (e) => {
    dispatch({ type: "NOTIFY", payload: {} });
    let newImages = [];
    let num = 0;
    let err = "";
    const files = [...e.target.files];
    console.log(files);
    if (files.length === 0)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "File does not exist" },
      });
    files.forEach((file) => {
      if (file.size > 1024 * 1024)
        return dispatch({
          type: "NOTIFY",
          payload: { error: "File image should be less than 1mb" },
        });

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return dispatch({
          type: "NOTIFY",
          payload: { error: "Invalid file type" },
        });

      num += 1;
      if (num <= 5) newImages.push(file);
      return newImages;
    });
    if (err) dispatch({ type: "NOTIFY", payload: { error: err } });
    const imgCount = images.length;
    if (imgCount + newImages.length > 5)
      dispatch({
        type: "NOTIFY",
        payload: { error: "Only up to 5 images allowed" },
      });

    setImages([...images, newImages]);
  };

  return (
    <div className="products_manager">
      <Head>
        <title>Admin Products</title>
      </Head>
      <div>
        <form className="row">
          <div className="col-md-6">
            <input
              type="text"
              name="product_id"
              value={product_id}
              placeholder="Product Id"
              className="d-block my-4 w-100 p-2"
              onChange={handleChange}
            />
            <input
              type="text"
              name="title"
              value={title}
              placeholder="Title"
              className="d-block my-4 w-100 p-2"
              onChange={handleChange}
            />
            <div className="row">
              <div className="col-md-6">
                <input
                  type="number"
                  name="price"
                  value={price}
                  placeholder="Price"
                  className="d-block my-4 w-100 p-2"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="number"
                  name="inStock"
                  value={inStock}
                  placeholder="In stock"
                  className="d-block my-4 w-100 p-2"
                  onChange={handleChange}
                />
              </div>
            </div>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="4"
              placeholder="Description"
              className="d-block my-4 w-100 p-2"
            />
            <textarea
              name="content"
              id="content"
              cols="30"
              rows="4"
              placeholder="Content"
              className="d-block my-4 w-100 p-2"
            />
            <div className="input-group-prepend px-0 my-2">
              <select
                name="category"
                id="category"
                value={category}
                onChange={handleChange}
                className="custom-select text-capitalize"
              >
                <option value="all">All Products</option>
                {categories.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-6 my-4">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Upload</span>
              </div>
              <div className="custom-file border rounded">
                <input
                  type="file"
                  className="custom-file-input"
                  onChange={handleUpload}
                  multiple
                />
              </div>
            </div>
            <div className="row img-up">
              {images.map((img, index) => (
                <div className="input-group" key={index} className="file_img">
                  <img
                    src={img.url ? img.url : URL.createObjectURL(img)}
                    alt={images.url}
                    className="img-thumbnail rounded"
                  />
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Products;
