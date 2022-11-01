import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import App from './components/App.jsx';
import store from './slices/index.js';
import buildChatApi from './api/buildChatApi.js';
import { actions as messagesActions } from './slices/messagesSlice.js';
import { actions as channelActions } from './slices/channelsSlice.js';
import { ApiContext } from './context/index.js';

const init = () => {
  const socket = io();
  const chatApi = buildChatApi(socket);

  socket.on('newMessage', (response) => {
    store.dispatch(messagesActions.addMessage(response));
  });

  socket.on('newChannel', (response) => {
    store.dispatch(channelActions.addChannel(response));
    store.dispatch(channelActions.setCurrentChannelId(response.id));
  });

  socket.on('removeChannel', (response) => {
    store.dispatch(channelActions.removeChannel(response.id));
  });

  socket.on('renameChannel', ({ id, name }) => {
    store.dispatch(channelActions.updateChannel({ id, changes: { name } }));
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
