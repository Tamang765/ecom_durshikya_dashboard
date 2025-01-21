import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getSingleCategory,
  postCategory,
  resetCategory,
  updateCategory,
} from "../../redux/slice/categorySlice";

const CategoryForm = () => {
  const id = useLocation().pathname.split("/")[3];

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.category.isLoading);
  //get single category from categoryslice

  const singleCategory = useSelector((state) => state.category.singleCategory);

  const [categoryItem, setCategoryItem] = useState({
    name: "",
    image: "",
  });

  const [preview, setPreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", categoryItem.name);
      formData.append("image", categoryItem.image);

      await dispatch(postCategory(formData));

      setCategoryItem({
        name: "",
        image: "",
      });
      setPreview(null);
      navigate("/category/list");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    setCategoryItem({ ...categoryItem, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        setCategoryItem({ ...categoryItem, image: file });
      }
      const image = URL.createObjectURL(file);
      setPreview(image);
    } catch (error) {
      console.log(error.message);
    }
  };

  //get single category
  useEffect(() => {
    //set data to initial state in redux
    dispatch(resetCategory());

    //set data to initial state
    //used same form so, need to clear out edit data
    setCategoryItem({
      name: "",
      image: "",
    });
    setPreview(null);

    if (id) {
      dispatch(getSingleCategory(id));
    }
  }, [id, dispatch]);

  //set category item
  useEffect(() => {
    if (singleCategory) {
      setCategoryItem({
        name: singleCategory?.name,
        image: singleCategory?.image,
      });
      setPreview(singleCategory?.image?.url);
    }
  }, [singleCategory]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (categoryItem.image instanceof File) {
        formData.append("image", categoryItem.image);
      } else {
        formData.append("image", categoryItem.image);
      }
      formData.append("name", categoryItem.name);

      await dispatch(updateCategory({ id, formData }));
      navigate("/category/list");
    } catch (error) {}
  };

  return (
    <div>
      <h1 className=" text-2xl font-semibold text-center p-4">
        {id ? "Edit Category" : "Create Category"}
      </h1>
      <hr />
      <form className=" p-8" onSubmit={id ? handleEditSubmit : handleSubmit}>
        <Stack
          width={"50%"}
          sx={{
            margin: "auto",
          }}
          gap={4}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={categoryItem.name}
            onChange={handleChange}
          />
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
          {preview && <img src={preview} alt="preview" width={200} />}
          <button
            type="submit"
            className="bg-black text-white p-3"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : id ? "Update" : "Submit"}
          </button>
        </Stack>
      </form>
    </div>
  );
};

export default CategoryForm;
