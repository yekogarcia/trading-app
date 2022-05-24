import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PrivateRouters = ({ children }) => {
  
  const users = useSelector(state => state.auth);
    
  return users.logged
  ? children
  : <Navigate to="/" />

}
