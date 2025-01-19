import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteProduct, UpdateProductQuantity, ClearCart } from '../GioHang/cart';
import { useUserContext } from "../hooks/UserContext";
import useCustomers from '../hooks/useCustomers';
import useOrders from '../hooks/useOders';
import useProducts from '../hooks/useProducts';

import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const Cart = () => {
  const cartProducts = useSelector((state) => state.cart.CartArr);
  const dispatch = useDispatch();
  const { product, fetchProductByIdCart } = useProducts(); 
  const { user } = useUserContext();
  const { checkEmailExists, fetchIDCustomerByEmail, checkEmailLoading, checkEmailError } = useCustomers();
  const { addOrder } = useOrders(); 

  const [openDialog, setOpenDialog] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    email: '',
    phone: '',
    paymentMethod: '', 
  });

  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState(null);

  const fetchCustomerByEmail = async (email) => {
    setEmailLoading(true);
    setEmailError(null);
    try {
      const response = await axios.get(`http://localhost:8081/customers/email/${email}`);
      setFormData({
        name: response.data.name,
        address: response.data.address,
        email: response.data.email,
        phone: response.data.phone,
        paymentMethod: '',
      });
    } catch (err) {
      setEmailError('Khách hàng không tồn tại hoặc đã xảy ra lỗi.');
    } finally {
      setEmailLoading(false);
    }
  };


  const handleDeleteProduct = (productId) => {
    dispatch(DeleteProduct({ id: productId }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const customerExists = await checkEmailExists(formData.email.trim());

    if (!customerExists) {
      try {
        await axios.post('http://localhost:8081/customers', {
          name: formData.fullName,
          address: formData.address,
          email: formData.email,
          phone: formData.phone,
        });
      } catch (error) {
        console.error("Error adding new customer:", error);
        alert("Có lỗi xảy ra khi thêm khách hàng.");
        return;
      }
    } else {
    }
    const customerID = await fetchIDCustomerByEmail(formData.email.trim());
    const orderDateVN = new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
    const orderDateISO = new Date(orderDateVN).toISOString();

    const orderData = {
      customer_id: customerID,
      order_date: orderDateISO,
      status: "pending",
      total_price: cartProducts.reduce((total, product) => total + product.price * product.quantity, 0),

      detail_order: JSON.stringify(cartProducts) 
    };

    try {
      await addOrder(orderData);
      alert("Đơn hàng đã được đặt thành công!");
      dispatch(ClearCart());
      setOpenDialog(false);

    } catch (error) {
      console.error("Error placing order:", error);
      alert("Có lỗi xảy ra khi đặt hàng.");
    }
  };


  const handlePayment = () => {
    if (!user) {
      setOpenDialog(true);
    } else {
      fetchCustomerByEmail(user.email);
      setOpenDialog(true);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      newQuantity = 1;
    }
    const product = await fetchProductByIdCart(productId);
    if (!product || product.quantity === undefined) {
      console.error("Không thể lấy thông tin sản phẩm hoặc số lượng không tồn tại.");
      alert("Không thể lấy thông tin sản phẩm.");
      return;
    }
    const { quantity: productQuantity } = product;
    if (newQuantity > productQuantity) {
      alert("Số lượng sản phẩm trong giỏ vượt quá số lượng có sẵn!");
      return;
    }
    dispatch(UpdateProductQuantity({ id: productId, quantity: newQuantity }));
  };


  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-white shadow-xl rounded-xl p-8 max-h-full overflow-auto relative border-t-4 border-blue-500">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Giỏ hàng của bạn</h1>

        {cartProducts.length === 0 ? (
          <p className="text-center text-xl text-gray-600">Giỏ hàng trống.</p>
        ) : (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="py-4 px-6 text-left text-lg font-semibold text-gray-800">Tên sản phẩm</th>
                <th className="py-4 px-6 text-left text-lg font-semibold text-gray-800">Giá</th>
                <th className="py-4 px-6 text-left text-lg font-semibold text-gray-800">Số lượng</th>
                <th className="py-4 px-6 text-left text-lg font-semibold text-gray-800">Tổng</th>
                <th className="py-4 px-6 text-left text-lg font-semibold text-gray-800">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {cartProducts.map((product) => (
                <tr key={product.id} className="border-t border-gray-200 hover:bg-gray-50 transition-all">
                  <td className="py-4 px-6 text-sm text-gray-700">{product.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{product.price}₫</td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                        className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-all">
                        -
                      </button>
                      <input
                        type="number"
                        value={product.quantity}
                        onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                        className="w-12 text-center border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                        className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-all">
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">{product.price * product.quantity}₫</td>
                  <td className="py-4 px-6 text-sm text-red-500 cursor-pointer hover:text-red-700 transition-all">
                    <button onClick={() => handleDeleteProduct(product.id)} className="hover:underline">Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {cartProducts.length > 0 && (
          <div className="mt-6 flex justify-between items-center">
            <div className="flex-1">
              <p className="text-3xl font-semibold text-gray-800">
                TỔNG TIỀN:
                <span className="text-3xl font-bold text-red-600">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cartProducts.reduce((total, product) => total + product.price * product.quantity, 0))}
                </span>
              </p>
            </div>
            <button
              onClick={handlePayment}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300">
              Thanh toán
            </button>
          </div>
        )}
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle className="font-semibold text-xl">Thông tin đặt hàng</DialogTitle>
        <DialogContent className="space-y-4">
          <TextField
            label="Họ Tên"
            name="fullName"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            className="border rounded-lg"
          />
          <TextField
            label="Địa chỉ"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            className="border rounded-lg"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            className="border rounded-lg"
          />
          <TextField
            label="SĐT"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            className="border rounded-lg"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Hình thức thanh toán</InputLabel>
            <Select
              label="Hình thức thanh toán"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
            >
              <MenuItem value="cash">Thanh toán khi nhận hàng</MenuItem>
              <MenuItem value="bank">Ngân hàng</MenuItem>
              <MenuItem value="momo">Momo</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary" variant="outlined" className="hover:bg-gray-100">
            Hủy
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained" className="bg-blue-500 hover:bg-blue-600">
            Đặt hàng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Cart;
