import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosApi } from "../../pages/config/axios.config";
import { IUser } from "../../pages/Login";
import { toaster } from "../../components/ui/toaster";
import CookieService from "../../services/CookieService";

interface IUserData {
  jwt: string;
  user: {
    id: number;
    username: string;
    identifier: string;
  };
}

interface ILoginState {
  loading: boolean;
  data: IUserData | null;
  error: string | null;
}

const initialState: ILoginState = {
  loading: false,
  data: null,
  error: null,
};
export const userLogin = createAsyncThunk<
  IUserData,
  IUser,
  { rejectValue: string }
>("login/userLogin", async (user, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await axiosApi.post("auth/local", user);
    return data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        userLogin.fulfilled,
        (state, action: PayloadAction<IUserData>) => {
          state.loading = false;
          state.data = action.payload;
          state.error = null;
          const date = new Date();
          const IN_DAYS = 3;
          const EXPIRES_IN_DAYS = 1000 * 60 * 60 * 24 * IN_DAYS;
          date.setTime(date.getTime() + EXPIRES_IN_DAYS);
          const options = { path: "/", expires: date };
          CookieService.set("jwt", action.payload.jwt, options);

          toaster.create({
            title: "Logged in successfully",
            type: "success",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      )
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload || "";

        toaster.create({
          title: "Request failed with status code 400",
          type: "error",
        });
      });
  },
});

export const selectLogin = (state: { login: ILoginState }) => state.login;

export default loginSlice.reducer;
