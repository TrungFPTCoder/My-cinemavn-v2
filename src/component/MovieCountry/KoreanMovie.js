import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieCountry } from '../../service/MovieService';
import { setKoreanMovies } from '../Slice/KoreanMoviesSlice';
import LoadingComponent from '../LoadingComponent';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { SWIPER_BREAKPOINTS } from '../SwiperConfig';
function KoreanMovie({ country }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const koreanMovies = useSelector((state) => state.koreanMovies);
    useEffect(() => {
        const loadKoreanMovies = async () => {
            try {
                setLoading(true);
                const movieData = await fetchMovieCountry(country);
                dispatch(setKoreanMovies(movieData));
            } catch (error) {
                console.error('Failed to fetch Korean movies:', error);
            } finally {
                setLoading(false);
            }
        }
        loadKoreanMovies();
    }, [dispatch, country]);
    // console.log(koreanMovies);
    if (loading) {
        return <LoadingComponent />
    }
    return (
        <div className="position-relative"> {/* Thêm position-relative để định vị nút */}
            {koreanMovies.items?.length > 0 ? (
                <>
                    <Swiper
                        // install Swiper modules
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={10}
                        slidesPerView={6}
                        navigation={{
                            prevEl: '.korean-movie-prev',
                            nextEl: '.korean-movie-next',
                        }}
                        grabCursor={true}
                        autoplay={{ delay: 4000 }}
                        // onSwiper={(swiper) => console.log(swiper)}
                        // onSlideChange={() => console.log('slide change')}
                        breakpoints={SWIPER_BREAKPOINTS}
                    >
                        {koreanMovies.items?.map((koreanMovie) => (
                            <SwiperSlide key={koreanMovie.id}>
                                <div className="card border-0 movie--width">
                                    <div className='img-container overflow-hidden position-relative'>
                                        <img src={koreanMovie.thumb_url || '/images/updating_image.png'} className="card-img hover-thumb" alt={koreanMovie.name} />
                                        <div className="play-button">
                                            <Link to={`/watch/${koreanMovie.slug}`}><FontAwesomeIcon icon={faPlayCircle} fontSize={60} color="white" /></Link>
                                        </div>
                                    </div>
                                    <div className='movie--name position-absolute'>
                                        <h6 className='text-center text-light'>{koreanMovie.name}</h6>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {/* Nút custom */}
                    <div className="korean-movie-prev position-absolute top-50 translate-middle-y" style={{ zIndex: 10, cursor: 'pointer', left: '10px', backgroundColor: 'rgba(0, 0, 0, 0.6)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesomeIcon icon={faChevronLeft} size="lg" color="white" />
                    </div>
                    <div className="korean-movie-next position-absolute top-50 translate-middle-y" style={{ zIndex: 10, cursor: 'pointer', right: '10px', backgroundColor: 'rgba(0, 0, 0, 0.6)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesomeIcon icon={faChevronRight} size="lg" color="white" />
                    </div>
                </>
            ) : (
                <div className="text-light text-center py-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
                    <p className="mb-0">Hiện tại danh mục này đang được cập nhật phim. Bạn vui lòng quay lại sau nhé! 😉</p>
                </div>
            )}
        </div>
    )
}

export default KoreanMovie