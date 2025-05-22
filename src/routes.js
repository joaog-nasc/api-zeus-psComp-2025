const { Router } = require("express");
const { upload } = require("./config/multer");
const schemaValidator = require("./apps/middlewares/schemaValidator");

const AuthenticationMiddleware = require("./apps/middlewares/authentication");

const AuthenticationController = require("./apps/controllers/AuthenticationController");
const authSchema = require("./schema/auth.schema.json");

const UserController = require("./apps/controllers/UserController");
const userSchema = require("./schema/create.user.schema.json");

const FileController = require("./apps/controllers/FileController");

const ProjectController = require("./apps/controllers/ProjectController");
const projectSchema = require("./schema/project.schema.json");

const routes = new Router();

routes.get("/health", (req, res) => {
  return res.send({ message: "Connected with success!" });
});

routes.post(
  "/auth",
  schemaValidator(authSchema),
  AuthenticationController.authenticate
);
routes.post("/user", schemaValidator(userSchema), UserController.create);

routes.use(AuthenticationMiddleware);

routes.put("/user", UserController.update);
routes.delete("/user", UserController.delete);
routes.get("/user-profile", UserController.userProfile);

routes.post("/upload", upload.single("image"), FileController.upload);

routes.post(
  "/project",
  schemaValidator(projectSchema),
  ProjectController.create
);
routes.delete("/project/:id", ProjectController.delete);
routes.put("/project/:id", ProjectController.update);
routes.get("/list-my-projects", ProjectController.listMyProjects);

module.exports = routes;
