import React from "react";
import { useProducts } from "../context/ProductContext";
import UpdateCar from "./UpdateCar";
import DeleteCar from "./DeleteCar";

const ManageCarsPage = () => {
  const { products } = useProducts();
  console.log("products",products)

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="font-bold text-3xl text-gray-900 mb-6">Manage Your Cars</h1>

      {products.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          <p>No cars available to manage</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((car) => (
            <div key={car._id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{car.title}</h3>
              <div className="w-full flex flex-col items-center gap-4">
                <UpdateCar carId={car._id} />
                <DeleteCar carId={car._id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageCarsPage;
