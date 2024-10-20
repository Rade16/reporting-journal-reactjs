const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../db");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING },
  // groupId: { type: DataTypes.INTEGER },
  login: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
});

const Role = sequelize.define("role", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  value: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
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

const Student = sequelize.define("student", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  groupId: { type: DataTypes.INTEGER },
  role: { type: DataTypes.STRING },
});
const UserGroup = sequelize.define("user_group", {
  userId: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
  groupId: { type: DataTypes.INTEGER, references: { model: Group, key: "id" } },
});

// User.belongsTo(Group, { foreignKey: "groupId" });
User.hasOne(Role, { through: "UserRoles", as: "roles" });
Role.belongsToMany(User, { through: "UserRoles", as: "users" });
Note.belongsTo(Group, { foreignKey: "groupId" });
Schedule.belongsTo(Group, { foreignKey: "groupId" });
Student.belongsTo(Group, { foreignKey: "groupId" });
Group.hasMany(Note, {
  foreignKey: "groupId",
  onDelete: "cascade",
  hooks: true,
});
// Group.hasMany(User, { foreignKey: "groupId" });
Group.hasMany(Schedule, { foreignKey: "groupId" });
Group.hasMany(Student, { foreignKey: "groupId" });
User.belongsToMany(Group, { through: UserGroup, foreignKey: "userId" });
Group.belongsToMany(User, { through: UserGroup, foreignKey: "groupId" });
module.exports = { User, Role, Note, Group, Schedule, Student, UserGroup };
