import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

function QuizForm({ quiz, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    course: '',
    dueDate: '',
    questions: []
  });

  useEffect(() => {
    if (quiz) {
      setFormData({
        title: quiz.title,
        course: quiz.course,
        dueDate: quiz.dueDate.split('T')[0],
        questions: quiz.questions
      });
    }
  }, [quiz]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index][field] = value;
    setFormData(prev => ({ ...prev, questions: updatedQuestions }));
  };

  const handleAddQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        { questionText: '', options: ['', '', ''], correctAnswer: '' }
      ]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-lg font-medium">
            {quiz ? 'Edit Quiz' : 'Create New Quiz'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Questions</label>
              <button
                type="button"
                onClick={handleAddQuestion}
                className="text-sm bg-blue-500 text-white px-3 py-1 rounded"
              >
                Add Question
              </button>
            </div>

            {formData.questions.map((question, qIndex) => (
              <div key={qIndex} className="mb-6 p-4 border rounded-lg">
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Question {qIndex + 1}</label>
                  <input
                    type="text"
                    value={question.questionText}
                    onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="space-y-2 mb-3">
                  <label className="block text-sm font-medium text-gray-700">Options</label>
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center">
                      <input
                        type="radio"
                        name={`correctAnswer-${qIndex}`}
                        checked={question.correctAnswer === option}
                        onChange={() => handleQuestionChange(qIndex, 'correctAnswer', option)}
                        className="mr-2"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...question.options];
                          newOptions[oIndex] = e.target.value;
                          handleQuestionChange(qIndex, 'options', newOptions);
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {quiz ? 'Update Quiz' : 'Create Quiz'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QuizForm;