import Announcement from '../models/Announcement.js';

// Create announcement (Admin only)
export const createAnnouncement = async (req, res) => {
  try {
    const { title, content, course } = req.body;
    const newAnnouncement = new Announcement({
      title,
      content,
      course,
      createdBy: req.body.role
    });
    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all announcements
export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update announcement (Admin only)
export const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      id, 
      req.body, 
      { new: true }
    );
    res.json(updatedAnnouncement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete announcement (Admin only)
export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    await Announcement.findByIdAndDelete(id);
    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};