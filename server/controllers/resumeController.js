import Resume from "../models/Resume.js";

export const createResume = async (req, res) => {
  try {
    const resume = await Resume.create({ ...req.body, user: req.userId });
    res.status(201).json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getResumes = async (req, res) => {
  const resumes = await Resume.find({ user: req.userId }).sort({ updatedAt: -1 });
  res.json(resumes);
};

export const getResumeById = async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id, user: req.userId });
  if (!resume) return res.status(404).json({ message: "Resume not found" });
  res.json(resume);
};

export const updateResume = async (req, res) => {
  const resume = await Resume.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!resume) return res.status(404).json({ message: "Resume not found" });
  res.json(resume);
};

export const deleteResume = async (req, res) => {
  const resume = await Resume.findOneAndDelete({ _id: req.params.id, user: req.userId });
  if (!resume) return res.status(404).json({ message: "Resume not found" });
  res.json({ message: "Resume deleted" });
};
