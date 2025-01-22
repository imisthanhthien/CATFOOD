import { useState, useEffect } from 'react';
import axios from 'axios';

const useVouchers = () => {
    const [vouchers, setVouchers] = useState([]);       // Trạng thái lưu danh sách voucher
    const [voucher, setVoucher] = useState(null);        // Trạng thái lưu một voucher đơn lẻ
    const [loading, setLoading] = useState(false);       // Trạng thái loading
    const [error, setError] = useState(null);            // Trạng thái lỗi
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(null);  // Trạng thái lưu tổng sau khi áp dụng voucher
    const [discount, setDiscount] = useState(0);         // Trạng thái lưu số tiền giảm


    // Lấy tất cả các voucher
    const getAllVouchers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8081/vouchers');
            setVouchers(response.data.vouchers);  // Nếu trả về đối tượng có key 'vouchers'
            setLoading(false);
        } catch (err) {
            setError('Không thể lấy danh sách voucher');
            setLoading(false);
        }
    };
    
    // Lấy voucher theo mã code
    const getVoucherByCode = async (code) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8081/vouchers/${code}`);
            setVoucher(response.data);
            setError(null);
        } catch (err) {
            setError('Không tìm thấy voucher với mã code này!');
        } finally {
            setLoading(false);
        }
    };

    // Thêm voucher mới
    const addVoucher = async (newVoucher) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8081/vouchers', newVoucher);
            setVouchers((prevVouchers) => [...prevVouchers, response.data]);
            setError(null);
        } catch (err) {
            setError('Lỗi khi thêm voucher!');
        } finally {
            setLoading(false);
        }
    };

    // Cập nhật thông tin voucher
    const updateVoucher = async (id, updatedVoucher) => {
        setLoading(true);
        try {
            const response = await axios.put(`http://localhost:8081/vouchers/${id}`, updatedVoucher);
            setVouchers((prevVouchers) =>
                prevVouchers.map((voucher) =>
                    voucher.id === id ? response.data : voucher
                )
            );
            setError(null);
        } catch (err) {
            setError('Lỗi khi cập nhật voucher!');
        } finally {
            setLoading(false);
        }
    };

    // Xóa voucher
    const deleteVoucher = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:8081/vouchers/${id}`);
            setVouchers((prevVouchers) =>
                prevVouchers.filter((voucher) => voucher.id !== id)
            );
            setError(null);
        } catch (err) {
            setError('Lỗi khi xóa voucher!');
        } finally {
            setLoading(false);
        }
    };

    // Áp dụng voucher cho giỏ hàng
    const applyVoucher = async (voucherCode, cartTotal, customerId) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8081/vouchers/apply', {
                voucherCode,
                cartTotal,
                customerId,
            });
    
            console.log('Voucher Response:', response);  // Log toàn bộ dữ liệu trả về từ server
            if (response && response.data) {
                const data = response.data;  // Lấy đúng data từ response
                if (data.success) {
                    setDiscount(data.discount);
                    setTotalAfterDiscount(data.totalAfterDiscount);
                    setError(null);
                } else {
                    setError('Voucher không hợp lệ hoặc không thể áp dụng');
                }
            } else {
                setError('Dữ liệu trả về không hợp lệ hoặc server không trả về đúng định dạng.');
            }
        } catch (err) {
            setError(`Lỗi khi áp dụng voucher: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };
    
    // Kiểm tra sự tồn tại của voucher
    const checkVoucherExists = async (voucherCode) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8081/vouchers/check-exists', { voucherCode });
            if (response.data.success) {
                setError(null);
                return true;
            } else {
                setError('Voucher không tồn tại');
                return false;
            }
        } catch (err) {
            setError('Lỗi khi kiểm tra sự tồn tại voucher!');
            return false;
        } finally {
            setLoading(false);
        }
    };
    
    // Hook gọi lại getAllVouchers khi component được mount
    useEffect(() => {
        getAllVouchers();
    }, []);

    return {
        vouchers,
        voucher,
        loading,
        error,
        discount,
        totalAfterDiscount,
        getAllVouchers,
        getVoucherByCode,
        addVoucher,
        updateVoucher,
        deleteVoucher,
        applyVoucher,
        checkVoucherExists,
    };
};

export default useVouchers;
