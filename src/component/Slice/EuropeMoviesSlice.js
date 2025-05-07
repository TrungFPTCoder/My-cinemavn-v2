import { createSlice } from "@reduxjs/toolkit";

const europeMoviesSlice = createSlice({
    name: 'europeMovies',
    initialState: {},
    reducers: {
        setEuropeMovies(state, action) {
            return action.payload;
        }
    }
});

export const { setEuropeMovies } = europeMoviesSlice.actions;
export default europeMoviesSlice.reducer;