import { createSlice } from "@reduxjs/toolkit";

const categoryMoviesSlice = createSlice({
    name: 'categoryMovies',
    initialState: {},
    reducers: {
        setCategoryMovies(state, action) {
            return action.payload;
        }
    }
});

export const { setCategoryMovies } = categoryMoviesSlice.actions;
export default categoryMoviesSlice.reducer;