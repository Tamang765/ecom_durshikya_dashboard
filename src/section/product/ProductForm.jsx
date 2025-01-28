import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getCategory } from "../../redux/slice/categorySlice";
import {
  deleteProductImage,
  getSingleProduct,
  postProduct,
  resetProduct,
  updateProduct,
} from "../../redux/slice/productSlice";
const ProductForm = () => {
  const id = useLocation().pathname.split("/")[3];
const navigate = useNavigate();

  const [productFields, setProductFields] = useState({
    name: "",
    category: "",
    price: "",
    discount: "",
    description: "",
    images: [],
    quantity: "",
    size: [],
    color: [],
  });

  const [preview, setPreview] = useState([]);

  const dispatch = useDispatch();

  const category = useSelector((state) => state.category.category);
  const singleProduct = useSelector((state) => state.product.singleProduct);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  //text
  const handleChange = (e) => {
    setProductFields({ ...productFields, [e.target.name]: e.target.value });
  };

  //array

  const handleArrayChange = (e) => {
    const selectedData = e.target.selectedOptions;

    //copy the selected data into an array
    const sizeArray = Array.from(selectedData).map((item) => item.value);
    console.log(sizeArray)
    setProductFields({ ...productFields, size: sizeArray });
  };

  //handle color change
  const handleColorChange = (e) => {
    const selectedData = e.target.selectedOptions;
    //copy the selected data into an array
    const colorArray = Array.from(selectedData).map((item) => item.value);
    setProductFields({ ...productFields, color: colorArray });
  };

  //handle image change

  const handleImageChange = (e) => {
    try {
      const files = e.target.files;

      if (files) {
        setProductFields({ ...productFields, images: files });
        const previewData = Array.from(files).map((file) =>
          URL.createObjectURL(file)
        );

        setPreview((prev) => (prev?[...prev, ...previewData]: previewData) );
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  console.log(preview)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    //normal string
    formData.append("name", productFields.name);
    formData.append("category", productFields.category);
    formData.append("price", productFields.price);
    formData.append("discount", productFields.discount);
    formData.append("description", productFields.description);
    formData.append("quantity", productFields.quantity);

    ///array data
    formData.append("size", JSON.stringify(productFields.size));
    formData.append("color", JSON.stringify(productFields.color));

    //image
    for (let i = 0; i < productFields.images.length; i++) {
      if(productFields.images instanceof FileList){
      formData.append("images", productFields.images[i]);
    }
  }

    if(id){
      await dispatch(updateProduct({id, formData}));

      navigate("/product/list")
    }

    await dispatch(postProduct(formData));
    setProductFields({
      name: "",
      category: "",
      price: "",
      discount: "",
      description: "",
      images: [],
      quantity: "",
      size: [],
      color: [],
    });
    setPreview(null);

    try {
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
        //set data to initial state in redux
        dispatch(resetProduct());

        //set data to initial state
        //used same form so, need to clear out edit data
        setProductFields({
          name: "",
          category: "",
          price: "",
          discount: "",
          description: "",
          images: [],
          quantity: "",
          size: [],
          color: [],
        });
        setPreview(null);
    if (id) {
      dispatch(getSingleProduct(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (singleProduct) {
      setProductFields({
        name: singleProduct.name,
        category: singleProduct.category,
        price: singleProduct.price,
        discount: singleProduct.discount,
        description: singleProduct.description,
        images: singleProduct.images,
        quantity: singleProduct.quantity,
        size: singleProduct.size,
        color: singleProduct.color,
      });
      setPreview(singleProduct.images);
    }
  }, [singleProduct]);
  console.log(productFields, preview);

  function deleteImage(id, public_id) {

    dispatch(deleteProductImage({ id, imageId: public_id }));

  }

  return (
    <div>
      <h1 className="p-4 text-2xl font-semibold text-center ">
        {id ? "Edit Product" : "Create Product"}
      </h1>

      <form
        className="flex flex-col max-w-4xl gap-4 p-5 mx-auto mt-10 border-2 shadow-md"
        onSubmit={ handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={productFields.name}
          onChange={handleChange}
        />
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          className="p-2 border-2"
          value={productFields.category}
          onChange={handleChange}
        >
          {category?.map((item) => (
            <option key={item._id} value={item._id} className="p-4">
              {item?.name}
            </option>
          ))}
        </select>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          value={productFields.price}
          onChange={handleChange}
        />
        <label htmlFor="discount">Discount</label>
        <input
          type="number"
          name="discount"
          value={productFields.discount}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          value={productFields.description}
          onChange={handleChange}
        />
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={productFields.quantity}
          onChange={handleChange}
        />
        <label htmlFor="size">Size</label>
        <select
          name="size"
          id="size"
          className="p-2 border-2 "
          multiple
          value={productFields.size}
          // value={productFields.size}
          onChange={handleArrayChange}
        >
          {["XL", "L", "M", "S"]?.map((item) => (
            <option value={item} key={item} className="p-4">
              {item}
            </option>
          ))}
        </select>
        <label htmlFor="color">Color</label>
        <select
          name="color"
          id="color"
          className="p-2 border-2 "
          multiple
          value={productFields.color}
          onChange={handleColorChange}
        >
          {["red", "blue", "black", "white", "purple"]?.map((item) => (
            <option value={item} className="p-4">
              {item}
            </option>
          ))}
        </select>
        <label htmlFor="images">Images</label>
        <input
          type="file"
          name="images"
          multiple
          // value={productFields.images}
          onChange={handleImageChange}
        />
        {preview && (
          <div className="grid grid-cols-4 gap-4">
            {preview?.map((item) => (
              <>
                <img
                  key={item}
                  src={item?.url || item}
                  alt="preview"
                  className="object-cover w-full aspect-square"
                />
                <button
                  type="button"
                  onClick={() => deleteImage(id, item?.public_id)}
                >
                  X
                </button>
              </>
            ))}
          </div>
        )}
        <button className="p-4 text-white bg-primary">Submit</button>
      </form>
    </div>
  );
};

export default ProductForm;
