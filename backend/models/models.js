const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../db");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING },
  groupId: { type: DataTypes.INTEGER },
  login: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
});

const Role = sequelize.define("role", {
  value: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    defaultValue: "user",
  },
});

const Note = sequelize.define("note", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING },
  body: { type: DataTypes.STRING },
  groupId: { type: DataTypes.INTEGER },
});

const Group = sequelize.define("group", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  body: { type: DataTypes.STRING },
});

const Schedule = sequelize.define("schedule", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  groupId: { type: DataTypes.INTEGER },
  dayOfWeek: {
    type: DataTypes.ENUM(
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ),
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  teacher: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.belongsTo(Group, { foreignKey: "groupId" });
User.hasOne(Role, { through: "UserRoles", as: "roles" });
Role.belongsToMany(User, { through: "UserRoles", as: "users" });
Note.belongsTo(Group, { foreignKey: "groupId" });
Schedule.belongsTo(Group, { foreignKey: "groupId" });
Group.hasMany(Note, { foreignKey: "groupId" });
Group.hasMany(User, { foreignKey: "groupId" });
Group.hasMany(Schedule, { foreignKey: "groupId" });
module.exports = { User, Role, Note, Group, Schedule };