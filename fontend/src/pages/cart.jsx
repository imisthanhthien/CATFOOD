import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteProduct, UpdateProductQuantity, ClearCart } from '../GioHang/cart';
import { useUserContext } from "../hooks/UserContext";
import useCustomers from '../hooks/useCustomers';
import useOrders from '../hooks/useOders';
import useProducts from '../hooks/useProducts';
import { QRCode } from 'react-qr-code';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const Cart = () => {
  const cartProducts = useSelector((state) => state.cart.CartArr);
  const dispatch = useDispatch();
  const { product, fetchProductByIdCart } = useProducts();
  const { user } = useUserContext();
  const { checkEmailExists, fetchIDCustomerByEmail, checkEmailLoading, checkEmailError } = useCustomers();
  const { addOrder } = useOrders();
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false); 
  const [openDialog, setOpenDialog] = useState(false);
  const [randomId, setRandomId] = useState('');

  function generateRandomId(length) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  useEffect(() => {
    // Khi component mount, tạo ID ngẫu nhiên
    const id = generateRandomId(10);
    setRandomId(id);
  }, []);



  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    email: '',
    phone: '',
    paymentMethod: '',
  });
  const totalAmount = cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);
  const formattedAmount = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount);
  const momoPaymentLink = `momo://pay?receiverPhone=0336165737&amount=${totalAmount}&description=Thanh%20toán%20mua%20hàng&orderId=${randomId}`;

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

  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  }
  // function validatePhone(phone) {
  //   const phonePattern = /^(0[0-9]{9})$/;
  //   return phonePattern.test(phone);
  // }
  const handleSubmit = async () => {

    if (formData.fullName == "" || formData.address == "" || formData.email == "" || formData.phone == "") {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
  
    if (!validateEmail(formData.email)) {
      alert("Email không hợp lệ");
      return;
    }
  
    // if (!validatePhone(formData.phone)) {
    //   alert("Số điện thoại không hợp lệ");
    //   return;
    // }
  
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
      dispatch(ClearCart());
      setOpenDialog(false); // Đóng dialog chọn phương thức thanh toán sau khi đơn hàng được đặt thành công
  
      // Mở dialog thông báo thành công
      setOpenSuccessDialog(true);
  
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
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center uppercase">Giỏ hàng của bạn</h1>

        {cartProducts.length === 0 ? (
          <p className="text-center text-xl text-gray-600">Giỏ hàng trống.</p>
        ) : (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="py-4 px-6 text-left text-lg font-semibold text-gray-800">Tên sản phẩm</th>
                <th className="py-4 px-6 text-left text-lg font-semibold text-gray-800">Ảnh</th>
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
                  <td className="py-4 px-6 text-sm text-gray-700">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-300 shadow-sm">
                      <img
                        src={'http://localhost:8081/' + product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-200 hover:scale-110"
                      />
                    </div>
                  </td>

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
                <span className="text-3xl font-bold text-red-600 ml-2">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cartProducts.reduce((total, product) => total + product.price * product.quantity, 0))}
                </span>
              </p>
            </div>
            <button
              onClick={handlePayment}
              className="relative bg-gradient-to-r  from-blue-600 to-purple-700   text-white px-12 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center overflow-hidden group">
              <span className="relative flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

                <span className="font-medium tracking-wide">Thanh toán</span>
              </span>
            </button>


          </div>
        )}
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="md">
        <DialogTitle className="font-semibold text-xl uppercase">Thông tin đặt hàng</DialogTitle>
        <DialogContent className="space-y-4">
          {/* Họ tên và Địa chỉ cùng hàng */}
          <div className="flex gap-4">
            <TextField
              label="Họ Tên"
              name="fullName"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              className="flex-1 border rounded-lg"
            />
            <TextField
              label="Địa chỉ"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              className="flex-1 border rounded-lg"
            />
          </div>

          {/* Email và SĐT cùng hàng */}
          <div className="flex gap-4">
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              className="flex-1 border rounded-lg"
            />
            <TextField
              label="SĐT"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              className="flex-1 border rounded-lg"
            />
          </div>

          {/* Hình thức thanh toán */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Hình thức thanh toán</InputLabel>
            <Select
              label="Hình thức thanh toán"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
            >
              <MenuItem value="cash">Thanh toán khi nhận hàng</MenuItem>
              <MenuItem value="momo">Momo</MenuItem>
              <MenuItem value="bank">Ngân hàng</MenuItem>
            </Select>
          </FormControl>

          

          {formData.paymentMethod === "momo" && (
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-10">
              <div className="space-y-8">


                <div className="payment-details space-y-6">
                  <p className="text-xl font-medium">
                    <strong>Số tiền thanh toán:</strong> {formattedAmount}
                  </p>
                  <p className="text-xl font-medium">
                    <strong>Mã giao dịch:</strong> {randomId}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Hướng dẫn:</strong> Quét mã QR dưới đây hoặc nhấn nút thanh toán để tiếp tục thanh toán qua Momo.
                  </p>
                </div>

                {/* Mã QR thanh toán */}
                <div className="flex justify-center items-center">
                  <QRCode value={momoPaymentLink} size={200} />
                </div>

                {/* Nút thanh toán giả lập */}
                <div className="flex justify-center">
                  <button
                    className="mt-6 px-8 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-lg font-semibold rounded-lg shadow-md hover:from-blue-500 hover:to-indigo-600 focus:outline-none transition duration-200"
                    onClick={handleSubmit}
                  >
                    Thanh toán qua Momo
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Nếu chọn ngân hàng, hiện danh sách ngân hàng */}
          {formData.paymentMethod === "bank" && (
  <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-10 space-y-6">
    {/* Chọn ngân hàng */}
    <FormControl fullWidth margin="normal">
      <InputLabel 
      className='bg-white'
      >Chọn ngân hàng</InputLabel>
      <Select
        name="bankName"
        value={formData.bankName || ""}
        onChange={handleInputChange}
        renderValue={(selected) => (
          <div className="flex items-center space-x-2">
            <img
              src={`/public/logo/${selected}.jpg`}
              alt={selected}
              className="w-6 h-6"
            />
            <span>
              {selected === "vcb" ? "Vietcombank" :
                selected === "bidv" ? "BIDV" :
                  selected === "ctg" ? "VietinBank" :
                    selected === "acb" ? "ACB" :
                      selected === "scb" ? "Sacombank" :
                        selected === "techcom" ? "Techcombank" :
                          selected === "mbbank" ? "MBBank" :
                            selected === "shb" ? "SHB" :
                              selected === "tpbank" ? "TPBank" :
                                selected === "vpbank" ? "VPBank" :
                                  selected === "hdbank" ? "HDBank" :
                                    selected === "dongabank" ? "Đông Á Bank" :
                                      selected === "seabank" ? "SeABank" : ""}
            </span>
          </div>
        )}
      >
        {[
          { value: "vcb", label: "Vietcombank", logo: "/public/logo/vcb.jpg" },
          { value: "bidv", label: "BIDV", logo: "/public/logo/bidv.jpg" },
          { value: "ctg", label: "VietinBank", logo: "/public/logo/ctg.jpg" },
          { value: "acb", label: "ACB", logo: "/public/logo/acb.jpg" },
          { value: "scb", label: "Sacombank", logo: "/public/logo/scb.jpg" },
          { value: "techcom", label: "Techcombank", logo: "/public/logo/techcom.jpg" },
          { value: "mbbank", label: "MBBank", logo: "/public/logo/mbbank.jpg" },
          { value: "shb", label: "SHB", logo: "/public/logo/shb.jpg" },
          { value: "tpbank", label: "TPBank", logo: "/public/logo/tpbank.jpg" },
          { value: "vpbank", label: "VPBank", logo: "/public/logo/vpbank.jpg" },
          { value: "hdbank", label: "HDBank", logo: "/public/logo/hdbank.jpg" },
          { value: "dongabank", label: "Đông Á Bank", logo: "/public/logo/dongabank.jpg" },
          { value: "seabank", label: "SeABank", logo: "/public/logo/seabank.jpg" },
        ].map((bank) => (
          <MenuItem key={bank.value} value={bank.value}>
            <div className="flex items-center space-x-2">
              <img src={bank.logo} alt={bank.label} className="w-6 h-6" />
              <span>{bank.label}</span>
            </div>
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    {/* Tên tài khoản */}
    <TextField
      label="Số tài khoản"
      name="accountName"
      value={formData.accountName || ""}
      onChange={handleInputChange}
      fullWidth
      margin="normal"
    />

    {/* Họ tên chủ tài khoản */}
    <TextField
      label="Họ tên chủ tài khoản"
      name="accountHolder"
      value={formData.accountHolder || ""}
      onChange={handleInputChange}
      fullWidth
      margin="normal"
    />

    {/* Số tiền cần thanh toán */}
    <div className="text-xl font-semibold">
      <strong>Số tiền cần thanh toán: </strong>{formattedAmount}
    </div>

    {/* Nút thanh toán */}
    <div className="flex justify-center mt-6">
      <button
        className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-green-700 focus:outline-none transition duration-200"
        onClick={handleSubmit}
      >
        Thanh toán
      </button>
    </div>
  </div>
)}


        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            color="primary"
            variant="outlined"
            className="hover:bg-gray-100"
          >
            Hủy
          </Button>
          {formData.paymentMethod === "cash" && (
            <Button
              onClick={handleSubmit}
              color="primary"
              variant="contained"
              className="bg-blue-500 hover:bg-blue-600"
            >
              Đặt hàng
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog open={openSuccessDialog} onClose={() => setOpenSuccessDialog(false)}>
  <DialogTitle className="text-2xl font-bold text-center text-green-500 bg-white p-6 rounded-t-xl">
    Thanh toán thành công
  </DialogTitle>
  <DialogContent className="bg-white p-8 rounded-b-xl shadow-xl">
    <div className="flex justify-center mb-4">
      <CheckCircleIcon className="text-green-500" fontSize="large" /> {/* Icon check thành công */}
    </div>
    <p className="text-sm text-gray-700 text-center">
      Đơn hàng của bạn đã được đặt thành công. Cảm ơn bạn đã mua hàng!
    </p>
  </DialogContent>
  <DialogActions className="bg-white p-4 flex justify-center">
    <Button
      onClick={() => setOpenSuccessDialog(false)}
      color="primary"
    >
      Đóng
    </Button>
  </DialogActions>
</Dialog>



    </div>
  );
};

export default Cart;
