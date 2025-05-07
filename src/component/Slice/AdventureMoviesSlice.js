import { createSlice } from "@reduxjs/toolkit";

const adventureMovieSlice = createSlice({
    name: 'adventureMovies',
    initialState: {},
    reducers: {
        setAdventureMovies(state, action) {
            return action.payload;
        }
    }
});
export const { setAdventureMovies } = adventureMovieSlice.actions;
export default adventureMovieSlice.reducer;