import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  documents:[]
};

const documentSlice = createSlice({
  name: "document",
  initialState:initialState,
  reducers: {
    setDocuments: (state, action) => {
      const documentlist = action.payload;
      if (documentlist) {       
        state.documents = documentlist;
      } 
    },
  },
});

export const { setDocuments } = documentSlice.actions;
export default documentSlice.reducer;