const Statistics = require("../models/statisticsModel.jsx");

// 1. Doanh thu theo sản phẩm
const getRevenueByProduct = (req, res) => {
    Statistics.getRevenueByProduct((err, data) => {
        if (err) {
            return res.status(500).json({ error: "Lỗi khi lấy doanh thu theo sản phẩm" });
        }
        res.json(data);
    });
};

// 2. Sản phẩm bán chạy nhất
const getBestSellingProduct = (req, res) => {
    Statistics.getBestSellingProduct((err, data) => {
        if (err) {
            return res.status(500).json({ error: "Lỗi khi lấy sản phẩm bán chạy nhất" });
        }
        res.json(data);
    });
};

// 3. Doanh thu theo ngày
const getRevenueByDate = (req, res) => {
    Statistics.getRevenueByDate((err, data) => {
        if (err) {
            return res.status(500).json({ error: "Lỗi khi lấy doanh thu theo ngày" });
        }
        res.json(data);
    });
};

// 4. Tồn kho sản phẩm
const getStockStatus = (req, res) => {
    Statistics.getStockStatus((err, data) => {
        if (err) {
            return res.status(500).json({ error: "Lỗi khi lấy trạng thái tồn kho" });
        }
        res.json(data);
    });
};

// 5. Doanh thu theo tháng
const getRevenueByMonth = (req, res) => {
    Statistics.getRevenueByMonth((err, data) => {
        if (err) {
            return res.status(500).json({ error: "Lỗi khi lấy doanh thu theo tháng" });
        }
        res.json(data);
    });
};

// 6. Doanh thu theo quý
const getRevenueByQuarter = (req, res) => {
    Statistics.getRevenueByQuarter((err, data) => {
        if (err) {
            return res.status(500).json({ error: "Lỗi khi lấy doanh thu theo quý" });
        }
        res.json(data);
    });
};

// 7. Doanh thu theo năm
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
