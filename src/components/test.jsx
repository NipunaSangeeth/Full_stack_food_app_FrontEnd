// // import React, { useState } from "react";
// // import { statuses } from "../utils/styles";
// // import { Spinner } from "../components";
// // import { FaCloudUploadAlt, MdDelete } from "../assets/icons";
// // import { storage } from "../config/firebase.config";
// // import {
// //   ref,
// //   uploadBytesResumable,
// //   getDownloadURL,
// //   deleteObject,
// // } from "firebase/storage";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   alertDanger,
// //   alertNULL,
// //   alertSuccess,
// // } from "../context/actions/alertActions";
// // import { motion } from "framer-motion";
// // import { buttonClick } from "../animations";
// // import { addNewProduct, getAllProducts } from "../api";
// // import { setAllProducts } from "../context/actions/productActions";

// // const DBNewItem = () => {
// //   const [itemName, setItemName] = useState("");
// //   const [price, setPrice] = useState("");
// //   const [category, setCategory] = useState(null);
// //   const [isLoading, setisLoading] = useState(false);
// //   const [progress, setProgress] = useState(null);
// //   const [imageDownloadURL, setImageDownloadURL] = useState(null);

// //   const alert = useSelector((state) => state.alert);
// //   const dispatch = useDispatch();

// //   const uploadImage = (e) => {
// //     setisLoading(true);
// //     const imageFile = e.target.files[0];
// //     const storageRef = ref(storage, `Images/${Date.now()}_${imageFile.name}`);

// //     const uploadTask = uploadBytesResumable(storageRef, imageFile);
// //     uploadTask.on(
// //       "state_changed",
// //       (snapshot) => {
// //         setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
// //       },
// //       (error) => {
// //         dispatch(alertDanger(`Error : ${error}`));
// //         setTimeout(() => {
// //           dispatch(alertNULL());
// //         }, 3000);
// //       },
// //       () => {
// //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
// //           setImageDownloadURL(downloadURL);
// //           setisLoading(false);
// //           setProgress(null);
// //           dispatch(alertSuccess("Image Uploaded to the cloud"));
// //           setTimeout(() => {
// //             dispatch(alertNULL());
// //           }, 3000);
// //         });
// //       }
// //     );
// //   };

// //   const deleteImageFromFirebase = () => {
// //     setisLoading(true);
// //     const deleteRef = ref(storage, imageDownloadURL);

// //     deleteObject(deleteRef).then(() => {
// //       setImageDownloadURL(null);
// //       setisLoading(false);
// //       dispatch(alertSuccess("Image Removed from the cloud"));
// //       setTimeout(() => {
// //         dispatch(alertNULL());
// //       }, 3000);
// //     });
// //   };

// //   const submitNewData = () => {
// //     const data = {
// //       product_name: itemName,
// //       product_category: category,
// //       product_price: price,
// //       imageURL: imageDownloadURL,
// //     };
// //     addNewProduct(data).then((res) => {
// //       console.log(res);
// //       dispatch(alertSuccess("New Item added"));
// //       setTimeout(() => {
// //         dispatch(alertNULL());
// //       }, 3000);
// //       setImageDownloadURL(null);
// //       setItemName("");
// //       setPrice("");
// //       setCategory(null);
// //     });
// //     getAllProducts().then((data) => {
// //       dispatch(setAllProducts(data));
// //     });
// //   };

// //   return (
// //     <div className="text-white flex items-center justify-center flex-col pt-6 px-24 w-full">
// //       <div className=" border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4 ">
// //         <InputValueField
// //           type="text"
// //           placeHolder={"Item Name Here"}
// //           stateFunc={setItemName}
// //           stateValue={itemName}
// //         />
// //         <div className="w-full flex items-center justify-around gap-4 flex-wrap py-4">
// //           {statuses &&
// //             statuses?.map((data) => (
// //               <p
// //                 key={data.id}
// //                 onClick={() => setCategory(data.category)}
// //                 className={`px-4 py-3 rounded-md text-xl text-white font-semibold cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md ${
// //                   data.category === category
// //                     ? "bg-headingColor text-primary"
// //                     : "bg-transparent"
// //                 }`}
// //               >
// //                 {data.title}
// //               </p>
// //             ))}
// //         </div>

// //         <InputValueField
// //           type="number"
// //           placeHolder={"Item price Here"}
// //           stateFunc={setPrice}
// //           stateValue={price}
// //         />

// //         <div className="w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
// //           {isLoading ? (
// //             <div className="w-full h-full flex flex-col items-center justify-evenly px-24">
// //               <Spinner />
// //               {Math.round(progress > 0) && (
// //                 <div className=" w-full flex flex-col items-center justify-center gap-2">
// //                   <div className="flex justify-between w-full">
// //                     <span className="text-base font-medium text-textColor">
// //                       Progress
// //                     </span>
// //                     <span className="text-sm font-medium text-textColor">
// //                       {Math.round(progress) > 0 && (
// //                         <>{`${Math.round(progress)}%`}</>
// //                       )}
// //                     </span>
// //                   </div>

