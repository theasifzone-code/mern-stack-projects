import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    // website user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true
    },
    //  developer user
    apiKey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ApiKey",
      index: true
    },
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      minlength: [3, "Task title must be at least 3 characters long"],
      maxlength: [100, "Task title cannot exceed 100 characters"],
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

// validation: must belong to either user or apiKey
taskSchema.pre("validate", function (next) {
  if (!this.user && !this.apiKey) {
    this.invalidate("user", "Task must belong to either a User or an ApiKey");
    this.invalidate("apiKey", "Task must belong to either a User or an ApiKey");
  }
  next();
})

// compund indexs
// Ensure user cannot create duplicate task titles
taskSchema.index({ user: 1, title: 1 }, {
  unique: true,
  partialFilterExpression: { user: { $exists: true } }
})
// Ensure apiKey cannot create duplicate task titles
taskSchema.index({ apiKey: 1, title: 1 }, {
  unique: true,
  partialFilterExpression: { apiKey: { $exists: true } }
})


const Task = mongoose.model("Task", taskSchema);
export default Task;
