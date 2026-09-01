import api from './api.js';

export const fetchStories = async () => {
  try {
    const response = await api.get('/stories');
    return response.data.listStory;
  } catch (error) {
    console.error('Error fetching stories:', error);
    throw error.response ? error.response.data : error;
  }
};

export const addStory = async (formData) => {
  try {
    const response = await api.post('/stories', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding story:', error);
    throw error.response ? error.response.data : error;
  }
};
