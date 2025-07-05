import API from './api';

export const getAnnouncements = async () => {
  try {
    const response = await API.get('/announcements');
    return response.data;
  } catch (error) {
    console.error('Error fetching announcements:', error);
    throw error;
  }
};

export const createAnnouncement = async (announcementData) => {
  try {
    const response = await API.post('/announcements', announcementData);
    return response.data;
  } catch (error) {
    console.error('Error creating announcement:', error);
    throw error;
  }
};

export const updateAnnouncement = async (id, announcementData) => {
  try {
    const response = await API.put(`/announcements/${id}`, announcementData);
    return response.data;
  } catch (error) {
    console.error('Error updating announcement:', error);
    throw error;
  }
};

export const deleteAnnouncement = async (id) => {
  try {
    const response = await API.delete(`/announcements/${id}`, {
      data: { role: "admin" }
    });
    return response.data;
  } catch (error) {
    console.error('Delete error details:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw error;
  }
};