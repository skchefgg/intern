import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API, PRODUCT_FILES } from "../utils/ApiURI"; 
import toast from "react-hot-toast";

const ProductCar = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductDetail = async () => {
      setLoading(true);
      setError(""); 
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("You must be logged in to view product details.")
          setError("You must be logged in to view product details.");
          setLoading(false);
          return;
        }

        
        const response = await axios.get(`${PRODUCT_FILES}/cars/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

       
        if (response.data && response.data.data) {
          setProduct(response.data.data); 
          console.log(response.data.data);
        } else {
          setError("Product details not found.");
        }

        setLoading(false);
      } catch (err) {
        setLoading(false);
       
        console.error("Error fetching product details:", err);
        setError("Error fetching product details.");
      }
    };

    fetchProductDetail();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
  {product.images && product.images.length > 0 ? (
    product.images.map((image, index) => (
      <img
        key={index}
        src={image}
        alt={`product-image-${index}`}
        className="w-full h-32 object-cover rounded-md" 
        style={{ aspectRatio: "1" }} 
      />
    ))
  ) : (
    <img
      src="default-image.jpg"
      alt="default"
      className="w-full h-32 object-cover rounded-md"
      style={{ aspectRatio: "1" }} 
    />
  )}
</div>


      {/* Description */}
      <p className="text-gray-600 mt-4">{product.description}</p>

      {/* Tags */}
      <div className="mt-4">
  <h3 className="font-semibold text-lg">Tags:</h3>
  <div className="flex flex-wrap gap-2 mt-2">
    {product.tags && Object.entries(product.tags).map(([key, value]) => (
      <span
        key={key}
        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium"
      >
        {`${key}: ${value}`}
      </span>
    ))}
  </div>
</div>

    </div>
  );
};

export default ProductCar;
