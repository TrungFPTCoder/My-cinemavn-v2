import { createSlice } from "@reduxjs/toolkit";

const newMovieSlice = createSlice({
    name: 'newMovies',
    initialState: [],
    reducers: {
        setNewMovies(state, action) {
            return action.payload;
        }
    }
});
export const { setNewMovies } = newMovieSlice.actions;
export default newMovieSlice.reducer;