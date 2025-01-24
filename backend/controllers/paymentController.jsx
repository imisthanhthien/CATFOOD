const { createPaymentLink } = require('../models/paymentModel.jsx');

// Hàm xử lý request thanh toán
const handleMomoPayment = async (req, res) => {
  const { orderId, amount, orderInfo, redirectUrl, notifyUrl } = req.body;

  if (!orderId || !amount || !orderInfo || !redirectUrl || !notifyUrl) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const paymentResponse = await createPaymentLink(orderId, amount, orderInfo, redirectUrl, notifyUrl);
    return res.json({ payUrl: paymentResponse.payUrl });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to process payment' });
  }
};

module.exports = {
  handleMomoPayment
};
