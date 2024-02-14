import mongoose, { Document, Model, Schema, Types } from "mongoose";
import { ISubCategory } from "./subCategoryModel";

interface ICategory extends Document {
  name: string;
  slug: string;
  order: number;
  img: string | null;
  subcategories: Types.ObjectId[] | ISubCategory[];
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    order: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      default: null,
    },
    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
      },
    ],
  },
  { timestamps: true }
);

const CategoryModel: Model<ICategory> =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", categorySchema);

export { CategoryModel };
export type { ICategory };
