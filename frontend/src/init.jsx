import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { Provider as ProviderRollbar, ErrorBoundary } from '@rollbar/react';
import ru from './locales/ru.js';
import App from './components/App.jsx';
import store from './slices/index.js';
import buildChatApi from './api/buildChatApi.js';
import { actions as messagesActions } from './slices/messagesSlice.js';
import { actions as channelActions } from './slices/channelsSlice.js';
import { ApiContext } from './context/index.js';

const init = () => {
  const rollbarConfig = {
    accessToken: process.env.TOKEN,
    payload: 'production',
  };

  const i18nextInstance = i18n.createInstance();
  i18nextInstance.use(initReactI18next).init({
    lng: 'ru',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      ru,
    },
  });

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
    <ProviderRollbar config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <ApiContext.Provider value={chatApi}>
            <I18nextProvider i18n={i18nextInstance}>
              <App />
            </I18nextProvider>
          </ApiContext.Provider>
        </Provider>
      </ErrorBoundary>
    </ProviderRollbar>
  );
};

export default init;
