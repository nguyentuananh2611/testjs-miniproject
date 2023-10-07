export * from "./action";
export const authLoading = (state) => state.auth.loading;
export const authErrorMessage = (state) => state.auth.errMessage;
export const authUser = (state) => state.auth.currentUser;
export const authSpecies = (state) => state.auth.dataSpecies;
export const authRank = (state) => state.auth.dataRank;
export const authSpeciesId = (state) => state.auth.speciesId;
export const authPutSpecies = (state)=> state.auth.putSpecies;
export const authDanhMuc = (state) => state.auth.danh_muc;