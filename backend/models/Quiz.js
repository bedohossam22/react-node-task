import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  questions: [{
    questionText: String,
    options: [String],
    correctAnswer: String
  }],
  dueDate: {
    type: Date,
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

export default mongoose.model('Quiz', quizSchema);