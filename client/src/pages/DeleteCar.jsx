import { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast'
import { PRODUCT_FILES } from "../utils/ApiURI";

const DeleteCar = ({ carId }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            await axios.delete(`${PRODUCT_FILES}/delete/${carId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            

            setTimeout(() => {
                window.location.reload();
            }, 1000);
            toast.success("Car deleted successfully!");

            setLoading(false);
        } catch (err) {
            setLoading(false);
            const errorMessage = err.response?.data?.message || "An error occurred while deleting the car.";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="space-y-4">
            <button
                onClick={handleDelete}
                disabled={loading}
                className={`w-full py-3 px-6 font-semibold rounded-md text-white transition-all focus:outline-none ${
                    loading
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500"
                }`}
            >
                {loading ? (
                    <span className="flex items-center justify-center">
                        <svg
                            className="animate-spin h-5 w-5 mr-3 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" />
                            <path
                                d="M12 2a10 10 0 0110 10h-4a6 6 0 10-12 0H2a10 10 0 0110-10z"
                                fill="currentColor"
                            />
                        </svg>
                        Deleting...
                    </span>
                ) : (
                    "Delete Car"
                )}
            </button>
        </div>
    );
};

export default DeleteCar;
