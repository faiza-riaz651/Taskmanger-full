import React from "react";
import { useGetAllUsersQuery } from "../../redux/api/userApiSlice";
import DeleteByAdmin from "./DeleteByAdmin";
import UpdateByAdmin from "./UpdateByAdmin";

const AdminDashboard = () => {
  const { data: allUsers } = useGetAllUsersQuery();

  const allUsersFilter = allUsers?.filter((user) => !user.isAdmin);
  return (
    <div className="   ml-62">
      <table className="border-2  border-[#FF5C5C] rounded-tr-lg rounded-tl-lg border-separate border-spacing-0 py-4 ">
        <tr>
          <th className="w-[15rem]">Id</th>
          <th className="w-[15rem] ">Name</th>
          <th className="w-[15rem]">Email</th>
          <th className="w-[15rem]">Contact Number</th>
          <th className="w-[15rem]">Operation</th>
        </tr>
      </table>
      {allUsersFilter?.map((user) => (
        <>
          <table className="border-2 border-collapse border-[#FF5C5C] text-wrap">
            <tr className="">
              <td className="w-[15rem]">{user?._id}</td>
              <td className="w-[12rem]">{user?.name}</td>
              <td className="w-[12rem] ">{user?.email}</td>
              <td className="w-[12rem]">{user?.phoneNo}</td>
              <td className="w-[12rem] flex gap-x-2 my-2">
                <DeleteByAdmin id={user?._id} />
                <UpdateByAdmin
                  id={user?._id}
                  userName={user?.name}
                  userEmail={user?.email}
                  userPhoneNo={user?.phoneNo}
                />
              </td>
            </tr>
          </table>
        </>
      ))}
    </div>
  );
};

export default AdminDashboard;
