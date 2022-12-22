import { IoBarChartSharp, IoHome, IoBook, IoPeople, IoCompass, IoPeopleSharp, IoPersonSharp } from 'react-icons/io5';
import { GrUnorderedList } from "react-icons/gr";

const links = [
    {id:1, text: 'Dashboard', path: '/', icon: <IoBarChartSharp />},
    {id:2, text: 'Book', path: '/book', icon: <IoBook />},
    {id:3, text: 'Author', path: '/author', icon: <IoPeople />},
    {id:4, text: 'Category', path: '/category', icon: <GrUnorderedList />},
    {id:5, text: 'Publisher', path: '/publisher', icon: <IoHome />},
    {id:6, text: 'Customers', path: '/customer', icon: <IoPeopleSharp />},
    {id:7, text: 'Orders', path: '/order', icon: <IoCompass />},
    {id:8, text: 'Our Staff', path: '/staff', icon: <IoPersonSharp />}
];

export default links;