import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this blog.'],
    maxlength: [100, 'Title cannot be more than 60 characters'],
  },
  content: {
    type: String,
    required: [true, 'Please provide content for this blog.'],
  },
  author: {
    type: String,
    required: [true, 'Please provide an author name.'],
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  },
  slug: {
    type: String,
    required: [true, 'Please provide a slug.'],
    unique: true,
  },
  video: {
    type: String,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
