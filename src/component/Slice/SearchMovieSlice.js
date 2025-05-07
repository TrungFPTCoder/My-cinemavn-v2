import { createSlice } from "@reduxjs/toolkit";

const searchMovieSlice = createSlice({
    name: 'SearchMovies',
    initialState: {},
    reducers: {
        setSearchMovies(state, action) {
            return action.payload;
        }
    }
});
export const { setSearchMovies } = searchMovieSlice.actions;
export default searchMovieSlice.reducer;
