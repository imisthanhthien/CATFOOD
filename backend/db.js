const mysql = require('mysql2');

// Cấu hình kết nối tới MySQL (XAMPP)
const config = {
    host: 'localhost',      
    user: 'root',           
    password: '',           
    database: 'cat_db',    
};

// Tạo kết nối tới MySQL
const db = mysql.createConnection(config);

// Kết nối tới cơ sở dữ liệu
db.connect((err) => {
    if (err) {
        console.error("Lỗi kết nối cơ sở dữ liệu:", err);
        setTimeout(() => db.connect(), 5000); 
    } else {
        console.log("Kết nối cơ sở dữ liệu MySQL thành công");
    }
});

// Đảm bảo tự động kết nối lại khi bị mất kết nối
db.on('error', (err) => {
    console.error('Lỗi kết nối:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        setTimeout(() => db.connect(), 5000); 
    } else {
        throw err;
    }
});

module.exports = db;
