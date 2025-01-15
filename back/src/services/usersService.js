const UserRepository = require("../database/repository/usersRepository");
const {
  FormateData,
  GenerateSignature,
  ValidatePassword,
} = require("../utils");
const { APIError, BadRequestError } = require("../utils/app-errors");

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async createUser(userInputs) {
    const { name, email, age } = userInputs;

    try {
      const existingUser = await this.repository.getUserByEmail(email);
      if (existingUser) {
        throw new BadRequestError("User with this email already exists.");
      }
      
      const newUser = await this.repository.createUser({
        name,
        email,
        age,
      });

      return FormateData(newUser);
    } catch (err) {
      // Pasamos el error al middleware de manejo de errores
      throw new APIError("Error during user creation", err.message);
    }
  }

  async getAllUsers() {
    try {
      const users = await this.repository.getAllUsers();
      return FormateData(users);
    } catch (err) {
      throw new APIError("Error fetching users", err.message);
    }
  }

  async getUserById(userId) {
    try {
      const user = await this.repository.getUserById(userId);
      return FormateData(user);
    } catch (err) {
      throw new APIError("Error fetching user by ID", err.message);
    }
  }

  async editUser(userId, userInputs) {
    const { name, email, age, password } = userInputs;

    try {
      const existingUser = await this.repository.getUserById(userId);
      if (!existingUser) {
        throw new BadRequestError("User not found.");
      }

      let updatedPassword = existingUser.password;
      if (password) {
        updatedPassword = await this.hashPassword(password);
      }

      const updatedUser = await this.repository.editUser(userId, {
        name,
        email,
        age,
        password: updatedPassword,
      });

      return FormateData(updatedUser);
    } catch (err) {
      throw new APIError("Error during user update", err.message);
    }
  }

  async deleteUser(userId) {
    try {
      const user = await this.repository.getUserById(userId);
      if (!user) {
        throw new BadRequestError("User not found.");
      }

      const result = await this.repository.deleteUser(userId);
      return FormateData(result);
    } catch (err) {
      throw new APIError("Error deleting user", err.message);
    }
  }
}

module.exports = UserService;
