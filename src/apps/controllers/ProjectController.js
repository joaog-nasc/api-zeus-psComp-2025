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

  async delete(req, res) {
    const { id } = req.params;

    const verifyProject = await Projects.findOne({
      where: {
        id: id,
      },
    });

    if (!verifyProject) {
      return res.status(404).json({ message: "Project does not exists!" });
    }

    if (verifyProject.owner_id != req.userId) {
      return res.status(401).json({
        message: "You dont't have persmission to delete this project!",
      });
    }

    const deletedProject = await Projects.destroy({
      where: {
        id,
      },
    });

    if (!deletedProject) {
      return res
        .status(400)
        .json({ message: "Failed to delete this project!" });
    }

    return res.status(200).json({ message: "Project deleted!" });
  }

  async update(req, res) {
    const { id } = req.params;

    const verifyProject = await Projects.findOne({
      where: {
        id,
      },
    });

    if (!verifyProject) {
      return res.status(404).json({ message: "Project does not exists!" });
    }

    if (verifyProject.owner_id != req.userId) {
      return res.status(401).json({
        message: "You dont't have persmission to delete this project!",
      });
    }

    const projectUpdate = await Projects.update(req.body, { where: { id } });

    if (!projectUpdate) {
      return res
        .status(400)
        .json({ message: "Failed to update this project!" });
    }

    return res.status(200).json({ message: "Project updated!" });
  }

  async listMyProjects(req, res) {
    const allProjects = await Projects.findAll({
      where: {
        owner_id: req.userId,
      },
    });

    if (!allProjects) {
      return res.status(400).json({ message: "Failed to list all projects" });
    }

    const formattedData = [];
    for (const item of allProjects) {
      formattedData.push({
        id: item.id,
        title: item.title,
        description: item.description,
        status: item.status,
      });
    }
    return res.status(200).json({ data: formattedData });
  }
}

module.exports = new ProjectController();
