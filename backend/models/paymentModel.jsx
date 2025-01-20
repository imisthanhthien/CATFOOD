const axios = require('axios');
const { createPaymentRequest } = require('../utils/momoUtils.jsx');


const partnerCode = 'MOMO_PARTNER_CODE';  
const accessKey = 'MOMO_ACCESS_KEY';  
const secretKey = 'MOMO_SECRET_KEY';  

const createPaymentLink = async (orderId, amount, orderInfo, redirectUrl, notifyUrl) => {
  const paymentData = createPaymentRequest(partnerCode, accessKey, secretKey, orderId, amount, orderInfo, redirectUrl, notifyUrl);

  try {
    const response = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', paymentData);
    return response.data;
  } catch (error) {
    console.error('Error creating Momo payment link:', error);
    throw new Error('Failed to create payment link');
  }
};

module.exports = {
  createPaymentLink
};
