import { createSlice } from "@reduxjs/toolkit";

const chinaMoviesSlice = createSlice({
    name: 'chinaMovies',
    initialState: {},
    reducers: {
        setChinaMovies(state, action) {
            return action.payload;
        }
    }
});
export const { setChinaMovies } = chinaMoviesSlice.actions;
export default chinaMoviesSlice.reducer;