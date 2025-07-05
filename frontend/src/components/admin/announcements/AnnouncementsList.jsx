import { useState, useEffect } from 'react';
import { 
  getAnnouncements, 
  deleteAnnouncement 
} from '../../../services/announcements';
import AnnouncementForm from './AnnouncementForm';
import { FaEdit, FaTrash, FaPlus, FaSpinner } from 'react-icons/fa';

export default function AnnouncementsList() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAnnouncements();
      setAnnouncements(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch announcements');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAnnouncement(deleteId);
      await fetchAnnouncements(); // Refresh the list
      setDeleteId(null);
    } catch (err) {
      setError(err.message || 'Failed to delete announcement');
      console.error('Delete error:', err);
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
    <div className="space-y-6 ml-25">
      {/* Header and Create Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Announcements</h2>
        <button
          onClick={() => {
            setEditingAnnouncement(null);
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <FaPlus /> Create New
        </button>
      </div>

      {/* Announcements Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Head */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {announcements.map((announcement) => (
              <tr key={announcement._id}>
                <td className="px-6 py-4 whitespace-nowrap">{announcement.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{announcement.course}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => {
                      setEditingAnnouncement(announcement);
                      setIsFormOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => setDeleteId(announcement._id)}
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

      {/* Announcement Form Modal */}
      {isFormOpen && (
        <AnnouncementForm
          announcement={editingAnnouncement}
          onClose={() => setIsFormOpen(false)}
          onSave={fetchAnnouncements}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this announcement?</p>
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