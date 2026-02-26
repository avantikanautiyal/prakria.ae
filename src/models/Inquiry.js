import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please provide a full name.'],
  },
  company: {
    type: String,
    required: [true, 'Please provide a company/organization name.'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address.'],
  },
  subject: {
    type: String,
    required: [true, 'Please provide a subject.'],
  },
  message: {
    type: String,
    required: [true, 'Please provide a message.'],
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'replied'],
    default: 'unread'
  }
}, {
  timestamps: true,
});

export default mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
