import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { roles } = useSelector((store) => store.auth);
  if (roles[0] !== 'Administrator') {
    return <Navigate to='/landing' />;
  }
  return children;
};
export default ProtectedRoute;
