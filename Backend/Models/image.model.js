import mongoose from "mongoose";

const imageSchema = mongoose.Schema({

  //---------------Schema for generated image-----------------------------------
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  }
});
//-----------------------------------------------------------------------------
// Compound index for efficient queries
imageSchema.index({ userId: 1, createdAt: -1 });
imageSchema.index({ userId: 1, isFavorite: 1 });

const Image = mongoose.model('Image', imageSchema);
export default Image;