import axios from "axios";

// const API_URL_NEWMOVIES = 'https://phim.nguonc.com/api/films/phim-moi-cap-nhat';
// thử nghiệm login
const API_URL_ACCOUNTS = 'https://mycinemaapi.vercel.app';
const API_URL_ADDACCOUNT = 'https://mycinemaapi.vercel.app/addAccount';
// const API_URL_ACCOUNTS = 'https://test-backend-psi-five.vercel.app/';
// const token = '10112004trung'
// const API_URL_ACCOUNTS = 'http://localhost:9999/accounts'
// const API_URL_ACCOUNTS_NEW = ''

export const fetchNewMovies = async (page = 1) => {
    const response = await axios.get(`https://phim.nguonc.com/api/films/phim-moi-cap-nhat?page=${page}`);
    return response.data;
};
export const fetchMovieDetails = async (slug) => {
    const response = await axios.get(`https://phim.nguonc.com/api/film/${slug}`);
    return response.data.movie;
}
export const fetchMovieCate = async (cate, page = 1) => {
    const response = await axios.get(`https://phim.nguonc.com/api/films/danh-sach/${cate}?page=${page}`);
    return response.data;
};
export const fetchSearchMovie = async (search, page = 1) => {
    const response = await axios.get(`https://phim.nguonc.com/api/films/search?keyword=${search}&page=${page}`);
    return response.data;
}
export const fetchMovieCountry = async (country, page = 1) => {
    const response = await axios.get(`https://phim.nguonc.com/api/films/quoc-gia/${country}?page=${page}`);
    return response.data;
}

// thử nghiệm login 
export const fetchAccount = async () => {
    const response = await axios.get(API_URL_ACCOUNTS);
    return response.data;
}
// export const fetchAccount = async (token) => {
//     const response = await axios.get(API_URL_ACCOUNTS, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
//     return response.data;
// };
// thử nghiệm login google
export const addAccountService = async (account) => {
    const response = await axios.post(API_URL_ADDACCOUNT, account);
    return response.data;
};
//thử nghiệm add favo movie
export const addFavoMovie = async (account) => {
    const response = await axios.post(API_URL_ACCOUNTS, account);
    return response.data.FavoriteMovie;
};
//favoMovie
export const fetchFavoMovie = async ()=>{
    const response = await axios.get(API_URL_ACCOUNTS);
    return response.data;
}
///////////
//tạm thời chưa dùng
// export const updateAccountService = async (account) => {
//     const response = await axios.put(`${API_URL_ACCOUNTS}/${account.id}`, account);
//     return response.data;
// };


// export const fetchMovieCate2 = async (cate) => {
//     const response = await axios.get(`https://phim.nguonc.com/api/films/danh-sach/${cate}?page=2`);
//     return response.data;
// }
// export const fetchAccessories = async () => {
//     const response = await axios.get(API_URL_ACCESSORIES);
//     return response.data;
// };
// export const fetchAccount = async () => {
//     const response = await axios.get(API_URL_ACCOUNTS);
//     return response.data;
// };
// export const fetchPhoneDetails = async () => {
//     const response = await axios.get(API_URL_PHONEDETAILS);
//     return response.data;
// };
// export const fetchCart = async () => {
//     const response = await axios.get(API_URL_CARTS);
//     return response.data;
// };
// export const deleteProductService = async (id) => {
//     const response = await axios.delete(`${API_URL_PRODUCT}/${id}`);
//     return response.data;
// };