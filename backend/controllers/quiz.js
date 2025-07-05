import Quiz from '../models/Quiz.js';

// Create quiz (Admin only)
export const createQuiz = async (req, res) => {
  try {
    const { title, questions, dueDate, course } = req.body;
    const newQuiz = new Quiz({
      title,
      questions,
      dueDate,
      course,
      createdBy: req.body.role // From auth middleware
    });
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Get all quizzes
export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedQuiz = await Quiz.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedQuiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    await Quiz.findByIdAndDelete(id);
    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};