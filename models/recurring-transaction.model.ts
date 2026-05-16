import mongoose, {
  Schema,
  model,
  models,
} from "mongoose";

export interface IRecurringTransaction {
  name: string;

  frequency:
    | "DAILY"
    | "WEEKLY"
    | "MONTHLY"
    | "YEARLY";

  amount: number;

  isActive: boolean;

  nextRunDate: Date;

  lastRunDate?: Date;

  categoryId: mongoose.Types.ObjectId;

  userId: mongoose.Types.ObjectId;

  transactionId?: mongoose.Types.ObjectId;
}

const recurringTransactionSchema =
  new Schema<IRecurringTransaction>(
    {
      name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
      },

      frequency: {
        type: String,
        enum: [
          "DAILY",
          "WEEKLY",
          "MONTHLY",
          "YEARLY",
        ],
        required: true,
      },

      amount: {
        type: Number,
        required: true,
        min: 0,
      },

      isActive: {
        type: Boolean,
        default: true,
      },

      nextRunDate: {
        type: Date,
        required: true,
      },

      lastRunDate: {
        type: Date,
      },

      categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
        index: true,
      },

      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      transactionId: {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );


// Compound Index
recurringTransactionSchema.index({
  userId: 1,
  frequency: 1,
});


// Prevent overwrite issue
const RecurringTransaction =
  models.RecurringTransaction ||
  model<IRecurringTransaction>(
    "RecurringTransaction",
    recurringTransactionSchema
  );

export default RecurringTransaction;