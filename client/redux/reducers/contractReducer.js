import { createSlice } from "@reduxjs/toolkit";

export const contractSlice = createSlice({
  name: "contract",
  initialState: {
    registered: undefined,
  },
  reducers: {
    setRegistered: (state, action) => {
      return {
        ...state,
        registered: action.payload,
      };
    },
  },
});

export const { setRegistered } = contractSlice.actions;

export default contractSlice.reducer;
