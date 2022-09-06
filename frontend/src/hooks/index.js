import { useContext } from 'react';

import { AuthContext } from '../context/index.js';

import { ApiContext } from '../context/index.js';

export const useAuth = () => useContext(AuthContext);
export const useSocket = () => useContext(ApiContext);
