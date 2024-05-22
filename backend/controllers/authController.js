const { User, Role } = require("../models/models");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const generateAccessToken = (id) => {
  const payload = {
    id,
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Некорректные данные" });
      }
      const { login, password } = req.body;

      const candidate = await User.findOne({ where: { login } });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Такой пользователь уже существует" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ where: { value: "admin" } });

      const user = await User.create({
        name: "Гилоян Роман",
        login,
        password: hashPassword,
        role: userRole.value,
      });

      await user.save();
      return res.json("Пользователь создан");
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Произошла ошибка при регистрации" });
    }
  }
  async login(req, res) {
    try {
      const { login, password } = req.body;
      const user = await User.findOne({ where: { login } });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${login} не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Неверный пароль" });
      }
      const token = generateAccessToken(user.id);
      return res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          login: user.login,
          password: user.password,
          role: user.role,
          groupId: user.groupId,
        },
      });
    } catch (e) {}
  }
  async getUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Произошла ошибка при создании роли" });
    }
  }
  async getUser(req, res) {
    try {
      const user = await User.findOne({ where: { id: req.params.id } });
      res.json(user);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "1" });
    }
  }
  async postUserRole(req, res) {
    try {
      const adminRole = new Role({ value: "admin" });
      await adminRole.save();
      res.json({ adminRole });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "1" });
    }
  }

  async auth(req, res) {
    try {
      const user = await User.findOne({ where: { id: req.user.id } });
      const token = generateAccessToken(user.id);
      return res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          login: user.login,
          password: user.password,
          role: user.role,
          groupId: user.groupId,
        },
      });
    } catch (e) {
      console.log(e);
      res.send({ message: "Server error" });
    }
  }
}

module.exports = new authController();
