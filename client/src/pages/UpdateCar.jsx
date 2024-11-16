import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API, PRODUCT_FILES } from "../utils/ApiURI"; // Adjust API import based on your project structure
import toast from "react-hot-toast";

const UpdateCar = ({ carId }) => {
    const navigate = useNavigate();

    const [car, setCar] = useState({
        title: "",
        description: "",
        tags: { car_type: "", company: "", dealer: "" },
        images: [],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [imageFile, setImageFile] = useState(null);

    // Fetch car details on load
    useEffect(() => {
        const fetchCar = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${PRODUCT_FILES}/cars/${carId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCar(response.data.data);
            } catch (err) {
                setError("Failed to fetch car details.");
            }
        };
        fetchCar();
    }, [carId]);
    console.log(carId)

    // Handle image file change
    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("title", car.title);
        formData.append("description", car.description);
        formData.append("car_type", car.tags.car_type);
        formData.append("company", car.tags.company);
        formData.append("dealer", car.tags.dealer);

        // Handle image upload separately
        if (imageFile) {
            const imageFormData = new FormData();
            imageFormData.append("images", imageFile);

            try {
                // Upload image first
                const token = localStorage.getItem("token");
                await axios.post(`${PRODUCT_FILES}/${carId}/image`, imageFormData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });

            } catch (err) {
                if(err.response && err.response.status === 400){
                    toast.error("Cannot upload more than 10 images per car");
                }
                setLoading(false);
                setError("Failed to upload image.");
                return;
            }
        }

        
        try {
            const carFormData = new FormData();
            carFormData.append("title", car.title);
            carFormData.append("description", car.description);
        
            // Iterate over each tag and append it to the FormData
            for (const [key, value] of Object.entries(car.tags)) {
                carFormData.append(`tags[${key}]`, value);
            }
        
            const token = localStorage.getItem("token");
            await axios.put(`${PRODUCT_FILES}/car/${carId}`, carFormData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            setLoading(false);
            navigate(`/product/${carId}`);
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || "Failed to update car.");
        }
        
    };

    return (
        <div className="container mx-auto p-6">
            {error && <div className="bg-red-100 text-red-800 p-2 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={car.title}
                        onChange={(e) => setCar({ ...car, title: e.target.value })}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-gray-700">Description</label>
                    <textarea
                        id="description"
                        value={car.description}
                        onChange={(e) => setCar({ ...car, description: e.target.value })}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="tags" className="block text-gray-700">Tags</label>
                    <div className="space-y-2">
                        <input
                            type="text"
                            placeholder="Car Type"
                            value={car.tags.car_type}
                            onChange={(e) => setCar({ ...car, tags: { ...car.tags, car_type: e.target.value } })}
                            className="w-full p-2 border rounded-md"
                        />
                        <input
                            type="text"
                            placeholder="Company"
                            value={car.tags.company}
                            onChange={(e) => setCar({ ...car, tags: { ...car.tags, company: e.target.value } })}
                            className="w-full p-2 border rounded-md"
                        />
                        <input
                            type="text"
                            placeholder="Dealer"
                            value={car.tags.dealer}
                            onChange={(e) => setCar({ ...car, tags: { ...car.tags, dealer: e.target.value } })}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="images" className="block text-gray-700">Upload Image</label>
                    <input
                        type="file"
                        id="images"
                        onChange={handleImageChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-md"
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update Car"}
                </button>
            </form>
        </div>
    );
};

export default UpdateCar;
