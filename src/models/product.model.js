import { Schema, model } from "mongoose";

//Ejemplo de Esquema
const productSchema = new Schema(
    {
        name: String,
        description: String,
        price: Number,
        stock: Number,
        image: String,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model("Product", productSchema);