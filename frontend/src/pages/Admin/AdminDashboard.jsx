import React from "react";
import { useGetAllUsersQuery } from "../../redux/api/userApiSlice";
import DeleteByAdmin from "./DeleteByAdmin";
import UpdateByAdmin from "./UpdateByAdmin";

const AdminDashboard = () => {
  const { data: allUsers } = useGetAllUsersQuery();

  const allUsersFilter = allUsers?.filter((user) => !user.isAdmin);
  return (
    <div className="   ml-62 mr-3">
      <table className="border  ">
        <tr className="bg-[#FF5C5C] text-white">
          <th className="w-[15rem]  border p-3">Id</th>
          <th className="w-[15rem] border">Name</th>
          <th className="w-[15rem] border">Email</th>
          <th className="w-[15rem] border">Contact Number</th>
          <th className="w-[15rem] border">Operation</th>
        </tr>

        {allUsersFilter?.map((user) => (
          <>
            <tr className=" ">
              <td className="w-[15rem] border pl-2">{user?._id}</td>
              <td className="w-[12rem] border pl-2">{user?.name}</td>
              <td className="w-[12rem] border pl-2">{user?.email}</td>
              <td className="w-[12rem] border pl-2">{user?.phoneNo}</td>
              <td className="border pl-2">
                <div className="w-[12rem]  flex gap-x-2 my-2">
                  <DeleteByAdmin id={user?._id} />
                  <UpdateByAdmin
                    id={user?._id}
                    userName={user?.name}
                    userEmail={user?.email}
                    userPhoneNo={user?.phoneNo}
                  />
                </div>
              </td>
            </tr>
          </>
        ))}
      </table>
    </div>
  );
};

export default AdminDashboard;
