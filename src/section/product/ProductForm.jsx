import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../redux/slice/categorySlice";
const ProductForm = () => {
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

  const dispatch = useDispatch();

  const category = useSelector((state) => state.category.category);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <div>
      <h1 className=" text-2xl font-semibold text-center p-4">
        {"Create Category"}
      </h1>
      ``
      <form
        action=""
        className="max-w-4xl border-2 shadow-md mx-auto mt-10 p-5 flex flex-col gap-4"
      >
        <label htmlFor="name">Name</label>
        <input type="text" name="name" value={productFields.name} />
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          className="border-2 p-2"
          value={productFields.category}
        >
          {category?.map((item) => (
            <option value={item._id} className="p-4">
              {item?.name}
            </option>
          ))}
        </select>
        <label htmlFor="price">Price</label>
        <input type="number" name="price" value={productFields.price} />
        <label htmlFor="discount">Discount</label>
        <input type="number" name="discount" value={productFields.discount} />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          value={productFields.description}
        />

        <label htmlFor="quantity">Quantity</label>
        <input type="number" name="quantity" value={productFields.quantity} />

        <label htmlFor="size">Size</label>
        <select
          name="size"
          id="size"
          className="border-2 p-2 "
          multiple
          value={productFields.size}
        >
          {["XL", "L", "M", "S"]?.map((item) => (
            <option value={item} className="p-4">
              {item}
            </option>
          ))}
        </select>

        <label htmlFor="color">Color</label>
        <select
          name="color"
          id="color"
          className="border-2 p-2 "
          multiple
          value={productFields.color}
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
          value={productFields.images}
        />
      </form>
    </div>
  );
};

export default ProductForm;
