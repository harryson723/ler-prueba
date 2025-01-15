const express = require("express");
const UserService = require("../services/usersService");
const { APIError } = require("../utils/app-errors"); 
const router = express.Router();
const service = new UserService();

router.post("/", async (req, res, next) => {
  try {
    const { name, email, age } = req.body; 
    const response = await service.createUser({ name, email, age });
    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const response = await service.getAllUsers();
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params; 
    const response = await service.getUserById(id);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, age, password } = req.body; 
    const response = await service.editUser(id, { name, email, age, password });
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params; 
    const response = await service.deleteUser(id);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = {
  userRoute: router,
};
