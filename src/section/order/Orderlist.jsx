import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteCategory } from "../../redux/slice/categorySlice"; // You may not need this anymore
import { deleteOrder, getOrder } from "../../redux/slice/orderSlice"; // Assuming this fetches orders

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Assuming your order data is available in state.order.orders
  const orders = useSelector((state) => state.order.order); // You can change this based on how the state is structured

  useEffect(() => {
    dispatch(getOrder()); // Fetch orders when the component mounts
  }, [dispatch]);

  const deleteCategoryFunc = async (id) => {
    try {
      console.log(id);
      await dispatch(deleteCategory(id)); // Remove if unnecessary
      toast.success("Category Deleted Successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-4xl p-5 mx-auto mt-10 border-2 shadow-md ">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="order table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "700",
                  fontSize: "1.2rem",
                }}
              >
                Order ID
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "700",
                  fontSize: "1.2rem",
                }}
              >
                Address
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "700",
                  fontSize: "1.2rem",
                }}
              >
                Total Price
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "700",
                  fontSize: "1.2rem",
                }}
              >
                Payment Method
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "700",
                  fontSize: "1.2rem",
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "700",
                  fontSize: "1.2rem",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <TableRow
                key={order._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {order._id}
                </TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>{order.totalPrice}</TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <div className="flex gap-6">
                    <button
                      onClick={() =>
                       dispatch(deleteOrder(order._id))
                      }
                    >
                     Delete
                    </button>
                    {/* Example of Delete button, if you have delete functionality */}
                    {/* <button onClick={() => deleteCategoryFunc(order._id)}>
                      Delete
                    </button> */}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderList;
