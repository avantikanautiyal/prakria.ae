import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({

  position: {
    type: String,
  },
  message: {
    type: String,
    required: [true, 'Please provide a message.'],
  },
  image: {
    type: String,
  },
  video: {
    type: String,
  },
  rating: {
    type: Number,
    default: 5,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