// //                   <div className="w-full bg-gray-200 rounded-full h-2.5">
// //                     <div
// //                       className="bg-red-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
// //                       style={{
// //                         width: `${Math.round(progress)}%`,
// //                       }}
// //                     ></div>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           ) : (
// //             <>
// //               {!imageDownloadURL ? (
// //                 <>
// //                   <label>
// //                     <div className=" flex flex-col items-center justify-center h-full w-full cursor-pointer">
// //                       <div className="flex flex-col justify-center items-center cursor-pointer">
// //                         <p className="font-bold text-4xl">
// //                           <FaCloudUploadAlt className="-rotate-0" />
// //                         </p>
// //                         <p className="text-lg text-textColor">
// //                           Click to upload an image
// //                         </p>
// //                       </div>
// //                     </div>
// //                     <input
// //                       type="file"
// //                       name="upload-image"
// //                       accept="image/*"
// //                       onChange={uploadImage}
// //                       className=" w-0 h-0"
// //                     />
// //                   </label>
// //                 </>
// //               ) : (
// //                 <>
// //                   <div className="relative w-full h-full overflow-hidden rounded-md">
// //                     <motion.img
// //                       whileHover={{ scale: 1.15 }}
// //                       src={imageDownloadURL}
// //                       className=" w-full h-full object-cover"
// //                     />

// //                     <motion.button
// //                       {...buttonClick}
// //                       type="button"
// //                       className="absolute top-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
// //                       onClick={() => deleteImageFromFirebase(imageDownloadURL)}
// //                     >
// //                       <MdDelete className="-rotate-0" />
// //                     </motion.button>
// //                   </div>
// //                 </>
// //               )}
// //             </>
// //           )}
// //         </div>

// //         <motion.button
// //           onClick={submitNewData}
// //           {...buttonClick}
// //           className="w-9/12 py-2 rounded-md bg-headingColor text-primary hover:bg-red-500 cursor-pointer"
// //         >
// //           Save
// //         </motion.button>
// //       </div>
// //     </div>
// //   );
// // };

// // export const InputValueField = ({
// //   type,
// //   placeHolder,
// //   stateValue,
// //   stateFunc,
// // }) => {
// //   return (
// //     <>
// //       <input
// //         type={type}
// //         placeholder={placeHolder}
// //         className=" w-full px-4 py-3 text-black bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-red-400"
// //         value={stateValue}
// //         onChange={(e) => stateFunc(e.target.value)}
// //       />
// //     </>
// //   );
// // };

// // export default DBNewItem;

// //delete a product
// // export const deleteAProduct = async (productId) => {
// //   try {
// //     const res = await axios.delete(
// //       `${baseURL}/api/products/delete/${productId}`
// //     );
// //     return res.data.data;
// //   } catch (err) {
// //     return null;
// //   }
// // };

// // export const getAllUsers = async () => {
// //   try {
// //     const res = await axios.get(`${baseURL}/api/users/all`);
// //     return res.data.data;
// //   } catch (err) {
// //     return null;
// //   }
// // };

// // //delete a product
// // router.delete("/delete/:productId", async (req, res) => {
// //   const productId = req.params.productId;
// //   try {
// //     await db
// //       .collection("products")
// //       .doc(`/${productId}/`)
// //       .delete()
// //       .then((result) => {
// //         return res.status(200).send({ success: true, data: response });
// //       });
// //   } catch (err) {
// //     return res.send({ success: false, msg: `Error :${err}` });
// //   }
// // });

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllUsers } from "../api";
// import { setAllUserDetails } from "../context/action/allUSersAction";
// import DataTable from 'your-datatable-component';  // replace with actual import
// import Avatar from 'your-avatar-placeholder';  // replace with actual import

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
//               )
//             },
//           ]}
//            data={allUsers}
//            title="List of Users"
//         />
//       )}
//     </div>
//   );
// };

// export default DBUsers;

// const allUserReducer = (state = null, action) => {
//   switch (action.type) {
//     case "GET_ALL_USER":
//       return state;

//     case "SET_ALL_USER":
//       return action.allUsers;

//     default:
//       return state;
//   }
// };

// export default allUserReducer;

// export const setAllUserDetails = (data) => {
//   return {
//     type: "SET_ALL_USER",
//     allUsers: data,
//   };
// };

// export const getAllUserDetails = (data) => {
//   return {
//     type: "GET_ALL_USER",
//   };
// };





//cartpart@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@____________________++++++++++++++++++++=============================



