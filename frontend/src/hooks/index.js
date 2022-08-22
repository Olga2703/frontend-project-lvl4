import { useContext } from 'react';

import { AuthContext } from '../context/index.js';

// export  const useAuth = () => useContext(AuthContext);
const useAuth = () => useContext(AuthContext);

export default useAuth;
