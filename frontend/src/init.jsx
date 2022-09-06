import React from 'react';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import store from './slices/index.js';
import { io } from 'socket.io-client';
import buildChatApi from './api/buildChatApi.js';
import { actions as messagesActions } from './slices/messagesSlice.js';
import { ApiContext } from './context/index.js';

const init = () => {
  const socket = io();
  const chatApi = buildChatApi(socket);

  socket.on('newMessage', (response) => {
    store.dispatch(messagesActions.addMessage(response));
  });
  return (
    <Provider store={store}>
      <ApiContext.Provider value={chatApi}>
        <App />
      </ApiContext.Provider>
    </Provider>
  );
};

export default init;
