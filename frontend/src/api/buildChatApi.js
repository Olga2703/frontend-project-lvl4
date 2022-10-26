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

  return {
    sendMessage,
    addNewChannel,
    removeChannel,
    renameChannel,
  };
};

export default buildChatApi;
