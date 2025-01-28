import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosInstance as axios } from "../../utils/axios";

const initialState = {
  isLoading: false,
  isError: false,
  order: [],
  singleOrder: null,
};

export const getOrder = createAsyncThunk("order/get", async () => {
  try {
    const response = await axios.get(`order`);
    return response.data.data;
  } catch (error) {
    toast.error(error.message || "Something went wrong");
  }
});

export const getSingleOrder = createAsyncThunk(
  "order/getSingle",
  async (id) => {
    try {
      const response = await axios.get(`order/${id}`);
      return response.data.data;
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  }
);

export const postOrder = createAsyncThunk("order/post", async (data) => {
  try {
    const response = await axios.post(`order`, data);
    return response.data.data;
  } catch (error) {
    toast.error(error.message || "Something went wrong");
  }
});

export const deleteOrder = createAsyncThunk(
  "order/delete",
  async (id) => {
    try {
      await axios.delete(`order/${id}`);
      return id;
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/patch",
  async ({ id, formData }) => {
    try {
      await axios.patch(`order/${id}`, formData);
      return id;
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.order = [];
      state.isError = false;
      state.isLoading = false;
      state.singleOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postOrder.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.order = action.payload;
    });
    builder.addCase(postOrder.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(getOrder.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.order = action.payload;
    });
    builder.addCase(getOrder.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(deleteOrder.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.isLoading = false;

      state.order = state.order.filter(
        (cat) => cat?._id !== action.payload
      );
    });
    builder.addCase(deleteOrder.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(getSingleOrder.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getSingleOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleOrder = action.payload;
    });
    builder.addCase(getSingleOrder.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
