import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state) => state.auth.singleUser);
  return (
    <div>
      <h1>Profile</h1>
      <div>User Name:{user?.name}</div>
      <div>Email: {user?.email}</div>
      <div>Address: {user?.address}</div>
      <div>Role: {user?.role}</div>
    </div>
  )
}

export default Profile
