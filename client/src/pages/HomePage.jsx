// src/pages/HomePage.js
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const HomePage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex-grow sm:ml-64">
                <Navbar toggleSidebar={toggleSidebar} />
                <main className="pt-20 px-4 sm:px-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default HomePage;