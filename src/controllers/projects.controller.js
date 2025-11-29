const { projects } = require("../models/projects.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.getProjects = catchAsync((req, res) => {
  return res.status(200).json({
    status: "success",
    results: projects.length,
    data: projects,
  });
});

exports.createProject = catchAsync((req, res) => {
  const { name, description } = req.body;

  if (!name) {
    throw new AppError("Project Name Required!", 400);
  }

  const newProject = {
    id: projects.length + 1,
    name,
    description: description || "",
    createdAt: new Date(),
  };

  projects.push(newProject);

  return res.status(201).json({
    status: "success",
    data: newProject,
  });
});

exports.updateProject = catchAsync((req, res) => {
  const id = Number(req.params.id);
  const project = projects.find((p) => p.id === id);

  if (!project) {
    throw new AppError("Project not Found!", 404);
  }

  const { name, description } = req.body || {};

  if (!name && !description) {
    throw new AppError("Nothing to Update!", 400);
  }

  if (name) project.name = name;
  if (description) project.description = description;

  return res.status(200).json({
    status: "success",
    data: project,
  });
});

exports.deleteProject = catchAsync((req, res) => {
  const id = Number(req.params.id);
  const index = projects.findIndex((p) => p.id === id);

  if (index === -1) {
    throw new AppError("Project Not Found!", 404);
  }

  projects.splice(index, 1);

  return res.status(204).send();
});
