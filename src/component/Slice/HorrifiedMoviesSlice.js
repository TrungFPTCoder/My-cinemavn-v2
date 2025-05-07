import { createSlice } from "@reduxjs/toolkit";

const horrifiedMovieSlice = createSlice({
    name: 'horrifiedMovies',
    initialState: {},
    reducers: {
        setHorrifiedMovies(state, action) {
            return action.payload;
        }
    }
});
export const { setHorrifiedMovies } = horrifiedMovieSlice.actions;
export default horrifiedMovieSlice.reducer;