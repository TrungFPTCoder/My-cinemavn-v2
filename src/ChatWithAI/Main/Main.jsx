import React, { useContext, useEffect, useRef, useState } from 'react';
import './Main.css';
import { Context } from "../context/Context.jsx";
import { assets } from '../../assest/AI-assets/assets.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faBars, faCalendarWeek, faFighterJet, faFilm, faPaperPlane, faStop } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { faKissWinkHeart } from '@fortawesome/free-regular-svg-icons';

const Main = () => {
    const { onSent, onStop, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
    const resultRef = useRef(null);
    const [rows, setRows] = useState(1);
    const user = useSelector((state) => state.auth.login.currentUser);


    useEffect(() => {
        const updateRows = () => {
            if (window.innerWidth <= 600) {
                setRows(2);
            } else {
                setRows(1);
            }
        };

        updateRows();
        window.addEventListener('resize', updateRows);
        return () => window.removeEventListener('resize', updateRows);
    }, []);

    useEffect(() => {
        if (resultRef.current) {
            resultRef.current.scrollTop = resultRef.current.scrollHeight;
        }
    }, [resultData]);
    console.log(resultData);

    return (
        <main className="main bg-dark text-light m-0">
            <div className="main-container">
                {!showResult
                    ? <>
                        <div className="greet">
                            <p><span>Xin chào, {user.username}</span></p>
                            <p>Tôi có thể giúp gì cho bạn hôm nay?</p>
                        </div>
                        <div className="cards" style={{ paddingBottom: '90px' }}>
                            <div className="card"
                                onClick={() => setInput("Gợi ý những bộ phim hot năm 2025")}>
                                <p>Gợi ý những bộ phim hot năm 2025</p>
                                {/* <img src={assets.compass_icon} alt="" /> */}
                                <FontAwesomeIcon icon={faFilm} className='mt-auto ms-auto' style={{ fontSize: '24px' }} />
                            </div>
                            <div className="card"
                                onClick={() => setInput("Phim hành động hay nhất trong năm nay")}>
                                <p>Phim hành động hay nhất trong năm nay</p>
                                {/* <img src={assets.bulb_icon} alt="" /> */}
                                <FontAwesomeIcon icon={faFighterJet} className='mt-auto ms-auto' style={{ fontSize: '24px' }} />
                            </div>
                            <div className="card"
                                onClick={() => setInput("Cuối tuần này nên xem phim gì")}>
                                <p>Cuối tuần này nên xem phim gì</p>
                                {/* <img src={assets.message_icon} alt="" /> */}
                                <FontAwesomeIcon icon={faCalendarWeek} className='mt-auto ms-auto' style={{ fontSize: '24px' }} />
                            </div>
                            <div className="card" onClick={() => setInput("Phim tình cảm hàn quốc mới nhất")}>
                                <p>Phim tình cảm hàn quốc mới nhất</p>
                                {/* <img src={assets.code_icon} alt="" /> */}
                                <FontAwesomeIcon icon={faKissWinkHeart} className='mt-auto ms-auto' style={{ fontSize: '24px' }} />
                            </div>
                        </div>
                    </>
                    :
                    <div className='result' ref={resultRef}>
                        <div className="result-title">
                            <img src={user.userImage} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img className="result-data-icon" src={assets.gemini_icon} alt="" />
                            {loading ?
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                :
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }
                        </div>
                    </div>
                }
                <div className="main-bottom rounded-top-4">
                    <div className="search-box p-2">
                        <textarea rows={rows} onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    onSent();
                                }
                            }}
                            value={input}
                            type="text"
                            placeholder="Hỏi tôi điều gì đó..."
                        />
                        <div className="icon-container1">
                            {/* <button><img src={assets.gallery_icon} alt=""/></button> */}
                            {/* <button><img src={assets.mic_icon} alt=""/></button> */}
                            {/* <button type="submit" onClick={() => onSent()}><img src={assets.send_icon} alt=""/></button> */}
                            {/* {!loading ?
                                (<button className='asking-btn' type="submit" onClick={() => onSent()} disabled={input === ""}>
                                    <FontAwesomeIcon icon={faArrowUp} />
                                </button>) :
                                (resultData !== "" && (<button className='stop-btn' type="button" onClick={() => onStop()}>
                                    <FontAwesomeIcon icon={faStop} />
                                </button>))
                            } */}
                            {loading && resultData === "" ? (
                                <button
                                    className='stop-btn'
                                    type="button"
                                    onClick={() => onStop()}
                                >
                                    <FontAwesomeIcon icon={faStop} />
                                </button>
                            ) : (
                                <button
                                    className='asking-btn'
                                    type="submit"
                                    onClick={() => onSent()}
                                    disabled={input.trim() === ""}
                                >
                                    <FontAwesomeIcon icon={faArrowUp} />
                                </button>
                            )}
                            {/* <button className='asking-btn' type="submit" onClick={() => onSent()} disabled={input === ""}>
                                <FontAwesomeIcon icon={faArrowUp} />
                            </button>
                            <button className='stop-btn' type="button" onClick={() => onStop()} disabled={!loading}>
                                <FontAwesomeIcon icon={faStop} />
                            </button> */}
                        </div>
                    </div>
                    <p className="bottom-info">
                        MyAI có thể gặp sai sót trong quá trình giải đáp. Mong bạn thông cảm!
                        {/* <a href="#">Your privacy and Gemini Apps</a> */}
                    </p>
                </div>
            </div>
        </main>
    );
}

export default Main;
