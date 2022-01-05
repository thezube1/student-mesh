import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    account: null,
    provider: { isProvider: false, school: null },
  },
  reducers: {
    setAccount: (state, action) => {
      return {
        ...state,
        account: action.payload,
      };
    },

    setProvider: (state, action) => {
      return {
        ...state,
        provider: {
          isProvider: action.payload.provider,
          school: action.payload.school,
        },
      };
    },
  },
});

export const { setAccount, setName, setProvider } = accountSlice.actions;

export default accountSlice.reducer;
