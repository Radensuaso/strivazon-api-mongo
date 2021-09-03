import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    reviews: [
      {
        user: { type: Schema.Types.ObjectId, ref: "user", required: true },
        comment: { type: String, required: true },
        rate: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

productSchema.static("findProduct", async function (query) {
  const total = await this.countDocuments(query.criteria);
  const blogPosts = await this.find(query.criteria, query.options.fields)
    .sort(query.options.sort)
    .limit(query.options.limit)
    .skip(query.options.skip)
    .populate("author");

  return { total, blogPosts };
});

export default model("product", productSchema);
