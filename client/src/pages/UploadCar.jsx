import React, { useState } from "react";
import axios from "axios";
import { API, PRODUCT_FILES } from "../utils/ApiURI";
import toast from "react-hot-toast";

const UploadCar = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState({
    car_type: "",
    company: "",
    dealer: ""
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
  
    // Ensure tags are not empty
    if (!tags.car_type || !tags.company || !tags.dealer) {
      setError("Please fill all tag fields (car_type, company, dealer).");
      setLoading(false);
      return;
    }
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", JSON.stringify(tags)); 
  
    if (image) {
      formData.append("image", image);
    } else {
      setError("Please upload an image.");
      setLoading(false);
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        setError("You must be logged in to add a car.");
        setLoading(false);
        return;
      }
  
      const response = await axios.post(`${PRODUCT_FILES}/carImage`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("Car added successfully!");
      setLoading(false);
      setTitle("");
      setDescription("");
      setTags({ car_type: "", company: "", dealer: "" });
      setImage(null);
      
      toast.success("Car details added successfully")
      setTimeout(() => {
        window.location.reload();
    }, 1000);
    } catch (err) {
      setLoading(false);
      if (err.response) {
        setError(err.response.data.message || "Failed to add car.");
      } else {
        setError("An error occurred while adding the car.");
      }
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Add New Car</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">

        <div className="space-y-2">
          <label htmlFor="title" className="block font-semibold">
            Car Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block font-semibold">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md"
            rows="4"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block font-semibold">Tags</label>
          <div className="flex gap-4">
            <div className="w-1/3">
              <input
                type="text"
                value={tags.car_type}
                onChange={(e) =>
                  setTags({ ...tags, car_type: e.target.value })
                }
                placeholder="Car Type"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="w-1/3">
              <input
                type="text"
                value={tags.company}
                onChange={(e) =>
                  setTags({ ...tags, company: e.target.value })
                }
                placeholder="Company"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="w-1/3">
              <input
                type="text"
                value={tags.dealer}
                onChange={(e) =>
                  setTags({ ...tags, dealer: e.target.value })
                }
                placeholder="Dealer"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="image" className="block font-semibold">
            Car Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full p-2 bg-blue-600 text-white rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? "Uploading... This may take few seconds" : "Add Car"}
        </button>
      </form>
    </div>
  );
};

export default UploadCar;
