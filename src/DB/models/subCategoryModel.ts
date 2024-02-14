import mongoose, { Document, Model, Schema } from "mongoose";
import { ICategory } from "./categoryModel";

interface ISubCategory extends Document {
  name: string;
  slug: string;
  categoryID: Schema.Types.ObjectId | ICategory["_id"]; // Тип для ссылки на категорию
  img?: string | null;
}

const subCategorySchema = new Schema<ISubCategory>(
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
    categoryID: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    img: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const SubCategoryModel: Model<ISubCategory> =
  mongoose.models.SubCategory ||
  mongoose.model<ISubCategory>("SubCategory", subCategorySchema);

export { SubCategoryModel };
export type { ISubCategory };
