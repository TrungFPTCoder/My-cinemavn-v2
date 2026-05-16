import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewMovies } from "../service/MovieService";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import '../assest/MovieList.css';
import { Helmet } from "react-helmet-async";
import LoadingComponent from "./LoadingComponent";
import { fetchMovieDetails } from '../service/MovieService';
import { setMovieDetails } from './Slice/MovieDetailSlice';
import { setNewMovies } from "./Slice/NewMovieSlice";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ChinaMovie from "./MovieCountry/ChinaMovie";
import KoreanMovie from "./MovieCountry/KoreanMovie";
import EuropeMovie from "./MovieCountry/EuropeMovie";
import AdventureMovie from "./MovieCategory/AdventureMovie";
import HorrifiedMovie from "./MovieCategory/HorrifiedMovie";
import ActionMovie from "./MovieCategory/ActionMovie";
import ComedyMovie from "./MovieCategory/ComedyMovie";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import VietNamMovie from "./MovieCountry/VietNamMovie";
import NewMovieSlide from "./NewMovieSlide";

function MovieList() {
  const newMovies = useSelector((state) => state.newMovies);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const movieDetails = useSelector((state) => state.movieDetails);
  const [slug, setSlug] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const moviesData = await fetchNewMovies();
        dispatch(setNewMovies(moviesData));
        setLoading(false);
      } catch (error) {
        console.error("Failed to load movies:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [dispatch]);

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        if (slug) {
          const moviesDetailData = await fetchMovieDetails(slug);
          dispatch(setMovieDetails(moviesDetailData));
        }
      } catch (error) {
        console.error("Failed to load movie details:", error);
      }
    };
    loadMovieDetails();
  }, [dispatch, slug]);

  useEffect(() => {
    if (newMovies.items && newMovies.items.length > 0) {
      setSlug(newMovies.items[0].slug); // Set initial slug to the first movie's slug
    }
  }, [newMovies]);
  // test======================================================================
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // tablet
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1024)
  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth < 1024)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  /////////////////////////////////////////////////////////////////////////////  
  const handleSlideChange = (swiper) => {
    const currentSlideIndex = swiper.activeIndex;
    const currentMovie = newMovies.items?.[currentSlideIndex];
    if (currentMovie) {
      setSlug(currentMovie.slug);
    }
  };

  const convertTime = (time) => {
    if (!time) return '';
    const minutes = parseInt(time);
    if (isNaN(minutes)) return '';
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  // if (!newMovies.items) {
  //   return <LoadingComponent />
  // }
  

  if (loading) {
    return <LoadingComponent />
  }

  return (
    <div className={isMobile ? "container-fluid bg-dark text-light pb-5 px-0" : "container-fluid bg-dark text-light pb-5"}>
      <Helmet>
        <title>Trang chủ</title>
        <meta name="description" content="Trang chủ" />
      </Helmet>

      {/* swiper thử nghiệm */}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        onSlideChange={handleSlideChange}
        grabCursor={true}
      >
        {newMovies.items?.map((newMovie) => (
          <SwiperSlide key={newMovie.slug}>
            <div className='img-container position-relative swiper--img mobile--header'>
                <img src={newMovie.poster_url ? newMovie.poster_url : '/images/updating_image.png'} className="w-100 object-fit-cover " alt={newMovie.name} />
                <div className="position-absolute mobile--view " style={{ top: '40%', left: '20px' }}>
                  <div className="text-warp">
                    <p className="text-primary intro-container h1 rounded p-2" style={{ width: 'fit-content' }}>{movieDetails?.name}</p>
                  </div>
                  <div className='d-flex mt-3'>
                    <div className='border border-light border-1 mx-1 p-1 px-2 rounded intro-container'>
                      {movieDetails.category?.[3]?.list?.[0]?.name || 'Đang cập nhật'}
                    </div>
                    <div className='border border-light border-1 mx-1 p-1 px-2 rounded intro-container'>
                      {movieDetails.category?.[1]?.list?.[0]?.name || 'Đang cập nhật'}
                    </div>
                    <div className='border border-light border-1 mx-1 p-1 px-2 rounded intro-container'>
                      {movieDetails?.current_episode || 'Đang cập nhật'}
                    </div>
                    <div className='border border-light border-1 mx-1 p-1 px-2 rounded intro-container'>
                      {convertTime(movieDetails?.time) || 'Đang cập nhật'}
                    </div>
                  </div>
                  <div className='d-flex mt-2'>
                    {movieDetails.category?.[2]?.list?.map((item) => (
                      <div className='category--movie mx-1 p-1 px-2 rounded' key={item.id}>
                        {item.name}
                      </div>
                    ))}
                  </div>
                  <div className={isTablet ? "d-none" : "d-block"}>
                    <div className="mt-2 des-movie">
                      <p className='text-light intro-container rounded p-1'>{movieDetails?.description}</p>
                    </div>
                  </div>
                </div>
              <div className="play-button">
                <Link to={`/watch/${newMovie.slug}`}><FontAwesomeIcon icon={faPlayCircle} fontSize={60} color="white" /></Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="card p-3 list--movie mt-3">
        {/* done */}
        <NewMovieSlide />

        {/* phim trung quốc */}
        {/* done */}
        <div className="d-flex align-items-center mb-3 mt-3">
          <h4 className="cate--movie--text">Phim Trung Quốc:</h4>
          <Link to={'/danh-sach/quoc-gia/trung-quoc'} className="text-decoration-none">
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
        <ChinaMovie country="trung-quoc" />
        {/* phim hàn quốc */}
        <div className="d-flex align-items-center mb-3 mt-3">
          <h4 className="cate--movie--text">Phim Hàn Quốc:</h4>
          <Link to={'/danh-sach/quoc-gia/han-quoc'} className="text-decoration-none">
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
        <KoreanMovie country="han-quoc" />
        {/* Phim âu mỹ */}
        <div className="d-flex align-items-center mb-3 mt-3">
          <h4 className="cate--movie--text">Phim Âu Mỹ:</h4>
          <Link to={'/danh-sach/quoc-gia/au-my'} className="text-decoration-none">
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
        <EuropeMovie country="au-my" />
        <div className="d-flex align-items-center mb-3 mt-3">
          <h4 className="cate--movie--text">Phim Việt Nam:</h4>
          <Link to={'/danh-sach/quoc-gia/viet-nam'} className="text-decoration-none">
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
        <VietNamMovie country="viet-nam" />
        {/* Phim phiêu lưu */}
        <div className="d-flex align-items-center mb-3 mt-3">
          <h4 className="cate--movie--text">&#x2694;Đắm mình vào thế giới phiêu lưu kì ảo:&#x1FA84;</h4>
          <Link to={'/danh-sach/phieu-luu'} className="text-decoration-none">
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
        <AdventureMovie cate="phieu-luu" />
        <div className="d-flex align-items-center mb-3 mt-3">
          <h4 className="cate--movie--text">&#x1F383;Rùng mình với màn đêm cất giấu những bí ẩn kinh hoàng!&#x1F47B;&#x1F578;</h4>
          <Link to={'/danh-sach/kinh-di'} className="text-decoration-none">
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
        <HorrifiedMovie cate="kinh-di" />
        <div className="d-flex align-items-center mb-3 mt-3">
          <h4 className="cate--movie--text">&#x1F4A5;Hành động đỉnh cao, bùng nổ mọi cảm xúc!&#x2694;&#x1F525;:</h4>
          <Link to={'/danh-sach/hanh-dong'} className="text-decoration-none">
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
        <ActionMovie cate="hanh-dong" />
        <div className="d-flex align-items-center mb-3 mt-3">
          <h4 className="cate--movie--text">&#x1F602;Cuối tuần, cười sảng khoái, quên hết muộn phiền!&#x1F923;:</h4>
          <Link to={'/danh-sach/phim-hai'} className="text-decoration-none">
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
        <ComedyMovie cate="phim-hai" />
      </div>
    </div>
  );
}

export default MovieList;