import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userInfo {
  role: string;
  username: string;
  uuid: string;
}

const initialState: userInfo = {
  role: "",
  username: "",
  uuid: "",
};

export const roleUser = createSlice({
  name: "userChanger",
  initialState,
  reducers: {
    changeRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    changeUUID: (state, action: PayloadAction<string>) => {
      state.uuid = action.payload;
    },
    changeUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeRole, changeUUID, changeUsername } = roleUser.actions;

export default roleUser.reducer;
