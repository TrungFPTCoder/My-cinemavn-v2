import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { SWIPER_BREAKPOINTS } from './SwiperConfig';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function NewMovieSlide() {
    const newMovies = useSelector((state) => state.newMovies);

    return (
        <>
            <div className="d-flex align-items-center mb-3">
                <h4 className="cate--movie--text">Phim mới cập nhật:</h4>
                <Link to="/danh-sach/phim-moi-cap-nhat" className="text-decoration-none">
                    <div className="icon-container mx-2">
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            fontSize={20}
                            color="white"
                            className="icon"
                        />
                        <span className="tooltip-text">Xem thêm</span>
                    </div>
                </Link>
            </div>

            <div className="position-relative"> {/* Wrapper cho Swiper và nút custom */}
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={10}
                    slidesPerView={6}
                    navigation={{
                        prevEl: '.new-movie-prev',
                        nextEl: '.new-movie-next',
                    }}
                    grabCursor={true}
                    autoplay={{ delay: 4000 }}
                    breakpoints={SWIPER_BREAKPOINTS}
                >
                    {newMovies.items?.map((newMovie) => (
                        <SwiperSlide key={newMovie.id}>
                            <div className="card border-0 movie--width">
                                <div className='img-container overflow-hidden position-relative w-100'>
                                    <img src={newMovie.thumb_url || '/images/updating_image.png'} className="card-img w-100 hover-thumb" alt={newMovie.name} />
                                    <div className="play-button">
                                        <Link to={`/watch/${newMovie.slug}`}><FontAwesomeIcon icon={faPlayCircle} fontSize={60} color="white" /></Link>
                                    </div>
                                </div>
                                <div className='movie--name position-absolute'>
                                    <h6 className='text-center text-light'>{newMovie.name}</h6>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                
                {/* Nút custom */}
                <div className="new-movie-prev position-absolute top-50 translate-middle-y" style={{ zIndex: 10, cursor: 'pointer', left: '10px', backgroundColor: 'rgba(0, 0, 0, 0.6)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FontAwesomeIcon icon={faChevronLeft} size="lg" color="white" />
                </div>
                <div className="new-movie-next position-absolute top-50 translate-middle-y" style={{ zIndex: 10, cursor: 'pointer', right: '10px', backgroundColor: 'rgba(0, 0, 0, 0.6)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FontAwesomeIcon icon={faChevronRight} size="lg" color="white" />
                </div>
            </div>
        </>
    );
}

export default NewMovieSlide;
