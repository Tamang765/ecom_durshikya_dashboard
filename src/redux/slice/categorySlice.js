import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosInstance as axios } from "../../utils/axios";

const initialState = {
  isLoading: false,
  isError: false,
  category: [],
  singleCategory: null,
};

export const getCategory = createAsyncThunk("category/get", async (data) => {
  try {
    const response = await axios.get(`category`, data);
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    toast.error(error.message || "Something went wrong");
  }
});

export const getSingleCategory = createAsyncThunk(
  "category/getSingle",
  async (id) => {
    try {
      const response = await axios.get(`category/${id}`);
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  }
);

export const postCategory = createAsyncThunk("category/post", async (data) => {
  try {
    const response = await axios.post(`category`, data);
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    toast.error(error.message || "Something went wrong");
  }
});

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id) => {
    try {
      await axios.delete(`category/${id}`);
      return id;
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/patch",
  async ({ id, formData }) => {
    try {
      await axios.patch(`category/${id}`, formData);
      return id;
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetCategory: (state) => {
      state.category = [];
      state.isError = false;
      state.isLoading = false;
      state.singleCategory = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postCategory.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(postCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.category = action.payload;
    });
    builder.addCase(postCategory.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(getCategory.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.category = action.payload;
    });
    builder.addCase(getCategory.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(deleteCategory.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.isLoading = false;

      state.category = state.category.filter(
        (cat) => cat?._id !== action.payload
      );
    });
    builder.addCase(deleteCategory.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(getSingleCategory.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getSingleCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleCategory = action.payload;
    });
    builder.addCase(getSingleCategory.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { resetCategory } = categorySlice.actions;

export default categorySlice.reducer;
