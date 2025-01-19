const express = require("express");
const statisticsController = require("../controllers/statisticsController.jsx");

const router = express.Router();

router.get("/revenue-by-product", statisticsController.getRevenueByProduct);
router.get("/best-selling", statisticsController.getBestSellingProduct);
router.get("/revenue-by-date", statisticsController.getRevenueByDate);
router.get("/stock-status", statisticsController.getStockStatus);
router.get("/revenue-by-month", statisticsController.getRevenueByMonth);
router.get("/revenue-by-quarter", statisticsController.getRevenueByQuarter);
router.get("/revenue-by-year", statisticsController.getRevenueByYear);

module.exports = router;
