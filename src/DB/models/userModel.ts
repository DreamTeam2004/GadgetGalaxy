import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  uid: string;
  email: string;
  name: string;
  photo?: string | null;
  provider: string;
}

const userSchema = new Schema<IUser>(
  {
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    photo: { type: String, default: null },
    provider: { type: String },
  },
  { timestamps: true }
);

// Создаем индекс для поля email
userSchema.index({ email: 1 }, { unique: true });

const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export { UserModel };
export type { IUser };
