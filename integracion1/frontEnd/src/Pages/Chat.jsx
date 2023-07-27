import React from 'react'

export const Chat = () => (
  <div className='min-h-screen flex flex-col mx-10 gap-3'>
    <h2 className='text-start'> Chat de cliente</h2>
    <q>Powered by Socket.io</q>
    <hr />

    <div className="">
      <input type="text" name="chatbox" id="chatbox" />
    </div>

    <div className="">
      <ul id="messageLogs"></ul>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="/socket.io/socket.io.js"></script>
    {/* <script src="/static/js/chat.js"></script> */}
  </div>
)
