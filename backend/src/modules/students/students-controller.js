const asyncHandler = require("express-async-handler");
const { 
  getAllStudents, 
  addNewStudent, 
  getStudentDetail, 
  setStudentStatus, 
  updateStudent 
} = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const { studentId,name, email, role, systemAcess, lastlogin } = req.query;
    const students = await getAllStudents({ studentId,name, email, role, systemAcess, lastlogin });
    res.json({ students });
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const payload = req.body;
    const message = await addNewStudent(payload);
    res.json(message);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const { id: studentId } = req.params;
    const payload = req.body;
    const message = await updateStudent({ ...payload, studentId });
    res.json(message);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const student = await getStudentDetail(id);
    res.json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const { id: studentId } = req.params;
    const { status } = req.body;
    const { id: reviewerId } = req.user;
    const message = await setStudentStatus({ studentId, status, reviewerId });
    res.json(message);
});

module.exports = {
    handleGetAllStudents,
    handleAddStudent,
    handleUpdateStudent,
    handleGetStudentDetail,
    handleStudentStatus,
};