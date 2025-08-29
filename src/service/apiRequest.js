import axios from 'axios';
import { loginFailure, loginStart, loginSuccess, logoutFailure, logoutStart, logoutSuccess, registerFailure, registerStart, registerSuccess } from '../component/Slice/AuthSlice';
import { addFavoFailure, addFavoStart, addFavoSuccess, deleteFavoFailure, deleteFavoStart, deleteFavoSuccess, getFavoFailure, getFavoStart, getFavoSuccess, resetFavoMovies } from '../component/Slice/FavoriteMoviesSlice';
import { persistor } from "../component/MovieStore";
const baseURL = "https://backendv2jwt.vercel.app";
export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${baseURL}/v1/auth/login`, user, {
            withCredentials: true, // Bật gửi cookie
        });
        dispatch(loginSuccess(res.data));
        navigate("/", { replace: true });
        return { status: res.status };
    } catch (err) {
        dispatch(loginFailure());
        const status = err.response?.status || 500;
        return {
            status: status, // Gán status chính xác
            error: err.response?.data || err.message // Trả về thông tin lỗi
        };
    }
}
export const registerUser = async (user, dispatch) => {
    dispatch(registerStart());
    try {
        const res = await axios.post(`${baseURL}/v1/auth/register`, user);
        dispatch(registerSuccess());
        // navigate("/Login");
        return { status: res.status };
    } catch (err) {
        dispatch(registerFailure());
        const status = err.response?.status || 500; // Lấy status từ phản hồi hoặc mặc định là 500
        return {
            status: status, // Gán status chính xác
            error: err.response?.data || err.message // Trả về thông tin lỗi
        };
    }
}
export const logOut = async (dispatch, id, navigate, token, axiosJWT) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post(`${baseURL}/v1/auth/logout`, id, {
            headers: { token: `Bearer ${token}`, }
        });
        // persistor.purge();
        dispatch(logoutSuccess());
        dispatch(resetFavoMovies());
        //xóa cookie
        navigate("/", { replace: true });
    } catch (err) {
        dispatch(logoutFailure());
    }
}
// export const getAllFavoMovies = async (accessToken, dispatch, email, axiosJWT) => {
//     dispatch(getFavoStart());
//     try {
//         const res = await axiosJWT.post(`https://backendv2jwt.vercel.app/v1/movie/getAllFavoMovies`, { email }, {
//             headers: { token: `Bearer ${accessToken}`, }
//         });
//         dispatch(getFavoSuccess(res.data));
//     } catch (err) {
//         dispatch(getFavoFailure());
//     }
// }
export const getAllFavoMovies = async (accessToken, dispatch, userId, axiosJWT) => {
    dispatch(getFavoStart());
    try {
        const res = await axiosJWT.get(`${baseURL}/v1/movie/getAllFavoMovies/${userId}`, {
            headers: { token: `Bearer ${accessToken}`, }
        });
        dispatch(getFavoSuccess(res.data));
    } catch (err) {
        dispatch(getFavoFailure());
    }
}

export const addFavoMovie = async (accessToken, dispatch, userId, movieInfo, axiosJWT) => {
    dispatch(addFavoStart());
    try {
        const res = await axiosJWT.post(`${baseURL}/v1/movie/addMovie`,
            { userId, movieInfo },
            {
                headers: { token: `Bearer ${accessToken}`, }
            });
        dispatch(addFavoSuccess());
        return { status: res.status };
    } catch (err) {
        dispatch(addFavoFailure());
        const status = err.response?.status || 500; // Lấy status từ phản hồi hoặc mặc định là 500
        return {
            status: status, // Gán status chính xác
            error: err.response?.data || err.message // Trả về thông tin lỗi
        };
    }
}

export const deleteFavoMovie = async (accessToken, dispatch, slug, userId, axiosJWT) => {
    dispatch(deleteFavoStart());
    try {
        const res = await axiosJWT.delete(`${baseURL}/v1/movie/deleteMovie/${slug}?userId=${userId}`, {
            headers: { token: `Bearer ${accessToken}`, }
        });
        dispatch(deleteFavoSuccess());
        return { status: res.status };
    } catch (err) {
        dispatch(deleteFavoFailure());
        const status = err.response?.status || 500; // Lấy status từ phản hồi hoặc mặc định là 500
        return {
            status: status, // Gán status chính xác
            error: err.response?.data || err.message // Trả về thông tin lỗi
        };
    }
}
