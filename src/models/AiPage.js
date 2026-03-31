import mongoose from 'mongoose';

const AiPageSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      default: 'ai',
      unique: true,
      trim: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },

    // SEO Fields
    metaTitle: String,
    metaDescription: String,
    metaKeywords: String,

    thumbnailImage: String,
    thumbnailAlt: String,

    heroSection: {
      title: String,
      description: String,
      buttonText: String,
      buttonLink: String,
      videoSrc: String,
      videoPoster: String,
    },

    workSection: {
      title: String,
      description: String,
      buttonText: String,
      buttonLink: String,
      list: [
        {
          src: String,
          alt: String,
          link: String,
          mediaType: { type: String, enum: ['image', 'video', 'gif'], default: 'image' },
          poster: String,
        },
      ],
      conclusionLine: String,
    },

    whySection: {
      title: String,
      description: String,
      list: [
        {
          src: String,
          title: String,
          description: String,
        },
      ],
      conclusionLine: String,
    },

    coreServicesSection: {
      title: String,
      description: String,
      conclusionLine: String,
    },

    benefitsSection: {
      title: String,
      description: String,
      list: [
        {
          src: String,
          title: String,
        },
      ],
      conclusionLine: String,
    },

    faqSection: {
      title: String,
      description: String,
      list: [
        {
          question: String,
          answer: String,
        },
      ],
      conclusionLine: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.AiPage || mongoose.model('AiPage', AiPageSchema);
