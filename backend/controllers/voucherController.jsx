const voucherModel = require('../models/voucherModel.jsx');

const applyVoucher = (req, res) => {
    const { voucherCode, cartTotal, customerId } = req.body;

    // Log tất cả dữ liệu nhận được từ client
    console.log("Received data from client:", req.body);

    voucherModel.getVoucherByCode(voucherCode, (err, voucher) => {
        if (err || !voucher || voucher.length === 0) {
            
            return res.status(400).json({ success: false, message: 'Voucher không tìm thấy hoặc không hợp lệ' });
        }

        let discount = 0;

        // Truy cập phần tử đầu tiên của mảng voucher
        const discountPercentage = parseFloat(voucher[0].discount_percentage);
        const discountAmount = parseFloat(voucher[0].discount_amount);
        const discountMin = parseFloat(voucher[0].min_order_amount);
        const maxdiscout = parseFloat(voucher[0].max_discount_amount);

        if (cartTotal < discountMin) {
            console.log(`Tổng giá trị đơn hàng (${cartTotal} VNĐ) nhỏ hơn mức tối thiểu (${discountMin} VNĐ), không áp dụng giảm giá.`);
        } else {
            // Kiểm tra giảm giá theo phần trăm
            if (discountPercentage > 0) {
                discount = (cartTotal * discountPercentage) / 100;
            
                if (maxdiscout > 0 && discount > maxdiscout) {
                    discount = maxdiscout;
                }
            }
            // Kiểm tra giảm giá theo số tiền cố định
            else if (discountAmount > 0) {
                discount = discountAmount;   
            } else {
                console.log("Voucher không có thông tin giảm giá."); 
            }
        }

        const totalAfterDiscount = cartTotal - discount;
        return res.json({
            success: true,
            discount,
            totalAfterDiscount,
        });
    });
};

// Lấy danh sách tất cả các voucher
const getAllVouchers = (req, res) => {
    voucherModel.getAllVouchers((err, vouchers) => {
        if (err) {
            console.error('Lỗi khi lấy danh sách voucher:', err);
            return res.status(500).json({ message: 'Lỗi khi lấy danh sách voucher', error: err });
        }
        return res.status(200).json({ vouchers });
    });
};

// Lấy thông tin voucher theo mã
const getVoucherByCode = (req, res) => {
    const { code } = req.params;
    voucherModel.getVoucherByCode(code, (err, voucher) => {
        if (err) {
            console.error('Lỗi khi tìm kiếm voucher theo mã:', err);
            return res.status(500).json({ message: 'Lỗi khi tìm kiếm voucher', error: err });
        }
        if (!voucher || voucher.length === 0) {
            return res.status(404).json({ message: 'Voucher không tồn tại' });
        }
        return res.status(200).json({ voucher: voucher[0] });
    });
};

// Thêm voucher mới
const addVoucher = (req, res) => {
    const  newVoucher= req.body;
    voucherModel.addVoucher(newVoucher, (err, result) => {
        if (err) {
            console.error('Lỗi khi thêm voucher:', err);
            return res.status(500).json({ message: 'Lỗi khi thêm voucher', error: err });
        }
        return res.status(201).json({ message: 'Voucher đã được thêm thành công', voucherId: result.insertId });
    });
};

// Cập nhật voucher
const updateVoucher = (req, res) => {
    const id = req.params.id; 
    const updatedVoucher = req.body; 

    voucherModel.updateVoucher(id, updatedVoucher, (err, result) => {
        if (err) {
            console.error('Lỗi khi cập nhật voucher:', err);
            return res.status(500).json({ message: 'Lỗi khi cập nhật voucher', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Voucher không tồn tại' });
        }
        return res.status(200).json({ message: 'Voucher đã được cập nhật thành công' });
    });
};

// Xóa voucher
const deleteVoucher = (req, res) => {
    const { id } = req.params;

    voucherModel.deleteVoucher(id, (err, result) => {
        if (err) {
            console.error('Lỗi khi xóa voucher:', err);
            return res.status(500).json({ message: 'Lỗi khi xóa voucher', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Voucher không tồn tại' });
        }
        return res.status(200).json({ message: 'Voucher đã được xóa thành công' });
    });
};

const checkVoucherExists = (req, res) => {
    const { voucherCode } = req.body;

    // Log tất cả dữ liệu nhận được từ client
    console.log("Received data from client:", req.body);

    voucherModel.checkVoucherExists(voucherCode, (err, exists) => {
        if (err) {
            console.error('Lỗi khi kiểm tra sự tồn tại voucher:', err);
            return res.status(500).json({ success: false, message: 'Lỗi khi kiểm tra sự tồn tại voucher', error: err });
        }

        if (!exists) {
            console.log('Voucher không tồn tại');
            return res.status(404).json({ success: false, message: 'Voucher không tồn tại' });
        }

        // Nếu voucher tồn tại
        console.log('Voucher tồn tại');
        return res.status(200).json({ success: true, message: 'Voucher tồn tại' });
    });
};


module.exports = {
    getAllVouchers,
    getVoucherByCode,
    addVoucher,
    updateVoucher,
    deleteVoucher,
    applyVoucher,
    checkVoucherExists,
};
