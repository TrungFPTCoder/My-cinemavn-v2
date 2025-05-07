import { createSlice } from "@reduxjs/toolkit";
const actionMovieSlice = createSlice({
    name: 'actionMovies',
    initialState: {},
    reducers: {
        setActionMovies(state, action) {
            return action.payload;
        }
    }
});
export const { setActionMovies } = actionMovieSlice.actions;
export default actionMovieSlice.reducer;
