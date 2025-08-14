//    


// {{{{{{{{{{{{{{{{{{{{{{ Chat code }}}}}}}}}}}}}}}}}}}}}}

// export const SET_ALL_USER_DETAILS = 'SET_ALL_USER_DETAILS';

// export const setAllUserDetails = (data) => {
//     return {
//         type: SET_ALL_USER_DETAILS,
//         payload: data,
//     };
// };

export const setAllUserDetails = (data) => {
    return {
        type: "SET_ALL_USER",
        allUsers: data,
    };
};

export const getAllUserDetails = (data) => {
    return {
        type: "GET_ALL_USER",
    };
};


