import React from 'react';
import { FaBars } from 'react-icons/fa';

const Navbar = ({ toggleSidebar }) => {
    return (
        <header className="bg-gray-100 shadow-md fixed w-full top-0 z-10 flex items-center justify-between p-4">
            <button
                className="text-gray-800 sm:hidden"
                onClick={toggleSidebar}
            >
                <FaBars size={24} />
            </button>
            <div className="flex-grow text-center">
                <h1 className="text-xl font-semibold text-gray-700">
                    Welcome! Hope you’re having a great day!
                </h1>
            </div>
        </header>
    );
};

export default Navbar;
