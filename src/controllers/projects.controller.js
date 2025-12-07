const Project = require("../models/projects.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.getProjects = catchAsync(async (req, res) => {
  const projects = await Project.find({ userId: req.user.id });

  return res.status(200).json({
    status: "success",
    data: projects,
  });
});

exports.createProject = catchAsync(async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    throw new AppError("Project Name Required!", 400);
  }

  const newProject = await Project.create({
    userId: req.user.id,
    name,
    description,
  });

  return res.status(201).json({
    status: "success",
    data: newProject,
  });
});

exports.updateProject = catchAsync(async (req, res) => {
  const project = await Project.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!project) {
    throw new AppError("Project not Found!", 404);
  }

  const { name, description } = req.body || {};

  if (!name && !description) {
    throw new AppError("Nothing to Update!", 400);
  }

  if (name) project.name = name;
  if (description) project.description = description;

  await project.save();

  return res.status(200).json({
    status: "success",
    data: project,
  });
});

exports.deleteProject = catchAsync(async (req, res) => {
  await Project.deleteOne({ _id: req.params.id, userId: req.user.id });

  return res.status(204).send();
});
