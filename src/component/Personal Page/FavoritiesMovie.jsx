import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAccount, fetchFavoMovie } from '../../service/MovieService';
import { setAccount, setFavoMovie } from '../MovieStore';
import LoadingComponent from '../LoadingComponent';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import '../../assest/FavoritiesMovie.css';
import { getAllFavoMovies } from '../../service/apiRequest';
import { createAxios } from '../createInstance';
import { loginSuccess } from '../Slice/AuthSlice';
function FavoritiesMovie() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.login.currentUser);
    const axiosJWT = createAxios(user, dispatch, loginSuccess);
    const favoMovies = useSelector(state => state.favoMovies.favoMovies.allFavoMovies);
    const loadingFavoMovies = useSelector(state => state.favoMovies.favoMovies.isFetching);
    // const favoMovies = useSelector(state => state.favoMovies.favoriteMovies);
    // const loading = useSelector(state => state.favoMovies.isFetching);
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
        if (user?.accessToken) {
            getAllFavoMovies(user?.accessToken, dispatch, user?.email, axiosJWT);
        }
    }, [user, dispatch]);
    return (
        <div>
            <div className='border border-light-1 text-light p-3 rounded-2'>
                {loadingFavoMovies ?
                    (<LoadingComponent />) :
                    (<div className='row'>
                        {favoMovies?.favoriteMovies?.length !== 0 ? (
                            favoMovies?.favoriteMovies?.map((movie) => (
                                <div className='col-6 col-md-3 col-sm-4 col-xl-2 mb-3'>
                                    <div className='card position-relative tooltip-wrapper border-0 w-100'>
                                        <div className='img-container1 position-relative overflow-hidden'>
                                            <img
                                                src={movie.thumb_url}
                                                alt={movie.name}
                                                className='hover-thumb-1 w-100 '
                                            // height={200}
                                            />
                                            <div className="play-button1">
                                                <Link to={`/watch/${movie.slug}`}>
                                                    <FontAwesomeIcon icon={faPlayCircle} fontSize={60} color="white" />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className='movie--name--1 position-absolute'>
                                            <Link to={`/watch/${movie.slug}`} className='text-decoration-none'>
                                                <h6 className='text-center text-light'>{movie.name}</h6>
                                            </Link>
                                        </div>
                                        <div className="tooltip-content-favo">{movie.name}</div>
                                    </div>
                                </div>
                            ))) : (
                            <div className='text-center'>
                                <h5 className='text-light'>Bạn chưa có phim yêu thích nào</h5>
                                <p className='text-light'>Hãy thêm phim yêu thích để theo dõi</p>
                                <Link to={`/`} className='btn btn-primary'>Quay lại trang chủ</Link>
                            </div>
                        )}
                    </div>)
                }
            </div>
        </div >
    )
}

export default FavoritiesMovie
