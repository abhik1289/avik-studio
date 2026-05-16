import  {
  Schema,
  Document,
  Model,
  model,
  models,
  Types,
} from "mongoose";

export interface ITransition extends Document {
  amount: number;
  title: string;
  type: "credit" | "debit";
  date: Date;
  isHighPriority: boolean;
  description?: string;
  recurringTransactionId?: Types.ObjectId;
  categoryId: Types.ObjectId;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TransitionSchema: Schema<ITransition> = new Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },

    type: {
      type: String,
      enum: ["credit", "debit"],
      required: true,
    },

    date: {
      type: Date,
      required: true,
      default: Date.now,
    },

    isHighPriority: {
      type: Boolean,
      default: false,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    recurringTransactionId: {
      type: Schema.Types.ObjectId,
      ref: "RecurringTransaction",
      default: null,
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
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

TransitionSchema.index({ userId: 1 });
TransitionSchema.index({ categoryId: 1 });
TransitionSchema.index({ date: -1 });
TransitionSchema.index({ type: 1 });


const Transition: Model<ITransition> =
  models.Transition || model<ITransition>("Transition", TransitionSchema);

export default Transition;