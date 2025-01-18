const userModel = require('../models/userModel.jsx');

// Lấy tất cả người dùng
const getAllUsers = (req, res) => {
    userModel.getAllUsers((err, users) => {
        if (err) {
            return res.status(500).json({ message: 'Không thể lấy người dùng' });
        }
        return res.status(200).json(users);
    });
};

// Thêm người dùng mới
const createUser = (req, res) => {
    const userData = req.body;
    userModel.createUser(userData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Không thể thêm người dùng' });
        }
        return res.status(201).json({ message: 'Thêm người dùng thành công', result });
    });
};

// Cập nhật thông tin người dùng
const updateUser = (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    userModel.updateUser(userId, userData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Không thể cập nhật người dùng' });
        }
        return res.status(200).json({ message: 'Cập nhật người dùng thành công', result });
    });
};

// Xóa người dùng
const deleteUser = (req, res) => {
    const userId = req.params.id;
    userModel.deleteUser(userId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Không thể xóa người dùng' });
        }
        return res.status(200).json({ message: 'Xóa người dùng thành công' });
    });
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
};
