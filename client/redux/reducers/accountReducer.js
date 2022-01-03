import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    account: null,
    name: { first: null, last: null },
  },
  reducers: {
    setAccount: (state, action) => {
      return {
        ...state,
        account: action.payload,
      };
    },
    setName: (state, action) => {
      return {
        ...state,
        name: { first: action.payload.first, last: action.payload.last },
      };
    },
  },
});

export const { setAccount, setName } = accountSlice.actions;

export default accountSlice.reducer;
