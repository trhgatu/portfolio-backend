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
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy danh sách dự án", error });
        }
    },

    /* [POST] api/v1/projects */
    create: async (req, res) => {
        try {
            const { name, technologies, duration, images, githubLink, projectLink } = req.body;
            const newProject = new Project({
                id: uuidv4(),
                name,
                technologies,
                duration,
                images,
                githubLink,
                projectLink,
            });

            await newProject.save();

            res.status(201).json({ message: "Dự án đã được tạo!", project: newProject });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi tạo dự án", error });
        }
    },
};

export default controller;
