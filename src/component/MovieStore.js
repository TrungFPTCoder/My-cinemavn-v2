import { combineReducers, configureStore } from "@reduxjs/toolkit";
import newMovieSlice from "./Slice/NewMovieSlice";
import movieDetailsSlice from "./Slice/MovieDetailSlice";
import categoryMoviesSlice from "./Slice/CategoryMoviesSlice";
import searchMovieSlice from "./Slice/SearchMovieSlice";
import searchMovieSliceSuggest from "./Slice/SearchMovieSliceSuggest";
import countryMoviesSlice from "./Slice/CountryMoviesSlice";
import chinaMoviesSlice from "./Slice/ChinaMoviesSlice";
import koreanMoviesSlice from "./Slice/KoreanMoviesSlice";
import europeMoviesSlice from "./Slice/EuropeMoviesSlice";
import vietNamMoviesSlice from "./Slice/VietNamMoviesSlice";
import adventureMovieSlice from "./Slice/AdventureMoviesSlice";
import horrifiedMovieSlice from "./Slice/HorrifiedMoviesSlice";
import actionMovieSlice from "./Slice/ActionMoviesSlice";
import comedyMovieSlice from "./Slice/ComedyMoviesSlice";
import authSlice from "./Slice/AuthSlice";
import favoMoviesSlice from "./Slice/FavoriteMoviesSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
    key: 'auth',
    storage,
};

const rootReducer = combineReducers({
    newMovies: newMovieSlice,
    movieDetails: movieDetailsSlice,
    categoryMovies: categoryMoviesSlice,
    searchMovies: searchMovieSlice,
    searchMoviesSuggest: searchMovieSliceSuggest,
    countryMovies: countryMoviesSlice,
    // test
    chinaMovies: chinaMoviesSlice,
    koreanMovies: koreanMoviesSlice,
    europeMovies: europeMoviesSlice,
    vietNamMovies: vietNamMoviesSlice,
    adventureMovies: adventureMovieSlice,
    horrifiedMovies: horrifiedMovieSlice,
    actionMovies: actionMovieSlice,
    comedyMovies: comedyMovieSlice,
    // auth
    auth: persistReducer(authPersistConfig, authSlice),
    favoMovies: persistReducer(authPersistConfig, favoMoviesSlice)
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);