import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as channelActions } from '../slices/channelsSlice.js';

const buildChatApi = (socket) => {
  const sendMessage = (newMessage) => {
    socket.emit('newMessage', newMessage, (response) => {
      console.log(response);
      if (response.status !== 'ok') {
        throw new Error('Network error: message delivery failed');
      }
    });
  };

  const addNewChannel = (newChannel) => {
    socket.emit('newChannel', newChannel, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Network error: channel adding failed');
      }
    });
  };

  const removeChannel = (channel) => {
    socket.emit('removeChannel', channel, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Network error: channel removing failed');
      }
    });
  };
  const renameChannel = (channel) => {
    socket.emit('renameChannel', channel, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Network error: channel renaming failed');
      }
    });
  };

  const getNewMessage = (dispatch) => (
    socket.on('newMessage', (response) => dispatch(messagesActions.addMessage(response))));

  const getNewChannel = (dispatch) => (
    socket.on('newChannel', (response) => {
      dispatch(channelActions.addChannel(response));
      dispatch(channelActions.setCurrentChannelId(response));
    }));

  const getRemoveChannel = (dispatch) => (
    socket.on('removeChannel', (response) => (
      dispatch(channelActions.removeChannel(response.id)))));

  const getRenameChannel = (dispatch) => (
    socket.on('renameChannel', ({ id, name }) => (
      dispatch(channelActions.updateChannel({ id, changes: { name } })))));

  return {
    sendMessage,
    addNewChannel,
    removeChannel,
    renameChannel,
    getNewMessage,
    getNewChannel,
    getRemoveChannel,
    getRenameChannel,
  };
};

export default buildChatApi;
