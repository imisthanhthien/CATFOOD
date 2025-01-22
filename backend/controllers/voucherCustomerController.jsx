const voucherCustomerModel = require('../models/voucherCustomerModel.jsx');

// Lấy tất cả voucher của khách hàng
const getAllVouchersByCustomer = (req, res) => {
    const { customerId } = req.params; // Lấy customerId từ tham số URL

    // Kiểm tra nếu customerId không tồn tại
    if (!customerId) {
        return res.status(400).json({ message: 'customerId là bắt buộc' });
    }

    voucherCustomerModel.getAllVouchersByCustomer(customerId, (err, vouchers) => {
        if (err) {
            console.error('Lỗi khi lấy danh sách voucher của khách hàng:', err);
            return res.status(500).json({
                message: 'Lỗi khi lấy danh sách voucher của khách hàng',
                error: err.message,
            });
        }

        // Trả về danh sách voucher dưới dạng JSON
        res.status(200).json(vouchers);
    });
};

// Thêm voucher cho khách hàng
const addVoucherToCustomer = (req, res) => {
    const { customerId, voucherId } = req.body; // Lấy customerId và voucherId từ body
    if (!customerId || !voucherId) {
        return res.status(400).json({ message: 'customerId và voucherId là bắt buộc' });
    }
    voucherCustomerModel.addVoucherToCustomer(customerId, voucherId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi thêm voucher cho khách hàng', error: err });
        }
        res.status(201).json({ message: 'Thêm voucher thành công', result });
    });
};

// Xóa voucher của khách hàng
const deleteVoucherFromCustomer = (req, res) => {
    const { customerId, voucherId } = req.params; // Lấy customerId và voucherId từ params
    if (!customerId || !voucherId) {
        return res.status(400).json({ message: 'customerId và voucherId là bắt buộc' });
    }
    voucherCustomerModel.deleteVoucherFromCustomer(customerId, voucherId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi xóa voucher của khách hàng', error: err });
        }
        res.status(200).json({ message: 'Xóa voucher thành công', result });
    });
};

// Thêm voucher cho tất cả khách hàng
const addVoucherToAllCustomers = (req, res) => {
    const { voucherCode } = req.body; // Lấy voucherCode từ body request
    if (!voucherCode) {
        return res.status(400).json({ message: 'voucherCode là bắt buộc' });
    }
    voucherCustomerModel.addVoucherToAllCustomers(voucherCode, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi thêm voucher cho tất cả khách hàng', error: err.message });
        }
        return res.status(201).json({ message: 'Đã thêm voucher cho tất cả khách hàng', result });
    });
};

// Xóa voucher khỏi tất cả khách hàng
const removeVoucherFromAllCustomers = (req, res) => {
    const { voucherCode } = req.body; // Lấy voucherCode từ body request
    if (!voucherCode) {
        return res.status(400).json({ message: 'voucherCode là bắt buộc' });
    }
    voucherCustomerModel.removeVoucherFromAllCustomers(voucherCode, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi xóa voucher khỏi tất cả khách hàng', error: err.message });
        }
        return res.status(200).json({ message: 'Đã xóa voucher khỏi tất cả khách hàng', result });
    });
};

const updateVoucherStatus = (req, res) => {
    const { customerId, voucherCode } = req.params;  // Nhận customerId và voucherCode từ params
    const newStatus = 'used';  // Cập nhật trạng thái thành 'used'

    voucherCustomerModel.updateVoucherStatus(customerId, voucherCode, newStatus, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi cập nhật trạng thái voucher', error: err });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Voucher không tìm thấy hoặc không thể cập nhật trạng thái' });
        }

        return res.status(200).json({ message: 'Trạng thái voucher đã được cập nhật thành công' });
    });
};


const checkVoucherStatusController = (req, res) => {
    const { customerId, voucherCode } = req.params; // Nhận customerId và voucherCode từ params

    voucherCustomerModel.checkVoucherStatus(customerId, voucherCode, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi kiểm tra trạng thái voucher', error: err.message });
        }

        // Kiểm tra kết quả trả về
        if (result === 1) {
            return res.status(200).json({ message: 'Voucher đã được sử dụng', status: 1 });
        } else {
            return res.status(200).json({ message: 'Voucher chưa được sử dụng', status: 0 });
        }
    });
};



module.exports = {
    getAllVouchersByCustomer,
    addVoucherToCustomer,
    deleteVoucherFromCustomer,
    addVoucherToAllCustomers,
    removeVoucherFromAllCustomers,
    updateVoucherStatus,
    checkVoucherStatusController,
};
