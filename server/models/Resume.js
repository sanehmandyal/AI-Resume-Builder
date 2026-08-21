import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    company: String,
    role: String,
    location: String,
    startDate: String,
    endDate: String,
    current: { type: Boolean, default: false },
    description: String,
  },
  { _id: false }
);

const educationSchema = new mongoose.Schema(
  {
    school: String,
    degree: String,
    fieldOfStudy: String,
    startDate: String,
    endDate: String,
    grade: String,
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: String,
    link: String,
    techStack: String,
    description: String,
  },
  { _id: false }
);

const resumeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, default: "Untitled Resume" },
    personalInfo: {
      fullName: String,
      email: String,
      phone: String,
      location: String,
      jobTitle: String,
      summary: String,
      linkedin: String,
      github: String,
      website: String,
    },
    experience: [experienceSchema],
    education: [educationSchema],
    projects: [projectSchema],
    skills: [String],
    template: { type: String, default: "classic-green" },
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
