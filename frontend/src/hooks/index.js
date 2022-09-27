import { useContext } from 'react';

import { AuthContext, ApiContext } from '../context/index.js';

export const useAuth = () => useContext(AuthContext);
export const useSocket = () => useContext(ApiContext);
