import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addUserName } from '../store/cases/auth/slice';

const ProtectedRoute = ({ children }) => {
  const { user, roles } = useSelector((store) => store.auth);
  if (roles[0] !== 'Administrator' && user !== 'superadmin') {
    return <Navigate to='/landing' />;
  }
  return children;
};
export default ProtectedRoute;
