import { createSlice } from "@reduxjs/toolkit";

const FavoriteMoviesSlice = createSlice({
    name: "favoMovies",
    initialState: {
        favoMovies: {
            allFavoMovies: null,
            isFetching: false,
            error: false,
        },
        msg:""
    },
    reducers: {
        getFavoStart: (state) => {
            state.favoMovies.isFetching = true;
        },
        getFavoSuccess: (state, action) => {
            state.favoMovies.isFetching = false;
            state.favoMovies.allFavoMovies = action.payload;
            state.favoMovies.error = false;
        },
        getFavoFailure: (state) => {
            state.favoMovies.isFetching = false;
            state.favoMovies.error = true;
        }
    },
});
export const { 
    getFavoStart, 
    getFavoSuccess, 
    getFavoFailure    
} = FavoriteMoviesSlice.actions;

export default FavoriteMoviesSlice.reducer;