const express = require('express');
const router = express.Router();
const Diagram = require('../models/Diagram');
const auth = require('../middleware/auth');

// CREATE: Only logged-in users can save, always attach user ID from JWT
router.post('/', auth, async (req, res) => {
  const { title, code } = req.body;
  const diagram = new Diagram({ title, code, user: req.user.id });
  await diagram.save();
  res.json(diagram);
});

// READ ALL: Only return diagrams saved by the current user
router.get('/', auth, async (req, res) => {
  const diagrams = await Diagram.find({ user: req.user.id });
  res.json(diagrams);
});

// READ ONE: Only allow access to a user's own diagram
router.get('/:id', auth, async (req, res) => {
  const diagram = await Diagram.findOne({ _id: req.params.id, user: req.user.id });
  if (!diagram) return res.status(404).json({ message: 'Diagram not found' });
  res.json(diagram);
});

// UPDATE: Only allow updating a user's own diagram
router.put('/:id', auth, async (req, res) => {
  const { title, code } = req.body;
  const diagram = await Diagram.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { title, code },
    { new: true }
  );
  if (!diagram) return res.status(404).json({ message: 'Diagram not found or no permission' });
  res.json(diagram);
});

// DELETE: Only allow deleting a user's own diagram
router.delete('/:id', auth, async (req, res) => {
  const diagram = await Diagram.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!diagram) return res.status(404).json({ message: 'Diagram not found or no permission' });
  res.json({ message: 'Deleted' });
});

module.exports = router;
