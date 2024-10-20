const { Student } = require("../models/models");

class StudentController {
  async addStudent(req, res) {
    const { name, role, groupId } = req.body;
    const student = await Student.create({ name, role, groupId });
    return res.json(student);
  }

  async getStudent(req, res) {
    const student = await Student.findAll();
    return res.json(student);
  }
  async deleteStudent(req, res) {
    const student = await Student.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json(student);
  }

  async putStudent(req, res) {
    const student = Student.update(
      {
        name: req.body.name,
        role: req.body.role,
      },
      { where: { id: req.params.id } }
    );
    return res.json(student);
  }
}

module.exports = new StudentController();
