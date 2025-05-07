import { createSlice } from "@reduxjs/toolkit";

const searchMovieSliceSuggest = createSlice({
    name: 'SearchMoviesSuggest',
    initialState: {},
    reducers: {
        setSearchMoviesSuggest(state, action) {
            return action.payload;
        }
    }
});
export const { setSearchMoviesSuggest } = searchMovieSliceSuggest.actions;
export default searchMovieSliceSuggest.reducer;