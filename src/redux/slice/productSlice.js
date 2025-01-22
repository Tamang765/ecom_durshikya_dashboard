import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosInstance as axios } from "../../utils/axios";

const initialState = {
  isLoading: false,
  isError: false,
  product: [],
  singleProduct: null,
};

export const getProduct = createAsyncThunk("product/get", async (data) => {
  try {
    const response = await axios.get(`product`, data);
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    toast.error(error.message || "Something went wrong");
  }
});

export const getSingleProduct = createAsyncThunk(
  "product/getSingle",
  async (id) => {
    try {
      const response = await axios.get(`product/${id}`);
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  }
);

export const postProduct = createAsyncThunk("product/post", async (data) => {
  try {
    const response = await axios.post(`product`, data);
    if (response.data.data) {
      toast.success("Product added successfully");
    }
    return response.data.data;
  } catch (error) {
    toast.error(error.message || "Something went wrong");
  }
});

export const deleteProduct = createAsyncThunk("product/delete", async (id) => {
  try {
    await axios.delete(`product/${id}`);
    return id;
  } catch (error) {
    toast.error(error.message || "Something went wrong");
  }
});

export const deleteProductImage = createAsyncThunk(
  "product/deleteimage",
  async ({ id, imageId }) => {
    try {
      await axios.delete(`product/${id}/${imageId}`);
      return id;
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/patch",
  async ({ id, formData }) => {
    try {
      await axios.patch(`product/${id}`, formData);
      return id;
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProduct: (state) => {
      state.product = [];
      state.isError = false;
      state.isLoading = false;
      state.singleProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postProduct.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(postProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.product = action.payload;
    });
    builder.addCase(postProduct.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(getProduct.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    });
    builder.addCase(getProduct.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = state.product.filter(
        (cat) => cat?._id !== action.payload
      );
    });
    builder.addCase(deleteProduct.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(getSingleProduct.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getSingleProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleProduct = action.payload;
    });
    builder.addCase(getSingleProduct.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { resetProduct } = productSlice.actions;

export default productSlice.reducer;
