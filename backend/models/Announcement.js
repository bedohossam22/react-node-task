import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  createdBy: {
    type: String, 
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Announcement', announcementSchema);