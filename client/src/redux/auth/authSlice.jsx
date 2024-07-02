import { createSlice } from "@reduxjs/toolkit";

// const name = JSON.parse(localStorage.getItem("name"))
//   ? JSON.parse(localStorage.getItem("name"))
//   : "";

// const storedName = localStorage.getItem("name");
// const name = storedName ? JSON.parse(storedName) : "";

// const storedName = localStorage.getItem("name");
// const initialName = storedName ? JSON.parse(storedName) : "";

// const storedName = localStorage.getItem("name");
// let initialName = "";

// try {
//   initialName = storedName ? JSON.parse(storedName) : "";
// } catch (error) {
//   console.error("Error parsing localStorage name:", error);
//   initialName = "";
// }

const initialState = {
  isLoggedIn: false,
  // name: "auth",
  user: {
    _id: "",
    id: "",
    firstName: "",
    surname: "",
    otherName: "",
    email: "",
    phone: "",
    photo: "",
    address: "",
    role: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      localStorage.setItem("name", JSON.stringify(action.payload));
      state.name = action.payload;
    },
    SET_USER(state, action) {
      const profile = action.payload;
      state.user._id = profile._id;
      state.user.id = profile.id;
      state.user.firstName = profile.firstName;
      state.user.surname = profile.surname;
      state.user.otherName = profile.otherName;
      state.user.email = profile.email;
      state.user.phone = profile.phone;
      state.user.photo = profile.photo;
      state.user.address = profile.address;
      state.user.role = profile.role;
    },
  },
});

export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
// export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.user;

export default authSlice.reducer;