import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { buttonClick, slideIn, staggerFadeInOut } from "../animations";
import { BiChevronsRight, FcClearFilters } from "../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { setCartOff } from "../context/actions/displayCartAction";
import { alertNULL, alertSuccess } from "../context/actions/alertActions";
import { baseURL, getAllCartItems, increaseItemQuantity } from "../api";
import { setCartItems } from "../context/actions/cartAction";
import axios from "axios";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let tot = 0;
    if (cart) {
      cart.map((data) => {
        tot = tot + data.product_price * data.quantity;
        setTotal(tot);
      });
    }
  }, [cart]);

  const handleCheckOut = () => {
    const data = {
      user: user,
      cart: cart,
      total: total,
    };
    axios
      .post(${baseURL}/api/products/create-checkout-session, { data })
      .then((res) => {
        // console.log(res);
        if (res.data.url) {
        window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <motion.div
      {...slideIn}
      className="fixed z-50 top-0 right-0 w-300 md:w-508 bg-lightOverlay backdrop-blur-md shadow-md h-screen"
    >
      <div className="w-full flex items-center justify-between py-4 pb-12 px-6">
        <motion.i
          {...buttonClick}
          className="cursor-pointer"
          onClick={() => dispatch(setCartOff())}
        >
          <BiChevronsRight className="text-[50px] text-textColor" />
        </motion.i>
        <p className="text-2xl text-white font-semibold">Your Cart</p>
        <motion.i {...buttonClick} className="cursor-pointer">
          <FcClearFilters className="text-[30px] text-textColor" />
        </motion.i>
      </div>

      <div className="flex-1 flex flex-col items-start justify-start rounded-t-3xl bg-zinc-700 h-full py-6 gap-3 relative">
        {cart && cart?.length > 0 ? (
          <>
            <div className="flex flex-col w-full items-start justify-start gap-3 h-[65%] overflow-y-scroll scrollbar-none px-4">
              {cart &&
                cart?.length > 0 &&
                cart?.map((item, i) => (
                  <CartItemCard key={i} index={i} data={item} />
                ))}
            </div>
            <div className="bg-zinc-800 rounded-t-[40px] w-full h-[20%] flex flex-col items-center justify-center px-4 py-30 gap-3">
              <div className="w-full flex items-center justify-evenly ">
                <p className="text-3xl text-zinc-500 font-semibold w-2 ">
                  Total
                </p>
                <p className="text-3xl text-orange-500 font-semibold flex items-center justify-center gap-1">
                  <span className="text-primary">$</span> {total}
                </p>
              </div>
              <motion.div
                {...buttonClick}
                className="bg-orange-400 w-[70%] px-4 py-3 text-xl text-black font-semibold hover:bg-orange-500 drop-shadow-md rounded-2xl text-center"
                onClick={handleCheckOut}
              >
                Check Out
              </motion.div>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl text-primary font-bold">Empty Cart</h1>
          </>
        )}
      </div>
    </motion.div>
  );
};

export const CartItemCard = ({ index, data }) => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [itemTotal, setItemTotal] = useState(0);
  const dispatch = useDispatch();

  const decrementCart = (productId) => {
    dispatch(alertSuccess("Updated the cartitem"));
    increaseItemQuantity(user?.user_id, productId, "decrement").then((data) => {
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
        dispatch(alertNULL());
      });
    });
  };

  const incrementCart = (productId) => {
    dispatch(alertSuccess("Updated the cartitem"));
    increaseItemQuantity(user?.user_id, productId, "increment").then((data) => {
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
        dispatch(alertNULL());
      });
    });
  };

  useEffect(() => {
    setItemTotal(data.product_price * data.quantity);
  }, [itemTotal, cart]);
  return (
    <motion.div
      key={index}
      {...staggerFadeInOut(index)}
      className="w-full flex items-center justify-start bg-zinc-500"
    >
      <img
        src={data?.imageURL}
        className="w-24 min-w-[94px] h-24 object-contain m-2"
        alt=""
      />

      <div className="flex items-center justify-start gap-1 w-full">
        <p className="text-lg text-primary font-semibold">
          {data?.product_name}
          <span className="text-sm block capitalize text-gray-700">
            {data?.product_category}
          </span>
        </p>
        <p className="text-sm flex items-center justify-center gap-1 m-3 font-semibold text-red-400 ml-auto">
          $ {itemTotal}
        </p>
      </div>

      <div className="ml-auto flex items-center justify-center gap-3">
        <motion.div
          {...buttonClick}
          onClick={() => decrementCart(data?.productId)}
          className="w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer"
        >
          <p className="text-xl font-semibold text-primary">--</p>
        </motion.div>
        <p className="text-lg text-primary  font-semibold">{data?.quantity}</p>
        <motion.div
          {...buttonClick}
          className="w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer"
          onClick={() => incrementCart(data?.productId)}
        >
          <p className="text-xl font-semibold text-primary">+</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Cart;