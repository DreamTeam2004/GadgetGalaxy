import { Document, Schema, Types } from "mongoose";
import { ISubCategory } from "./subCategoryModel";

interface ICategory extends Document {
  name: string;
  slug: string;
  order: number;
  img: string | null;
  subcategories: Types.ObjectId[] | ISubCategory[];
}

export const categorySchema = new Schema<ICategory>(
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
        type: Schema.Types.ObjectId,
        ref: "SubCategory",
      },
    ],
  },
  { timestamps: true }
);

export type { ICategory };
