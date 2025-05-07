import { createSlice } from "@reduxjs/toolkit";

const searchMovieSlideSuggest = createSlice({
    name: 'SearchMoviesSuggest',
    initialState: {},
    reducers: {
        setSearchMoviesSuggest(state, action) {
            return action.payload;
        }
    }
});
export const { setSearchMoviesSuggest } = searchMovieSlideSuggest.actions;
export default searchMovieSlideSuggest.reducer;