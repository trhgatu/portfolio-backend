import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import slugify from "slugify";

const projectSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    description: {
      type: String
    },
    name: {
      type: String,
    },
    status: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
    },
    technologies: {
      type: [{ name: String, icon: String }],
      default: [],
    },
    duration: {
      type: String,
    },
    images: {
      type: [String],
      default: [],
    },
    githubLink: {
      type: String,
    },
    projectLink: {
      type: String,
    },
  },
  { timestamps: true }
);

projectSchema.pre("save", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Project = mongoose.model("Project", projectSchema, "projects");

export default Project;
