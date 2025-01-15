
const { APIError, STATUS_CODES } = require('../../utils/app-errors');
const { pool } = require('../connection');

class UserRepository {
  // Create a new user
  async createUser(user) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const userResult = await client.query(
        "INSERT INTO usuarios(nombre, correo, edad) VALUES($1, $2, $3) RETURNING id",
        [user.name, user.email, user.age]
      );
      const userId = userResult.rows[0].id;
      await client.query("COMMIT");

      return { id: userId, name: user.name, email: user.email, age: user.age };
    } catch (err) {
      await client.query("ROLLBACK");
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to create user"
      );
    } finally {
      client.release();
    }
  }

  async getAllUsers() {
    const client = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM usuarios");
      return result.rows;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to fetch users"
      );
    } finally {
      client.release();
    }
  }

  async getUserById(id) {
    const client = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM usuarios WHERE id = $1", [id]);
      if (result.rows.length === 0) {
        throw new APIError(
          "API Error",
          STATUS_CODES.NOT_FOUND,
          "User not found"
        );
      }
      return result.rows[0];
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to fetch user"
      );
    } finally {
      client.release();
    }
  }

  async getUserByEmail(email) {
    const client = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM usuarios WHERE correo = $1", [email]);
      if (result.rows.length === 0) {
        return null; 
      }
      return result.rows[0];
    } catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to fetch user by email");
    } finally {
      client.release();
    }
  }

  async editUser(id, user) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const result = await client.query(
        "UPDATE usuarios SET nombre = $1, correo = $2, edad = $3 WHERE id = $4 RETURNING id",
        [user.name, user.email, user.age, id]
      );
      
      if (result.rows.length === 0) {
        throw new APIError(
          "API Error",
          STATUS_CODES.NOT_FOUND,
          "User not found"
        );
      }

      await client.query("COMMIT");
      return { id, name: user.name, email: user.email, age: user.age };
    } catch (err) {
      await client.query("ROLLBACK");
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to update user"
      );
    } finally {
      client.release();
    }
  }

  async deleteUser(id) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const result = await client.query(
        "DELETE FROM usuarios WHERE id = $1 RETURNING id",
        [id]
      );

      if (result.rows.length === 0) {
        throw new APIError(
          "API Error",
          STATUS_CODES.NOT_FOUND,
          "User not found"
        );
      }

      await client.query("COMMIT");
      return { message: "User deleted successfully", id };
    } catch (err) {
      await client.query("ROLLBACK");
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to delete user"
      );
    } finally {
      client.release();
    }
  }
}

module.exports = UserRepository;
