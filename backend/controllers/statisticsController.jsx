const Statistics = require("../models/statisticsModel.jsx");

//Doanh thu theo sản phẩm
const getRevenueByProduct = (req, res) => {
    Statistics.getRevenueByProduct((err, data) => {
        if (err) {
            return res.status(500).json({ error: "Lỗi khi lấy doanh thu theo sản phẩm" });
        }
        res.json(data);
    });
};

//Sản phẩm bán chạy nhất
const getBestSellingProduct = (req, res) => {
    Statistics.getBestSellingProduct((err, data) => {
        if (err) {
            return res.status(500).json({ error: "Lỗi khi lấy sản phẩm bán chạy nhất" });
        }
        res.json(data);
    });
};

//Doanh thu theo ngày
const getRevenueByDate = (req, res) => {
    Statistics.getRevenueByDate((err, data) => {
        if (err) {
            return res.status(500).json({ error: "Lỗi khi lấy doanh thu theo ngày" });
        }
        res.json(data);
    });
};

//Tồn kho sản phẩm
const getStockStatus = (req, res) => {
    Statistics.getStockStatus((err, data) => {
        if (err) {
            return res.status(500).json({ error: "Lỗi khi lấy trạng thái tồn kho" });
        }
        res.json(data);
    });
};

//Doanh thu theo tháng
const getRevenueByMonth = (req, res) => {
    Statistics.getRevenueByMonth((err, data) => {
        if (err) {
            return res.status(500).json({ error: "Lỗi khi lấy doanh thu theo tháng" });
        }
        res.json(data);
    });
};

//Doanh thu theo quý
const getRevenueByQuarter = (req, res) => {
    Statistics.getRevenueByQuarter((err, data) => {
        if (err) {
            return res.status(500).json({ error: "Lỗi khi lấy doanh thu theo quý" });
        }
        res.json(data);
    });
};

//Doanh thu theo năm
const getRevenueByYear = (req, res) => {
    Statistics.getRevenueByYear((err, data) => {
        if (err) {
            return res.status(500).json({ error: "Lỗi khi lấy doanh thu theo năm" });
        }
        res.json(data);
    });
};

module.exports = {
    getRevenueByProduct,
    getBestSellingProduct,
    getRevenueByDate,
    getStockStatus,
    getRevenueByMonth,
    getRevenueByQuarter,
    getRevenueByYear,
};
