import { createSlice } from "@reduxjs/toolkit";

const countryMoviesSlice = createSlice({
    name: 'countryMovies',
    initialState: {},
    reducers: {
        setCountryMovies(state, action) {
            return action.payload;
        }
    }
});
export const { setCountryMovies } = countryMoviesSlice.actions;
export default countryMoviesSlice.reducer;