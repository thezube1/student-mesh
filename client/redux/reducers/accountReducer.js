import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    account: null,
  },
  reducers: {
    setAccount: (state, action) => {
      return {
        ...state,
        account: action.payload,
      };
    },
  },
});

export const { setAccount } = accountSlice.actions;

export default accountSlice.reducer;
