import Head from 'next/head';
import { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../store/GlobalState';
import { updateItem } from '../../store/Actions';
import { putData, postData, getData, patchData } from '../../utils/fetchData';
import { imageUpload } from '../../utils/ImageUpload';
import { useRouter } from 'next/router';

function Create() {
  const initialState = {
    title: '',
    price: 0,
    inStock: 0,
    description: '',
    content: '',
    category: ''
  };

  const [product, setProduct] = useState(initialState);
  const [images, setImages] = useState([]);
  const [onEdit, setOnEdit] = useState(false);

  const { title, price, description, content, category, inStock } = product;

  const { state, dispatch } = useContext(DataContext);
  const { categories, auth } = state;

  const router = useRouter();
  const { id } = router.query;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleUpload = (e) => {
    dispatch({ type: 'NOTIFY', payload: {} });
    let newImages = [];
    let num = 0;
    let err = '';
    const files = [...e.target.files];
    if (files.length === 0)
      return dispatch({
        type: 'NOTIFY',
        payload: { error: 'File does not exist' }
      });
    files.forEach((file) => {
      if (file.size > 1024 * 1024)
        return dispatch({
          type: 'NOTIFY',
          payload: { error: 'File image should be less than 1mb' }
        });

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        return dispatch({
          type: 'NOTIFY',
          payload: { error: 'Invalid file type' }
        });

      num += 1;
      if (num <= 5) newImages.push(file);
      return newImages;
    });
    if (err) dispatch({ type: 'NOTIFY', payload: { error: err } });
    const imgCount = images.length;
    if (imgCount + newImages.length > 5)
      dispatch({
        type: 'NOTIFY',
        payload: { error: 'Only up to 5 images allowed' }
      });
    setImages([...images, ...newImages]);
  };

  const deleteImage = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth.user.role !== 'admin')
      return dispatch({ type: 'NOTIFY', payload: { error: 'Unauthorized' } });

    if (
      !title ||
      !price ||
      !description ||
      !content ||
      category === 'all' ||
      !inStock ||
      images.length === 0
    )
      return dispatch({
        type: 'NOTIFY',
        payload: { error: 'Please add all fields front.' }
      });

    dispatch({ type: 'NOTIFY', payload: { loading: true } });
    let media = [];
    const imgNewURL = images.filter((img) => !img.url);
    const imgOldURL = images.filter((img) => img.url);

    if (imgNewURL.length > 0) media = await imageUpload(imgNewURL);

    let res;
    if (onEdit) {
      res = await putData(
        `product/${id}`,
        { ...product, images: [...imgOldURL, ...media] },
        auth?.token
      );
      if (res.err)
        return dispatch({ type: 'NOTIFY', payload: { error: res.err } });
    } else {
      res = await postData(
        'product',
        { ...product, images: [...imgOldURL, ...media] },
        auth?.token
      );
      if (res.err)
        return dispatch({ type: 'NOTIFY', payload: { error: res.err } });
    }
    return dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
  };

  useEffect(() => {
    if (id && id[0] !== '*') {
      console.log(id[0]);
      setOnEdit(true);
      getData(`product/${id[0]}`).then((res) => {
        setProduct(res?.product);
        setImages(res?.product?.images);
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages([]);
    }
  }, [id]);
  return (
    <div className='products_manager'>
      <Head>
        <title>Admin Products</title>
      </Head>

      <div>
        <form className='row' onSubmit={handleSubmit}>
          <div className='col-md-6'>
            <input
              type='text'
              name='title'
              value={title}
              placeholder='Title'
              className='d-block my-4 w-100 p-2'
              onChange={handleChange}
            />
            <div className='row'>
              <div className='col-md-6'>
                <label htmlFor='pricce'>Price</label>
                <input
                  type='number'
                  name='price'
                  value={price}
                  placeholder='Price'
                  className='d-block  w-100 p-2'
                  onChange={handleChange}
                />
              </div>
              <div className='col-md-6'>
                <label htmlFor='inStock'>InStock</label>
                <input
                  type='number'
                  name='inStock'
                  value={inStock}
                  placeholder='In stock'
                  className='d-block  w-100 p-2'
                  onChange={handleChange}
                />
              </div>
            </div>
            <textarea
              name='description'
              id='description'
              cols='30'
              value={description}
              onChange={handleChange}
              rows='4'
              placeholder='Description'
              className='d-block my-3 w-100 p-2'
            />
            <textarea
              name='content'
              id='content'
              value={content}
              onChange={handleChange}
              cols='30'
              rows='4'
              placeholder='Content'
              className='d-block my-3 w-100 p-2'
            />
            <div className='input-group-prepend px-0 my-2'>
              <select
                name='category'
                id='category'
                value={category}
                onChange={handleChange}
                className='custom-select text-capitalize'
              >
                <option value='all'>All products</option>
                {categories.map((item) => (
                  <option key={item._id} value={item._d}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='col-md-6 my-4'>
            <div className='input-group mb-3'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>Upload</span>
              </div>
              <div className='custom-file border rounded'>
                <input
                  type='file'
                  className='custom-file-input'
                  onChange={handleUpload}
                  multiple
                />
              </div>
            </div>
            <div className='row img-up'>
              {images.map((img, index) => (
                <div className='input-group file_img' key={index}>
                  <img
                    src={img.url ? img.url : URL.createObjectURL(img)}
                    alt=''
                    className='img-thumbnail rounded'
                  />
                  <span onClick={() => deleteImage(index)}>X</span>
                </div>
              ))}
            </div>
          </div>
          <button type='submit' className='btn btn-info my-1 mb-3 px-4 ml-3'>
            {onEdit ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;
