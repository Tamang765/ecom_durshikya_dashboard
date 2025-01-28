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
import { toast } from "react-toastify";
import { getAllUsers } from "../../redux/slice/authSlice";
import { deleteCategory } from "../../redux/slice/categorySlice"; // You can remove this if you don't need it

  const UserList = () => {
    const dispatch = useDispatch();

    // Assuming your user data is available in state.user.users
    const users = useSelector((state) => state.auth.users); // You can change this based on how the state is structured

    useEffect(() => {
      dispatch(getAllUsers()); // Fetch users when the component mounts
    }, [dispatch]);

    const deleteUserFunc = async (id) => {
      try {
        await dispatch(deleteCategory(id)); // Remove if unnecessary
        toast.success("User Deleted Successfully");
      } catch (error) {
        console.log(error.message);
      }
    };

    return (
      <div className="max-w-4xl p-5 mx-auto mt-10 border-2 shadow-md ">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="user table">
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
                  Email
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
                  Phone
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "700",
                    fontSize: "1.2rem",
                  }}
                >
                  Role
                </TableCell>
                {/* <TableCell
                  sx={{
                    fontWeight: "700",
                    fontSize: "1.2rem",
                  }}
                >
                  Action
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => (
                <TableRow
                  key={user._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.role}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  export default UserList;
