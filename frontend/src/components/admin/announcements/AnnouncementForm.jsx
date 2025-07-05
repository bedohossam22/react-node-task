import { useState, useEffect } from 'react';
import { createAnnouncement, updateAnnouncement } from '../../../services/announcements';
import { FaTimes } from 'react-icons/fa';

export default function AnnouncementForm({ announcement, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    course: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (announcement) {
      setFormData({
        title: announcement.title,
        content: announcement.content,
        course: announcement.course
      });
    }
  }, [announcement]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  setIsSubmitting(true);

  try {
    const payload = {
      ...formData,
      role: "admin" 
    };

    if (announcement?._id) {
      await updateAnnouncement(announcement._id, payload);
    } else {
      await createAnnouncement(payload);
    }
    onSave();
    onClose();
  } catch (err) {
    setError(err.message || 'Failed to save announcement');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-lg font-medium">
            {announcement?._id ? 'Edit Announcement' : 'Create Announcement'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 text-sm">
            {error}
          </div>
        )}

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
  {/* Title Input */}
  <div>
    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
      Title
    </label>
    <input
      type="text"
      id="title"
      name="title"
      value={formData.title}
      onChange={handleChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>

  {/* Course Input */}
  <div>
    <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
      Course
    </label>
    <input
      type="text"
      id="course"
      name="course"
      value={formData.course}
      onChange={handleChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>

  {/* Content Textarea */}
  <div>
    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
      Content
    </label>
    <textarea
      id="content"
      name="content"
      value={formData.content}
      onChange={handleChange}
      rows={4}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>

  {/* Submit Button */}
  <div className="flex justify-end pt-4">
    <button
      type="submit"
      disabled={isSubmitting}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
    >
      {isSubmitting ? 'Saving...' : 'Save Announcement'}
    </button>
  </div>
</form>
      </div>
    </div>
  );
}