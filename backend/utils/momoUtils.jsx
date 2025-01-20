
const crypto = require('crypto');

// Hàm tạo chữ ký (signature)
const generateSignature = (data, secretKey) => {
  const rawSignature = Object.keys(data).map(key => `${key}=${data[key]}`).join('&');
  return crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');
};

// Hàm tạo request thanh toán cho Momo
const createPaymentRequest = (partnerCode, accessKey, secretKey, orderId, amount, orderInfo, redirectUrl, notifyUrl) => {
  const requestData = {
    partnerCode,
    accessKey,
    requestId: orderId,
    amount,
    orderId,
    orderInfo,
    redirectUrl,
    notifyUrl,
  };

  // Tạo chữ ký cho yêu cầu
  const signature = generateSignature(requestData, secretKey);

  return { ...requestData, signature };
};

module.exports = {
  createPaymentRequest,
  generateSignature
};
