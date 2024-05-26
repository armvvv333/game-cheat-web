const Cheat = require('../models/Cheat');

exports.getCheats = async (req, res) => {
  try {
    const cheats = await Cheat.find({ categoryId: req.params.categoryId });
    res.json(cheats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCheat = async (req, res) => {
  const cheat = new Cheat({
    name: req.body.name,
    description: req.body.description,
    categoryId: req.body.categoryId
  });

  try {
    const newCheat = await cheat.save();
    res.status(201).json(newCheat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateCheat = async (req, res) => {
  try {
    const updatedCheat = await Cheat.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCheat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCheat = async (req, res) => {
  try {
    await Cheat.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cheat deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
