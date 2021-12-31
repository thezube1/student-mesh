import { createSlice } from "@reduxjs/toolkit";

export const web3Slice = createSlice({
  name: "web3",
  initialState: {
    account: null,
    contract: null,
  },
  reducers: {
    setAccount: (state, action) => {
      return {
        ...state,
        account: action.payload,
      };
    },
    setContract: (state, action) => {
      return {
        ...state,
        contract: action.payload,
      };
    },
  },
});

export const { setAccount, setContract } = web3Slice.actions;

export default web3Slice.reducer;
