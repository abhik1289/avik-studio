import mongoose, { Schema, model, models } from "mongoose";

export interface IBudget {
  name: string;
  amount: number;
  spend: number;
  slug: string;
  startDate: Date;
  endDate: Date;
  userId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
}

const budgetSchema = new Schema<IBudget>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    spend: {
      type: Number,
      default: 0,
      min: 0,
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


// Compound Index
budgetSchema.index({
  userId: 1,
  categoryId: 1,
});


// Virtual Field
budgetSchema.virtual("remaining").get(function () {
  return this.amount - this.spend;
});


// Prevent model overwrite issue
const Budget =
  models.Budget || model<IBudget>("Budget", budgetSchema);

export default Budget;