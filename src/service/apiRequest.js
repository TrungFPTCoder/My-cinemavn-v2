import axios from 'axios';
import { loginFailure, loginStart, loginSuccess, logoutFailure, logoutStart, logoutSuccess, registerFailure, registerStart, registerSuccess } from '../component/Slice/AuthSlice';
import { getFavoFailure, getFavoStart, getFavoSuccess } from '../component/Slice/FavoriteMoviesSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("https://backendv2jwt.vercel.app/v1/auth/login", user);
        dispatch(loginSuccess(res.data));
        navigate("/");
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
        const res = await axios.post("https://backendv2jwt.vercel.app/v1/auth/register", user);
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
        await axiosJWT.post("https://backendv2jwt.vercel.app/v1/auth/logout",id , {
            headers: { token: `Bearer ${token}`, }
        });
        dispatch(logoutSuccess());
        navigate("/");
    } catch (err) {
        dispatch(logoutFailure());
    }
}
export const getAllFavoMovies = async (accessToken, dispatch, email, axiosJWT) => {
    dispatch(getFavoStart());
    try {
        const res = await axiosJWT.post(`https://backendv2jwt.vercel.app/v1/movie/getAllFavoMovies`, {email},{
            headers: { token: `Bearer ${accessToken}`, }
        });
        dispatch(getFavoSuccess(res.data));
    } catch (err) {
        dispatch(getFavoFailure());
    }
}