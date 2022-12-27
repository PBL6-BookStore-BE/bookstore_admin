import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { roles } = useSelector((store) => store.auth);
  if(roles==null){
    return <Navigate to='/landing' />;
  }
  if (!roles.includes("Administrator")) {
    console.log('kh co admin');
    return <Navigate to='/landing' />;
  }
  return children;
};
export default ProtectedRoute;
