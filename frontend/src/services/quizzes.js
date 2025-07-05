import API from './api';

export const getQuizzes = async () => {
  try {
    const response = await API.get('/quizzes');
    return response.data;
  } catch (error) {
    console.error('Error fetching quizzes:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw error;
  }
};

export const getQuiz = async (id) => {
  try {
    const response = await API.get(`/quizzes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching quiz ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

export const createQuiz = async (quizData) => {
  try {
    const response = await API.post('/quizzes', {
      ...quizData,
      role: "admin" 
    });
    return response.data;
  } catch (error) {
    console.error('Error creating quiz:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw error;
  }
};

export const updateQuiz = async (id, quizData) => {
  try {
    const response = await API.put(`/quizzes/${id}`, {
      ...quizData,
      role: "admin" 
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating quiz ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

export const deleteQuiz = async (id) => {
  try {
    const response = await API.delete(`/quizzes/${id}`, {
      data: { role: "admin" } 
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting quiz ${id}:`, {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw error;
  }
};