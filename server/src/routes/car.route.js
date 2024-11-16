import { Router } from "express";
import { createCar, deleteCar, fetchPerticularCar, fetchUserProducts, getAllCars, updateCar, uploadAdditionalImages } from "../controller/product.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Car } from "../models/car.model.js";

const router = Router();

router.route("/carImage").post(upload.fields([{
        name:'image',
        maxCount:10
    }
]), verifyJWT, createCar);

router.route("/:carId/image").post(
    upload.fields([ { name: 'images', maxCount: 10 } ]), 
    verifyJWT, 
    uploadAdditionalImages 
);

router.route("/cars").get(verifyJWT, fetchUserProducts);
router.route("/cars/:id").get(verifyJWT, fetchPerticularCar);
router.route("/car/:carId").put(
    upload.fields([{ name: "image", maxCount: 10 }]), 
    verifyJWT, 
    updateCar 
);
router.route("/delete/:carId").delete(verifyJWT, deleteCar);

router.route("/search").get(verifyJWT, getAllCars)


export default router;