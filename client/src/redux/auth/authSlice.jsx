import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  name: "",
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

export const selectIsLoggedIn = (state) => state.isLoggedIn;
export const selectName = (state) => state.name;
export const selectUser = (state) => state.user;

export default authSlice.reducer;
