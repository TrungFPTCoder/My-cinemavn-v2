import { createSlice } from "@reduxjs/toolkit";

const koreanMoviesSlice = createSlice({
    name: 'koreanMovies',
    initialState: {},
    reducers: {
        setKoreanMovies(state, action) {
            return action.payload;
        }
    }
});
export const { setKoreanMovies } = koreanMoviesSlice.actions;
export default koreanMoviesSlice.reducer;