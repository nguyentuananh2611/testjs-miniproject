import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiLogin,
  apiGetMe,
  apiLogout,
  apiGetSpecies,
  apiGetRank,
  apiAddSpecies,
  apiGetSpeciesID,
  apiPutDataSpecies,
  apiDelete,
  apiDanhMuc,
} from "../../api/auth";
import { setToken, getToken } from "../../api/auth/helper";

export const loginAction = createAsyncThunk(
  `auth/login`,
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiLogin(data);
      setToken(response.access_token);
      dispatch(getInfoAction());
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getInfoAction = createAsyncThunk(`api/me`, async () => {
  const response = await apiGetMe();
  return response;
});

export const logoutAction = createAsyncThunk("auth/logout", async () => {
  const response = await apiLogout();
  return response;
});

export const getInitData = createAsyncThunk(
  "auth/init",
  async (_, { dispatch }) => {
    if (getToken()) dispatch(getInfoAction());
  }
);

export const loginReducer = (builder) => {
  builder
    .addCase(loginAction.pending, (state) => {
      state.loading = true;
      state.errMessage = "";
    })
    .addCase(loginAction.fulfilled, (state) => {
      state.loading = false;
      state.logged = true;
    })
    .addCase(loginAction.rejected, (state, action) => {
      state.logged = false;
      state.loading = false;
      state.errMessage = action.payload;
    });
};

export const getInfoReducer = (builder) => {
  builder
    .addCase(getInfoAction.pending, (state) => {
      state.loadingInfo = true;
    })
    .addCase(getInfoAction.fulfilled, (state, action) => {
      state.loadingInfo = false;
      state.currentUser = action.payload;
    })
    .addCase(getInfoAction.rejected, (state) => {
      state.loadingInfo = false;
      state.logged = false;
      state.currentUser = undefined;
      setToken("");
    });
};

export const logoutReducer = (builder) => {
  builder
    .addCase(logoutAction.rejected, (state) => {
      state.currentUser = undefined;
      state.errMessage = "";
      state.logged = false;
      state.loading = false;
      setToken("");
    })
    .addCase(logoutAction.fulfilled, (state) => {
      state.currentUser = undefined;
      state.errMessage = "";
      state.logged = false;
      state.loading = false;
      setToken("");
    });
};

export const getSpeciesAction = createAsyncThunk(
  "auth/species",
  async (filter) => {
    const response = await apiGetSpecies(filter);
    const { list, pagination } = response;
    return { list, pagination };
  }
);

export const getSpeciesReducer = (builder) => {
  builder
    .addCase(getSpeciesAction.pending, (state) => {
      state.loading = true;
    })
    .addCase(getSpeciesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.dataSpecies = action.payload;
    })
    .addCase(getSpeciesAction.rejected, (state) => {
      state.loading = false;
      state.dataSpecies = undefined;
    });
};

export const getRankAction = createAsyncThunk("auth/rank", async () => {
  const response = await apiGetRank();
  return response;
});

export const getRankReducer = (builder) => {
  builder
    .addCase(getRankAction.fulfilled, (state, action) => {
      state.dataRank = action.payload;
    })
    .addCase(getRankAction.rejected, (state, action) => {
      state.dataRank = undefined;
    });
};

export const addSpeciesAction = createAsyncThunk(
  "auth/add",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await apiAddSpecies(postData);
      alert(`bạn đã thêm mới thành công`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addSpeciesReducer = (builder) => {
  builder
    .addCase(addSpeciesAction, (state, action) => {
      state.errMessage = "";
    })
    .addCase(addSpeciesAction.fulfilled, (state, action) => {
      state.addSpecies = action.payload;
      state.errMessage = "";
    })
    .addCase(addSpeciesAction.rejected, (state, action) => {
      state.addSpecies = undefined;
      state.errMessage = action.payload;
    });
};

export const getSpeciesIdAction = createAsyncThunk(
  `auth/speciesId`,
  async (id) => {
    const response = await apiGetSpeciesID(id);
    return response;
  }
);

export const getSpeciesIdReducer = (builder) => {
  builder
    .addCase(getSpeciesIdAction.fulfilled, (state, action) => {
      state.speciesId = action.payload;
    })
    .addCase(getSpeciesIdAction.rejected, (state, action) => {
      state.speciesId = undefined;
    });
};

export const putDataSpeciesAction = createAsyncThunk(
  `auth/put`,
  async (updateData, { rejectWithValue, getState }) => {
    const state = getState();
    try {
      const id = state.auth.speciesId.id;
      const response = await apiPutDataSpecies(updateData, id);
      alert(`bạn đã cập nhật thành công`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const putDataSpeciesReducer = (builder) => {
  builder
    .addCase(putDataSpeciesAction.pending, (state, action) => {
      state.errMessage = "";
    })
    .addCase(putDataSpeciesAction.fulfilled, (state, action) => {
      state.putSpecies = action.payload;
      state.errMessage = "";
    })
    .addCase(putDataSpeciesAction.rejected, (state, action) => {
      state.putSpecies = undefined;
      state.errMessage = action.payload;
    });
};

export const deleteSpeciesAction = createAsyncThunk(
  `auth/delete`,
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiDelete(id);
      alert("xóa dữ liệu thành công");
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getDanhMucAction = createAsyncThunk("auth/danh_muc", async () => {
  const response = await apiDanhMuc();
  return response;
});

export const getDanhMucReducer = (builder) => {
  builder
    .addCase(getDanhMucAction.fulfilled, (state, action) => {
      state.danh_muc = action.payload;
    })
    .addCase(getDanhMucAction.rejected, (state, action) => {
      state.danh_muc = undefined;
    });
};
