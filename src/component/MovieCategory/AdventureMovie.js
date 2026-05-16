import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieCate } from '../../service/MovieService';
import { setAdventureMovies } from '../Slice/AdventureMoviesSlice';
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
function AdventureMovie({ cate }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const adventureMovies = useSelector((state) => state.adventureMovies);
    useEffect(() => {
        const loadAdventureMovies = async () => {
            try {
                setLoading(true);
                const movieData = await fetchMovieCate(cate);
                dispatch(setAdventureMovies(movieData));
            } catch (error) {
                console.error('Failed to fetch adventure movies:', error);
            } finally {
                setLoading(false);
            }
        }
        loadAdventureMovies();
    }, [dispatch, cate]);
    // console.log(adventureMovies);
    if (loading) {
        return <LoadingComponent />
    }
    return (
        <div className="position-relative"> {/* Thêm position-relative để định vị nút */}
            {adventureMovies.items?.length > 0 ? (
                <>
                    <Swiper
                        // install Swiper modules
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={10}
                        slidesPerView={6}
                        navigation={{
                            prevEl: '.adventure-movie-prev',
                            nextEl: '.adventure-movie-next',
                        }}
                        grabCursor={true}
                        autoplay={{ delay: 4000 }}
                        // onSwiper={(swiper) => console.log(swiper)}
                        // onSlideChange={() => console.log('slide change')}
                        breakpoints={SWIPER_BREAKPOINTS}
                    >
                        {adventureMovies.items?.map((adventureMovie) => (
                            <SwiperSlide key={adventureMovie.id}>
                                <div className="card border-0 movie--width">
                                    <div className='img-container overflow-hidden position-relative'>
                                        <img src={adventureMovie.thumb_url || '/images/updating_image.png'} className="card-img hover-thumb" alt={adventureMovie.name} />
                                        <div className="play-button">
                                            <Link to={`/watch/${adventureMovie.slug}`}><FontAwesomeIcon icon={faPlayCircle} fontSize={60} color="white" /></Link>
                                        </div>
                                    </div>
                                    <div className='movie--name position-absolute'>
                                        <h6 className='text-center text-light'>{adventureMovie.name}</h6>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {/* Nút custom */}
                    <div className="adventure-movie-prev position-absolute top-50 translate-middle-y" style={{ zIndex: 10, cursor: 'pointer', left: '10px', backgroundColor: 'rgba(0, 0, 0, 0.6)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesomeIcon icon={faChevronLeft} size="lg" color="white" />
                    </div>
                    <div className="adventure-movie-next position-absolute top-50 translate-middle-y" style={{ zIndex: 10, cursor: 'pointer', right: '10px', backgroundColor: 'rgba(0, 0, 0, 0.6)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

export default AdventureMovie