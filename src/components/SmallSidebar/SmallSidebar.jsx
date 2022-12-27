import Wrapper from '../../assets/wrappers/SmallSidebar';
import { FaTimes } from 'react-icons/fa';
import BookLogo from '../common/BookLogo'
import { useSelector, useDispatch } from 'react-redux';
import NavLinks from '../NavLinks/NavLinks';
import { toggleSidebar } from '../../store/cases/getAll/slice';

const SmallSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.getAll);
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleSidebar());
  };
  return (
    <Wrapper>
        <div
            className={
            isSidebarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'
            }
        >
            <div className='content'>
            <button className='close-btn' onClick={toggle}>
                <FaTimes />
            </button>
            <header>
                <BookLogo />
            </header>
            <NavLinks toggleSidebar={toggle} />
            </div>
        </div>
    </Wrapper>
  );
};
export default SmallSidebar;
