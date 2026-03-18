import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../api";
import { setAllUserDetails } from "../context/action/allUSersAction";
import DataTable from "./DataTable";
import Avatar from "@mui/material/Avatar";

const DBUsers = () => {
  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allUsers && !Array.isArray(allUsers)) {
      getAllUsers().then((data) => {
        dispatch(setAllUserDetails(data));
      });
    }
  }, []);

  return (
    <div className="text-he flex items-center justify-center gap-4 pt-6 w-full">
      {Array.isArray(allUsers) && allUsers.length > 0 && (
        <DataTable
          columns={[
            {
              title: "Image",
              field: "photoURL",
              render: (rowData) => (
                <img
                  src={rowData.photoURL ? rowData.photoURL : Avatar}
                  alt="User Avatar"
                  className="w-32 h-16 object-contain rounded-md"
                />
              ),
            },
            {
              title: "Name",
              field: "displayName",
            },
            {
              title: "Email",
              field: "email",
            },
            {
              title: "Verified",
              field: "emailVerified",
              render: (rowData) => (
                <p
                  className={`px-2 py-1 w-32 text-center text-primary rounded-md ${
                    rowData.emailVerified ? "bg-emerald-500" : "bg-red-500"
                  }`}
                >
                  {rowData.emailVerified ? "Verified" : "Not Verified"}
                </p>
              ),
            },
          ]}
          data={allUsers}
          title="List of Users"
        />
      )}
    </div>
  );
};

export default DBUsers;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllUsers } from "../api";
// import { setAllUserDetails } from "../context/action/allUSersAction";
// import DataTable from "./DataTable";
// import { Avatar } from "@mui/material";

// const DBUsers = () => {
//   const allUsers = useSelector((state) => state.allUsers);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!allUsers && !Array.isArray(allUsers)) {
//       getAllUsers().then((data) => {
//         dispatch(setAllUserDetails(data));
//       });
//     }
//   }, [allUsers, dispatch]);

//   return (
//     <div className="text-white flex items-center justify-center gap-4 pt-6 w-full">
//       {Array.isArray(allUsers) && (
//         <DataTable
//           columns={[
//             {
//               title: "Image",
//               field: "photoURL",
//               render: (rowData) => (
//                 <img
//                   src={rowData.photoURL ? rowData.photoURL : Avatar}
//                   className="w-32 h-16 object-contain rounded-md"
//                 />
//               ),
//             },
//             {
//               title: "Name",
//               field: "displayName",
//             },
//             {
//               title: "Email",
//               field: "email",
//             },
//             {
//               title: "verified",
//               field: "emailVerified",
//               render: (rowData) => (
//                 <p
//                   className={`px-2 py-1 w-32 text-center text-primary rounded-md ${
//                     rowData.emailVerified ? "bg-emerald-500" : "bg-red-500"
//                   }`}
//                 >
//                   {rowData.emailVerified ? "verified" : "Not Verified"}
//                 </p>
//               ),
//             },
//           ]}
//           data={allUsers}
//           title="List of Users"
//         />
//       )}
//     </div>
//   );
// };

// export default DBUsers;
