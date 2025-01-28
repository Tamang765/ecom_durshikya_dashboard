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
import { deleteProduct, getProduct } from "../../redux/slice/productSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector((state) => state.product.product);
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const deleteProductFunc = async (id) => {
    try {
      await dispatch(deleteProduct(id));
      toast.success("Product Deleted Successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  const productHead = [
    "Name",
    "Description",
    "Price",
    "Discount",
    "Color",
    "Size",
    "Category",
    "Image",
  ];

  return (
    <div className="p-5 mx-auto mt-10 border-2 shadow-md ">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {productHead?.map((head) => (
                <TableCell
                  sx={{
                    fontWeight: "700",
                    fontSize: "1.2rem",
                  }}
                >
                  {head}
                </TableCell>
              ))}

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
            {product?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.description}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.price}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.discount}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row?.color?.map((color, index) => (
                    <div
                      className="w-6 capitalize rounded-full aspect-square"
                      // style={{ backgroundColor: color }}
                    >
                      {color}
                      {index < row?.color?.length - 1 ? "," : ""}
                    </div>
                  ))}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row?.size?.map((size, index) => (
                    <div className="capitalize">
                      {size}
                      {index < row?.size?.length - 1 ? "," : ""}
                    </div>
                  ))}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.category?.name || "--"}
                </TableCell>
                <TableCell align="right">
                  <img
                    src={row?.images[0]?.url}
                    alt={row?.name}
                    className="object-contain w-32 aspect-video "
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-6">
                    <button
                      onClick={() => navigate(`/product/edit/${row?._id}`)}
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteProductFunc(row?._id)}>
                      Delete
                    </button>
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

export default ProductList;
