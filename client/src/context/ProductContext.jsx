// ProductContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { PRODUCT_FILES } from "../utils/ApiURI";

// Create a Context for products
const ProductContext = createContext();

// Provide context values to the component tree
export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [token, setToken] = useState(localStorage.getItem("token")); // Store the token

    // Function to fetch products
    const fetchProducts = async () => {
        setLoading(true);
        setError("");
        try {
            if (!token) {
                setProducts([]); // Clear products if no token
                setLoading(false);
                return;
            }

            const response = await axios.get(`${PRODUCT_FILES}/cars`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Set the fetched products
            setProducts(response.data.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError("Error fetching products.");
        }
    };

    // Re-fetch products whenever the token changes
    useEffect(() => {
        fetchProducts();
    }, [token]); // Depend on token

    return (
        <ProductContext.Provider value={{ products, loading, error, token, setToken }}>
            {children}
        </ProductContext.Provider>
    );
};

// Custom hook to use product context
export const useProducts = () => {
    return useContext(ProductContext);
};
