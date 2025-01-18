const customerModel = require('../models/customerModel.jsx');

// Lấy tất cả khách hàng
const getAllCustomers = (req, res) => {
    customerModel.getAllCustomers((err, customers) => {
        if (err) {
            return res.status(500).json({ message: 'Không thể lấy danh sách khách hàng' });
        }
        return res.status(200).json(customers);
    });
};

// Lấy khách hàng theo ID
const getCustomerById = (req, res) => {
    const customerId = req.params.id; 
    
    customerModel.getCustomerById(customerId, (err, customer) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi lấy khách hàng theo ID' });
        }
        if (!customer) {
            return res.status(404).json({ message: 'Khách hàng không tồn tại' });
        }
        return res.status(200).json(customer);
    });
};

// Lấy khách hàng theo email
const getCustomerByEmail = (req, res) => {
    const email = req.params.email; 
    
    customerModel.getCustomerByEmail(email, (err, customer) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi lấy khách hàng theo email' });
        }
        if (!customer) {
            return res.status(404).json({ message: 'Khách hàng không tồn tại với email này' });
        }
        return res.status(200).json(customer);
    });
};

// Lấy khách hàng theo email
const getIDCustomerByEmail = (req, res) => {
    const email = req.params.email; 
    
    customerModel.getIDCustomerByEmail(email, (err, customer) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi lấy id khách hàng theo email' });
        }
        if (!customer) {
            return res.status(404).json({ message: 'ID khách hàng không tồn tại với email này' });
        }
        return res.status(200).json(customer);
    });
};

const checkEmailExists = (req, res) => {
    const email = req.params.email;

    customerModel.checkEmailExists(email, (err, emailExists) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi kiểm tra email' });
        }
        if (!emailExists) {
            return res.status(404).json({ message: 'Email không tồn tại trong hệ thống' });
        }
        return res.status(200).json({ message: 'Email đã tồn tại' });
    });
};


// Thêm khách hàng
const addCustomer = (req, res) => {
    const newCustomer = req.body; 

    customerModel.addCustomer(newCustomer, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi thêm khách hàng' });
        }
        return res.status(201).json({ message: 'Thêm khách hàng thành công', customerId: results.insertId });
    });
};

// Xóa khách hàng theo ID
const deleteCustomerById = (req, res) => {
    const customerId = req.params.id; 

    customerModel.deleteCustomerById(customerId, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi xóa khách hàng' });
        }
        if (!results || results.affectedRows === 0) {
            return res.status(404).json({ message: 'Khách hàng không tồn tại' });
        }
        return res.status(200).json({ message: 'Xóa khách hàng thành công' });
    });
};

// Sửa khách hàng theo ID
const updateCustomerById = (req, res) => {
    const customerId = req.params.id; 
    const updatedFields = req.body; 

    customerModel.updateCustomerById(customerId, updatedFields, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi sửa khách hàng' });
        }
        if (!results || results.affectedRows === 0) {
            return res.status(404).json({ message: 'Khách hàng không tồn tại hoặc không có thay đổi' });
        }
        return res.status(200).json({ message: 'Sửa khách hàng thành công' });
    });
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    getCustomerByEmail,
    getIDCustomerByEmail,
    addCustomer,
    deleteCustomerById,
    updateCustomerById,
    checkEmailExists
};
