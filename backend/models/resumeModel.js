import mongoose from 'mongoose'

const ResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true,
    },
    thumbnailLink: {
      type: String,
      default: ""
    },
    template: {
      theme: { type: String, default: "modern" },
      colorPalette: { type: [String], default: [] }
    },
    profileInfo: {
      profilePreviewUrl: { type: String, default: "" },
      fullName: { type: String, default: "" },
      designation: { type: String, default: "" },
      summary: { type: String, default: "" },
    },
    contactInfo: {
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      location: { type: String, default: "" },
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      website: { type: String, default: "" },
    },
    skills: [
      {
        name: { type: String, default: "" },
        progress: { type: Number, default: 0 },
      },
    ],
    languages: [
      {
        name: { type: String, default: "" },
        progress: { type: Number, default: 0 },
      },
    ],
    interests: { type: [String], default: [] },
  },
  {
    timestamps: true
  }
)


export default mongoose.model("Resume", ResumeSchema)