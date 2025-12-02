import mongoose from "mongoose";

const apiKeySchema = new mongoose.Schema(
  {
    keyHash: {
      type: String,
      required: [true, "Key hash is required"],
    },
    keyIdentifier: {
      type: String,
      required: true,
      unique: true, // fast lookup for key
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      default: "Unnamed Key",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// TTL index: expiresAt ke baad doc auto delete hoga
apiKeySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const ApiKey = mongoose.model("ApiKey", apiKeySchema);
export default ApiKey;
