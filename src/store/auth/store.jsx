import { createSlice } from "@reduxjs/toolkit";
import {
  loginReducer,
  getInfoReducer,
  logoutReducer,
  getSpeciesReducer,
  getRankReducer,
  addSpeciesReducer,
  getSpeciesIdReducer,
  putDataSpeciesReducer,
  getDanhMucReducer,
} from "./action";
const initialState = {
  logged: localStorage.getItem("t") ? true : false,
  currentUser: undefined,
  loading: false,
  loadingInfo: false,
  errMessage: "",
  dataSpecies: undefined,
  dataRank: undefined,
  addSpecies: undefined,
  speciesId: undefined,
  putSpecies: undefined,
  deleteSpecies: undefined,
  danh_muc: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    loginReducer(builder);
    getInfoReducer(builder);
    logoutReducer(builder);
    getSpeciesReducer(builder);
    getRankReducer(builder);
    addSpeciesReducer(builder);
    getSpeciesIdReducer(builder);
    putDataSpeciesReducer(builder);
    getDanhMucReducer(builder);
  },
});

const { action, reducer } = authSlice;
export default reducer;
