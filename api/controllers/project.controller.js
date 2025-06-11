import Project from "../models/project.model.js";
import paginate from "../helpers/paginate.js";
import { v4 as uuidv4 } from "uuid";

const controller = {
    /* [GET] api/v1/projects */
    index: async (req, res) => {
        try {
            const { page, limit } = req.query;
            const result = await paginate(Project, {}, page, limit);
            res.status(200).json(result);
        } catch(error) {
            res.status(500).json({ message: "Lỗi khi lấy danh sách dự án", error });
        }
    },
    /* [GET] api/v1/projects/:id */
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const project = await Project.findOne({ id });

            if(!project) {
                return res.status(404).json({ message: "Không tìm thấy dự án" });
            }

            res.status(200).json({
                data: project
            });
        } catch(error) {
            res.status(500).json({ message: "Lỗi khi lấy chi tiết dự án", error });
        }
    },

    /* [POST] api/v1/projects */
    create: async (req, res) => {
        try {
            const { name, technologies, duration, images, githubLink, projectLink, status } = req.body;

            const newProject = new Project({
                id: uuidv4(),
                name,
                technologies,
                duration,
                images,
                githubLink,
                projectLink,
                status
            });

            await newProject.save();

            res.status(201).json({ message: "Dự án đã được tạo!", project: newProject });
        } catch(error) {
            res.status(500).json({ message: "Lỗi khi tạo dự án", error });
        }
    },
    /* [PUT] api/v1/projects/:id */
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const updates = req.body;

            const updatedProject = await Project.findOneAndUpdate({ id }, updates, { new: true });

            if(!updatedProject) {
                return res.status(404).json({ message: "Không tìm thấy dự án" });
            }

            res.status(200).json({ message: "Dự án đã được cập nhật!", project: updatedProject });
        } catch(error) {
            res.status(500).json({ message: "Lỗi khi cập nhật dự án", error });
        }
    },
};

export default controller;
