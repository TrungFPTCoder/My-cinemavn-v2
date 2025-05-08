import { createSlice } from "@reduxjs/toolkit";

const FavoriteMoviesSlice = createSlice({
    name: "favoMovies",
    initialState: {
        favoMovies: {
            allFavoMovies: null,
            isFetching: false,
            error: false,
        },
        addFavoMovie:{
            isFetching: false,
            error: false,
            success: false,
        },
        deleteFavoMovie:{
            isFetching: false,
            error: false,
            success: false,
        },
        // msg:""
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
        },
        resetFavoMovies: (state) => {
            state.favoMovies.allFavoMovies = null;
            state.favoMovies.isFetching = false;
            state.favoMovies.error = false;
        },
        addFavoStart: (state) => {
            state.addFavoMovie.isFetching = true;
        },
        addFavoSuccess: (state) => {
            state.addFavoMovie.isFetching = false;
            state.addFavoMovie.success = true;
            state.addFavoMovie.error = false;
        },
        addFavoFailure: (state) => {
            state.addFavoMovie.isFetching = false;
            state.addFavoMovie.error = true;
        },
        deleteFavoStart: (state) => {
            state.deleteFavoMovie.isFetching = true;
        },
        deleteFavoSuccess: (state) => {
            state.deleteFavoMovie.isFetching = false;
            state.deleteFavoMovie.success = true;
            state.deleteFavoMovie.error = false;
        },
        deleteFavoFailure: (state) => {
            state.deleteFavoMovie.isFetching = false;
            state.deleteFavoMovie.error = true;
        },
    },
});
export const { 
    getFavoStart, 
    getFavoSuccess, 
    getFavoFailure,
    addFavoStart,
    addFavoSuccess,
    addFavoFailure,
    resetFavoMovies,
    deleteFavoStart,
    deleteFavoSuccess,
    deleteFavoFailure
} = FavoriteMoviesSlice.actions;

export default FavoriteMoviesSlice.reducer;