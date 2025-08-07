import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    items: [],
  },
  reducers: {
    setComments: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
