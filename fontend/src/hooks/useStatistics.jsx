import { useState, useEffect } from "react";
import axios from "axios";

const useStatistics = () => {
    const [statistics, setStatistics] = useState({
        revenueByProduct: [],
        bestSellingProduct: null,
        revenueByDate: [],
        stockStatus: [],
        revenueByMonth: [], 
        revenueByQuarter: [], 
        revenueByYear: [], 
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Lấy thống kê doanh thu theo sản phẩm
    const fetchRevenueByProduct = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:8081/statistics/revenue-by-product");
            setStatistics((prev) => ({ ...prev, revenueByProduct: response.data }));
        } catch (err) {
            setError("Đã xảy ra lỗi khi lấy doanh thu theo sản phẩm.");
        } finally {
            setLoading(false);
        }
    };

    // Lấy sản phẩm bán chạy nhất
    const fetchBestSellingProduct = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:8081/statistics/best-selling");
            setStatistics((prev) => ({ ...prev, bestSellingProduct: response.data }));
        } catch (err) {
            setError("Đã xảy ra lỗi khi lấy sản phẩm bán chạy nhất.");
        } finally {
            setLoading(false);
        }
    };

    // Lấy thống kê doanh thu theo ngày
    const fetchRevenueByDate = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:8081/statistics/revenue-by-date");
            setStatistics((prev) => ({ ...prev, revenueByDate: response.data }));
        } catch (err) {
            setError("Đã xảy ra lỗi khi lấy doanh thu theo ngày.");
        } finally {
            setLoading(false);
        }
    };

    // Lấy trạng thái tồn kho sản phẩm
    const fetchStockStatus = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:8081/statistics/stock-status");
            setStatistics((prev) => ({ ...prev, stockStatus: response.data }));
        } catch (err) {
            setError("Đã xảy ra lỗi khi lấy trạng thái tồn kho.");
        } finally {
            setLoading(false);
        }
    };

    // Lấy doanh thu theo tháng
    const fetchRevenueByMonth = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:8081/statistics/revenue-by-month");
            setStatistics((prev) => ({ ...prev, revenueByMonth: response.data }));
        } catch (err) {
            setError("Đã xảy ra lỗi khi lấy doanh thu theo tháng.");
        } finally {
            setLoading(false);
        }
    };

    // Lấy doanh thu theo quý
    const fetchRevenueByQuarter = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:8081/statistics/revenue-by-quarter");
            setStatistics((prev) => ({ ...prev, revenueByQuarter: response.data }));
        } catch (err) {
            setError("Đã xảy ra lỗi khi lấy doanh thu theo quý.");
        } finally {
            setLoading(false);
        }
    };

    // Lấy doanh thu theo năm
    const fetchRevenueByYear = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:8081/statistics/revenue-by-year");
            setStatistics((prev) => ({ ...prev, revenueByYear: response.data }));
        } catch (err) {
            setError("Đã xảy ra lỗi khi lấy doanh thu theo năm.");
        } finally {
            setLoading(false);
        }
    };

    // Gọi tất cả các API thống kê cùng lúc
    const fetchAllStatistics = async () => {
        setLoading(true);
        setError(null);
        try {
            await Promise.all([
                fetchRevenueByProduct(),
                fetchBestSellingProduct(),
                fetchRevenueByDate(),
                fetchStockStatus(),
                fetchRevenueByMonth(), 
                fetchRevenueByQuarter(), 
                fetchRevenueByYear(), 
            ]);
        } catch (err) {
            setError("Đã xảy ra lỗi khi lấy dữ liệu thống kê.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllStatistics();
    }, []);

    return {
        statistics,
        loading,
        error,
        fetchRevenueByProduct,
        fetchBestSellingProduct,
        fetchRevenueByDate,
        fetchStockStatus,
        fetchRevenueByMonth, 
        fetchRevenueByQuarter,
        fetchRevenueByYear, 
        fetchAllStatistics,
    };
};

export default useStatistics;
