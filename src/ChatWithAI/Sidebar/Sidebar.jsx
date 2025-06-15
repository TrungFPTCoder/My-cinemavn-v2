import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assest/AI-assets/assets.js';
import { Context } from '../context/Context.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faListAlt } from '@fortawesome/free-regular-svg-icons';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }
    return (
        <aside className={`sidebar window-tool-position text-light ${extended ? 'extended' : 'collapsed'}`} style={{ paddingTop: '90px' }}>
            <div className={`top  ${extended ? '' : 'centered'}`}>
                <div className=''>
                    <div className='d-flex justify-content-center align-items-center gap-2'>
                        <div>
                            <button className="menu" onClick={() => setExtended(prev => !prev)}>
                                <FontAwesomeIcon icon={faListAlt}></FontAwesomeIcon>
                            </button>
                        </div>
                        <div style={{ marginLeft: 'auto' }}>
                            <button onClick={() => newChat()} className="new-chat d-flex justify-content-center align-items-center">
                                <FontAwesomeIcon icon={faPlus} style={{ color: 'white', fontSize: '20px' }}></FontAwesomeIcon>
                            </button>
                        </div>
                    </div>
                </div>
                {extended ?
                    <div className="recent border-1 border-top">
                        <p className="recent-title">Đoạn chat gần đây</p>
                        {prevPrompts?.length !== 0 ? (
                            prevPrompts.map((item, index) =>
                            (
                                <div onClick={() => loadPrompt(item)} className="recent-entry mb-2">
                                    <div>
                                        <p className="recent-entry-p m-0">{item.slice(0, 25)}</p>
                                    </div>
                                </div>
                            )
                            ))
                            :
                            (
                                <div className='none-chat'>
                                    <img src={assets.message_icon} alt="" />
                                    <p>Không có đoạn chat nào gần đây</p>
                                </div>
                            )
                        }
                    </div>
                    : null
                }
            </div>
            {/* <div className={`bottom  ${extended ? '' : 'centered'}`}>
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="Question Icon" />
                    <p className={`fade ${extended ? 'block' : 'none'}`}>Help</p>
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="History Icon" />
                    <p className={`fade ${extended ? 'block' : 'none'}`}>Activity</p>
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="Settings Icon" />
                    <p className={`fade ${extended ? 'block' : 'none'}`}>Settings</p>
                </div>
            </div> */}
        </aside>
    );
}

export default Sidebar;
