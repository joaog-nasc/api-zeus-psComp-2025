const Projects = require("../models/Projects");

class ProjectController {
  async create(req, res) {
    const { title, description, status } = req.body;

    const newProject = await Projects.create({
      title,
      description,
      status,
      owner_id: req.userId,
    });

    if (!newProject) {
      return res.status(400).json({ message: "Created Project Failed!" });
    }

    return res.status(200).json({ data: { title, description, status } });
  }
}

module.exports = new ProjectController();
