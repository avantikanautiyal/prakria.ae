import mongoose from 'mongoose';

const SubServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for the sub-service.'],
  },
  slug: {
    type: String,
    required: [true, 'Please provide a slug.'],
    unique: true,
  },
  category: String,

  // SEO Fields
  metaTitle: String,
  metaDescription: String,
  metaKeywords: String,

  // 1. Hero Section
  herosection: {
    title: String,
    description: String,
    buttonText: { type: String, default: 'Start a Project' },
    icon: String // URL to icon
  },

  // 2. Intro Section (Professional...)
  introSection: {
    title: String,
    description: String
  },

  // 3. Services Section (Our Video Podcast Production Services)
  servicesSection: {
    title: String,
    subtitle: String,
    list: [{
      title: String
    }]
  },

  // 4. Why Choose Section (Why Corporate Brands Choose...)
  whyChooseSection: {
    title: String,
    description: String,
    list: [{
      number: String,
      title: String,
      description: String
    }]
  },

  // 5. Expertise Section (End-to-End Podcast Production Expertise)
  expertiseSection: {
    title: String,
    description: String,
    list: [{
      title: String
    }]
  },

  // 6. Platforms Section (Platforms We Optimize For)
  platformsSection: {
    title: String,
    description: String,
    list: [{
      icon: String, // URL to icon
      title: String
    }]
  },

  // 7. Differentiators Section (What Makes PRAKRIA One of the Best...)
  differentiatorsSection: {
    title: String,
    description: String,
    list: [{
      title: String
    }]
  },

  // 8. Use Cases Section (Use Cases for Corporate Video Podcasts)
  useCasesSection: {
    title: String,
    description: String,
    list: [{
      icon: String, // URL to icon
      title: String
    }]
  },

  // 9. Related Services Section
  relatedServicesSection: {
    title: String,
    list: [{
      icon: String,
      title: String,
      description: String,
      buttonText: { type: String, default: 'Read more' },
      buttonLink: String
    }]
  }
}, {
  timestamps: true,
});

export default mongoose.models.SubService || mongoose.model('SubService', SubServiceSchema);
