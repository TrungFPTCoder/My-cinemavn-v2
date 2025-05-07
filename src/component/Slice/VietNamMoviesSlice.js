import { createSlice } from "@reduxjs/toolkit";

const vietNamMoviesSlice = createSlice({
    name: 'vietNamMovies',
    initialState: {},
    reducers: {
        setVietNamMovies(state, action) {
            return action.payload;
        }
    }
});
export const { setVietNamMovies } = vietNamMoviesSlice.actions;
export default vietNamMoviesSlice.reducer;