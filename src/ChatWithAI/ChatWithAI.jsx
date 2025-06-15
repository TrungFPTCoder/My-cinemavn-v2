import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import Main from './Main/Main'
function ChatWithAI() {
  return (
    <div className='bg-dark text-light'>
      <div className='d-flex'>
          <Sidebar />
        {/* <Sidebar1/> */}
        <Main />
      </div>
    </div>
  )
}

export default ChatWithAI