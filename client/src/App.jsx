import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import UploadCar from './pages/UploadCar';
import ViewCars from './pages/ViewCars';
import ManageCars from './pages/ManageCars';
import ProtectedRoute from './Protect';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProductCar from './pages/ProductCar';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/signin" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* protected routes */}
                    <Route path="/" element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }>
                        <Route index  element={
                            <ProtectedRoute>
                                <ViewCars />
                            </ProtectedRoute>
                        } />
                        <Route path="/upload" element={
                            <ProtectedRoute>
                                <UploadCar />
                            </ProtectedRoute>
                        } />
                        <Route index path="/view" element={
                            <ProtectedRoute>
                                <ViewCars />
                            </ProtectedRoute>
                        } />
                        <Route path="/manage" element={
                            <ProtectedRoute>
                                <ManageCars />
                            </ProtectedRoute>
                        } />
                        <Route path="/product/:productId" element={
                            <ProtectedRoute>
                                <ProductCar />
                            </ProtectedRoute>
                        } />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
