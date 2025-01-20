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
import { deleteCategory, getCategory } from "../../redux/slice/categorySlice";

const CategoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const category = useSelector((state) => state.category.category);
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const deleteCategoryFunc = async (id) => {
    try {
      console.log(id);
      await dispatch(deleteCategory(id));
      toast.success("Category Deleted Successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "700",
                  fontSize: "1.2rem",
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "700",
                  fontSize: "1.2rem",
                }}
              >
                Image
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
            {category?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  <img
                    src={row?.image?.url}
                    alt={row?.name}
                    className="w-32 aspect-video object-contain "
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-6">
                    <button
                      onClick={() => navigate(`/category/edit/${row?._id}`)}
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteCategoryFunc(row?._id)}>
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

export default CategoryList;
