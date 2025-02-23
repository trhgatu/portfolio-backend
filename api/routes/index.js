import projectRoutes from "./project.route.js";

const clientRouter = (app) => {
    const version = "/api";
    app.use(version + "/projects", projectRoutes);
};

export default clientRouter;
