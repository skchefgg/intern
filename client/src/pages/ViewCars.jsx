import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

const ViewCars = () => {
    const { products, loading } = useProducts();  
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        const filtered = products.filter((car) => {
            const { title, description, tags } = car;
            const term = searchTerm.toLowerCase();

            return (
                title.toLowerCase().includes(term) ||
                description.toLowerCase().includes(term) ||
                (tags.car_type && tags.car_type.toLowerCase().includes(term)) ||
                (tags.company && tags.company.toLowerCase().includes(term)) ||
                (tags.dealer && tags.dealer.toLowerCase().includes(term))
            );
        });
        setFilteredProducts(filtered);
    }, [products, searchTerm]);  

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Your Cars</h1>
            <input
                type="text"
                placeholder="Search cars by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-6 p-2 border border-gray-300 rounded w-full"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.length === 0 ? (
                    <p>No cars available</p>
                ) : (
                    filteredProducts.map((car) => (
                        <div key={car._id} className="border rounded-lg p-4 shadow-md">
                            <img
                                src={car.images[0] || "default-image.jpg"} 
                                alt={car.title}
                                className="w-full h-48 object-cover rounded-md"
                            />
                            <h3 className="mt-4 text-lg font-semibold">{car.title}</h3>
                            <p className="text-sm text-gray-600">
                                {car.description.slice(0, 100)}...
                            </p>
                            <Link
                                to={`/product/${car._id}`} 
                                className="text-blue-600 hover:text-blue-500 mt-2 inline-block"
                            >
                                View Details
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ViewCars;
