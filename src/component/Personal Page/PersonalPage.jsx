import React from 'react'
import FavoritiesMovie from './FavoritiesMovie'
import '../../assest/PersonalPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function PersonalPage() {
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.login.currentUser);
    if (!user) {
        navigate("/login");
    }
    return (
        <div className='bg-dark pb-5' style={{ paddingTop: '98px' }}>
            <div className="container">
                <div className='row'>
                    <div className="col-md-6 mb-3">
                        <div className="card bg-dark text-light border-light p-3">
                            <div className="d-flex justify-content-center align-items-center">
                                <img src={user.userImage} alt="" className='rounded-circle border border-3 border-warning user-image' />
                            </div>
                            <hr />
                            <div className="card-body user-info">
                                <h5 className="card-title">Xin chào: {user.username}</h5>
                                <p className="card-text">Email: {user.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card bg-dark text-light border-light p-3">
                            <div className="card-header text-center">
                                <h5>Thống kê số lượng phim bạn thích</h5>
                            </div>
                            <hr />
                            <div className='card-body'>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <p style={{fontSize:'4rem'}}>0</p>
                                    <FontAwesomeIcon icon={faFilm} size='3x' className='mx-4' />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <hr />

                <div>
                    <FavoritiesMovie />
                </div>
            </div>
        </div>
    )
}

export default PersonalPage