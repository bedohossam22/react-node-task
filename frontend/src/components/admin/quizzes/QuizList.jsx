import React, { useState, useEffect } from 'react';
import { 
  getQuizzes, 
  deleteQuiz,
  createQuiz,
  updateQuiz
} from '../../../services/quizzes';
import { FaSpinner, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import QuizForm from './QuizForm'; // You'll need to create this component

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getQuizzes();
      setQuizzes(data);
    } catch (err) {
      setError(err.message || 'Failed to load quizzes');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteQuiz(deleteId);
      await fetchQuizzes();
      setDeleteId(null);
    } catch (err) {
      setError(err.message || 'Failed to delete quiz');
    }
  };

  const handleFormSubmit = async (quizData) => {
    try {
      if (editingQuiz) {
        await updateQuiz(editingQuiz._id, quizData);
      } else {
        await createQuiz(quizData);
      }
      setIsFormOpen(false);
      setEditingQuiz(null);
      await fetchQuizzes();
    } catch (err) {
      setError(err.message || 'Failed to save quiz');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quizzes</h2>
        <button
          onClick={() => {
            setEditingQuiz(null);
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <FaPlus /> Add New Quiz
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Questions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {quizzes.map((quiz) => (
              <tr key={quiz._id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{quiz.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{quiz.course}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(quiz.dueDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {quiz.questions.length} questions
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => {
                      setEditingQuiz(quiz);
                      setIsFormOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => setDeleteId(quiz._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quiz Form Modal */}
      {isFormOpen && (
        <QuizForm
          quiz={editingQuiz}
          onClose={() => {
            setIsFormOpen(false);
            setEditingQuiz(null);
          }}
          onSubmit={handleFormSubmit}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this quiz?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 border border-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizList;