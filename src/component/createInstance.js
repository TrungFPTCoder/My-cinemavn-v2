import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const refreshToken = async () => { //khi đã login nhưng thời gian của accessToken đã hết thì sẽ gọi hàm này để lấy accessToken mới
    try {
        const response = await axios.post("https://backendv2jwt.vercel.app/v1/auth/refreshToken", {},{
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
            const decodedToken = jwtDecode(user?.accessToken);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp < currentTime) {
                const data = await refreshToken();//data bao gồm accessToken và refreshToken
                const refeshUser = {
                    ...user,
                    accessToken: data.accessToken,
                };
                dispatch(stateSuccess(refeshUser));
                config.headers["token"] = "Bearer " + data.accessToken;//create new header by new accessToken
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    return newInstance;
}
