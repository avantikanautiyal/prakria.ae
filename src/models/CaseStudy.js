import mongoose from 'mongoose';

const CaseStudySchema = new mongoose.Schema({
  // Internal tracking
  name: {
    type: String,
    required: [true, 'Please provide a name for the case study.'],
  },
  slug: {
    type: String,
    required: [true, 'Please provide a slug.'],
    unique: true,
  },

  // SEO Fields
  metaTitle: String,
  metaDescription: String,
  metaKeywords: String,

  // 1. Hero Section
  herosection: {
    title: String,
    conclusionLine: String,
    list: [{
      src: String,
      alt: String,
      type: { type: String, default: 'image' } // image, video, gif
    }]
  },

  // 2. Story Section
  storySection: {
    title: String,
    paragraphs: [String],
    conclusionLine: String
  },

  // 3. Challenge Section
  challenge: {
    title: String,
    description: String,
    list: [{ text: String }],
    conclusionLine: String
  },

  // 4. Strategy Section (using user's key "startageySection")
  startageySection: {
    title: String,
    description: String,
    list: [{
      number: String,
      title: String,
      description: String
    }],
    conclusionLine: String
  },

  // 5. Execution Section
  executionSection: {
    title: String,
    description: String,
    list: [{
      src: String,
      alt: String,
      title: String,
      description: String
    }],
    conclusionLine: String
  },

  // 6. Result Section
  resultSection: {
    title: String,
    description: String,
    list: [{ text: String }],
    conclusionLine: String
  },

  // 7. Why Section
  whySection: {
    title: String,
    description: String,
    list: [{
      src: String,
      alt: String,
      text: String
    }],
    conclusionLine: String
  }

}, {
  timestamps: true,
});

export default mongoose.models.CaseStudy || mongoose.model('CaseStudy', CaseStudySchema);
