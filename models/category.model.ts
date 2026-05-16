import {
  Schema,
  model,
  models,
  Model,
  Document,
  Types,
} from "mongoose";

export interface ICategory extends Document {
  name: string;
  icon: string;
  color: string;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema<ICategory> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    icon: {
      type: String,
      required: true,
      trim: true,
    },

    color: {
      type: String,
      required: true,
      trim: true,
      default: "blue",
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


CategorySchema.index({ userId: 1 });

CategorySchema.index({
  userId: 1,
  name: 1,
});


CategorySchema.index(
  {
    userId: 1,
    name: 1,
  },
  {
    unique: true,
  }
);

const Category: Model<ICategory> =
  models.Category || model<ICategory>("Category", CategorySchema);

export default Category;