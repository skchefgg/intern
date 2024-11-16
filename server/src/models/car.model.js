import mongoose  from "mongoose";
import { Schema } from "mongoose";
const carSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      images: [{
        type: String, 
      }],
      tags: {
        car_type: String,
        company: String,
        dealer: String
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
},{timestamps: true})

export const Car = mongoose.model("Car", carSchema)