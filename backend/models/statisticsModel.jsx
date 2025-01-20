const db = require("../db");

// 1. Doanh thu theo sản phẩm
const getRevenueByProduct = (callback) => {
    const sql = `
        SELECT 
            p.id AS product_id,
            p.name AS product_name,
            SUM(oi.quantity) AS total_quantity_sold,
            SUM(oi.price * oi.quantity) AS total_revenue
        FROM 
            order_items oi
        JOIN 
            products p ON oi.product_id = p.id
        GROUP BY 
            p.id, p.name
        ORDER BY 
            total_revenue DESC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Lỗi khi lấy doanh thu theo sản phẩm:", err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// 2. Sản phẩm bán chạy nhất
const getBestSellingProduct = (callback) => {
    const sql = `
        SELECT 
            p.id AS product_id,
            p.name AS product_name,
            SUM(oi.quantity) AS total_quantity_sold
        FROM 
            order_items oi
        JOIN 
            products p ON oi.product_id = p.id
        GROUP BY 
            p.id, p.name
        ORDER BY 
            total_quantity_sold DESC
        LIMIT 3
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Lỗi khi lấy sản phẩm bán chạy nhất:", err);
            return callback(err, null);
        }
        callback(null, results[0]);
    });
};

// 3. Doanh thu theo ngày
const getRevenueByDate = (callback) => {
    const sql = `
        SELECT 
            DATE(o.order_date) AS order_date,
            SUM(o.total_price) AS total_revenue
        FROM 
            orders o
        GROUP BY 
            DATE(o.order_date)
        ORDER BY 
            order_date
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Lỗi khi lấy doanh thu theo ngày:", err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// 4. Tồn kho sản phẩm
const getStockStatus = (callback) => {
    const sql = `
        SELECT 
            id AS product_id,
            name AS product_name,
            quantity AS stock_quantity
        FROM 
            products
        ORDER BY 
            stock_quantity ASC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Lỗi khi lấy trạng thái tồn kho:", err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// 5. Doanh thu theo tháng
const getRevenueByMonth = (callback) => {
    const sql = `
        SELECT 
            EXTRACT(YEAR FROM o.order_date) AS year,
            EXTRACT(MONTH FROM o.order_date) AS month,
            SUM(o.total_price) AS total_revenue
        FROM 
            orders o
        GROUP BY 
            year, month
        ORDER BY 
            year DESC, month DESC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Lỗi khi lấy doanh thu theo tháng:", err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// 6. Doanh thu theo quý
const getRevenueByQuarter = (callback) => {
    const sql = `
        SELECT 
            EXTRACT(YEAR FROM o.order_date) AS year,
            CEIL(EXTRACT(MONTH FROM o.order_date) / 3.0) AS quarter,
            SUM(o.total_price) AS total_revenue
        FROM 
            orders o
        GROUP BY 
            year, quarter
        ORDER BY 
            year DESC, quarter DESC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Lỗi khi lấy doanh thu theo quý:", err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// 7. Doanh thu theo năm
const getRevenueByYear = (callback) => {
    const sql = `
        SELECT 
            EXTRACT(YEAR FROM o.order_date) AS year,
            SUM(o.total_price) AS total_revenue
        FROM 
            orders o
        GROUP BY 
            year
        ORDER BY 
            year DESC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Lỗi khi lấy doanh thu theo năm:", err);
            return callback(err, null);
        }
        callback(null, results);
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
