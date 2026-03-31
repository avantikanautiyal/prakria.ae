import mongoose from 'mongoose';

const HomePageSectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for the homepage section.'],
      trim: true,
    },
    ctaText: {
      type: String,
      default: 'View all',
      trim: true,
    },
    ctaHoverText: {
      type: String,
      default: 'View all',
      trim: true,
    },
    ctaLink: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    items: [
      {
        title: { type: String, trim: true },
        description: { type: String, trim: true },
        mediaType: {
          type: String,
          enum: ['image', 'video', 'gif'],
          default: 'image',
        },
        src: { type: String, trim: true },
        alt: { type: String, trim: true },
        link: { type: String, trim: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.HomePageSection ||
  mongoose.model('HomePageSection', HomePageSectionSchema);
