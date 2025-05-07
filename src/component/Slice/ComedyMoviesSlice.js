import { createSlice } from "@reduxjs/toolkit";

const comedyMovieSlice = createSlice({
    name: 'comedyMovies',
    initialState: {},
    reducers: {
        setComedyMovies(state, action) {
            return action.payload;
        }
    }
});
export const { setComedyMovies } = comedyMovieSlice.actions;
export default comedyMovieSlice.reducer;