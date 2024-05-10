import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/actions';
import axios from 'axios';
import { FestivalPending } from '../../redux/actions/actions';

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState('');

    const user = useSelector((state) => state.auth.isAuthenticated);
    const user2 = useSelector((state) => state.userData);


    const dispatch = useDispatch();
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 56) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
    
        const fetchNotification = async () => {
            if (user2 && user2.userData.type === 'admin') {
                try {
                    const response = await axios.get('http://localhost:8080/festivals/festival-request');
                    setNotificationCount(response.data);
                } catch (error) {
                    console.error('Error fetching pending notifications:', error);
                }
            }
        };
    
        window.addEventListener('scroll', handleScroll);
        fetchNotification();
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [dispatch]);
    

    // const notifications = useSelector(state => state.festivalPendingReducer);
    // console.log(notifications);


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={`bg-gray-100 ${isScrolled ? 'shadow-lg' : ''} fixed top-0 w-full z-10`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="text-2xl lg:text-4xl font-extrabold text-gray-800">Uplix</Link>
                    <div className="flex lg:hidden">
                        <button onClick={toggleMenu} className="text-gray-600 focus:outline-none hover:text-gray-900">
                            <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M18 18H6v-2h12v2zm0-5H6v-2h12v2zm0-7H6V4h12v2z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:items-center">
      <p className="mx-3 text-gray-600 hover:text-gray-900">{user2.userData.name}</p>
      <Link to="/pendingFestivals" className="mx-3 text-gray-600 hover:text-gray-900">Settings{user2.userData.type}</Link>
      {user ? (
        <>
          {user2.userData.type === 'admin' && (
            <Link to="/pendingFestivals" className="mx-3 text-gray-600 hover:text-gray-900">
             <i class="fa-solid fa-bell"></i>
              {notificationCount.length > 0 && <span className="text-red-500">+{notificationCount.length}</span>}
            </Link>
          )}
          <button onClick= {() =>dispatch(logout())} className="mx-3 px-4 text-sm py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-green-600">Logout</button>
        </>
      ) : (
        <Link to="/"><button className="mx-3 px-4 text-sm py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-green-600">SIGN UP</button></Link>
      )}
    </div>
                </div>
            </div>
            <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <Link to="/user" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" onClick={toggleMenu}>Users</Link>
                    <Link to="/occasion" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" onClick={toggleMenu}>Occassion</Link>
                    <Link to="/settings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" onClick={toggleMenu}>Settings</Link>             
                    <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" onClick={toggleMenu}>Login</Link>
                    <button className="block w-full px-4 py-2 bg-blue-500 text-white rounded-md mt-2 hover:bg-blue-600 focus:outline-none focus:bg-green-600" onClick={toggleMenu}>SIGN UP</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;