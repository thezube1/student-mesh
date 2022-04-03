import { createSlice } from "@reduxjs/toolkit";

export const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    layout: "card",
  },
  reducers: {
    setLayout: (state, action) => {
      return {
        ...state,
        layout: action.payload,
      };
    },
  },
});

export const { setLayout } = layoutSlice.actions;

export default layoutSlice.reducer;
