import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for the service.'],
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
    description: String,
    buttonText: { type: String, default: 'Enquire Now' },
    buttonLink: String,
    conclusionLine: String
  },

  // 2. Our Work (Portfolio Grid)
  workSection: {
    title: String,
    description: String,
    buttonText: String,
    buttonLink: String,
    list: [{
      url: String,
      mediaType: { type: String, enum: ['image', 'video', 'gif'], default: 'image' },
      alt: String,
      slug: String,
      title: String,
      description: String
    }],
    conclusionLine: String
  },

  // 3. Why Choose Section (4 Card Grid)
  whyChooseSection: {
    title: String,
    description: String,
    list: [{
      icon: String, // URL to icon
      title: String,
      description: String
    }],
    conclusionLine: String
  },

  // 4. Core Services Section (Tabs)
  coreServicesSection: {
    title: String,
    list: [{
      icon: String,
      tabTitle: String,
      contentTitle: String,
      description: String,
      focusList: [String],
      bottomBox: String
    }],
    conclusionLine: String
  },

  // 5. How We Work Section (Numbered Steps)
  howWeWorkSection: {
    title: String,
    description: String,
    list: [{
      number: String, // e.g. "01"
      title: String,
      description: String
    }],
    conclusionLine: String
  },

  // 6. Benefits Section (Icon Grid + Mission)
  benefitsSection: {
    title: String,
    description: String,
    list: [{
      icon: String,
      title: String
    }],
    missionBox: String,
    conclusionLine: String
  },

  // 7. FAQ Section
  faqSection: {
    title: String,
    description: String,
    list: [{
      question: String,
      answer: String
    }],
    conclusionLine: String
  }

}, {
  timestamps: true,
});

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
