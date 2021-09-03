import mongoose from "mongoose";
const { Schema, model } = mongoose;

const cartSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
    quantity: {type: Number, required: true},
    products: [
      {
        product_id: {
          type: Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        name: { type: String, required: true },
        brand: { type: String, required: true },
        price: { type: Number, required: true },
        imageUrl: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default model("cart", cartSchema);
