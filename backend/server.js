const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const productRouter = require('./routers/productRouter.jsx');
const oderRouter = require('./routers/oderRouter.jsx');
const oderItemRouter = require('./routers/oderItemRouter.jsx');
const customerRouter = require('./routers/customerRouter.jsx');
const categorieRouterr = require('./routers/categorieRouter.jsx');
const category_mapRouter = require('./routers/category_mapRouter.jsx');
const discountRouter = require('./routers/discountRouter.jsx');
const discountProductMapRouter = require('./routers/discountProductMapRouter.jsx');
const orderDiscountMapRouter = require('./routers/orderDiscountMapRouter.jsx');
const statisticsRoutes = require("./routers/statisticsRoutes.jsx");


const app = express();

app.use(cors());
app.use(express.json());

app.use('/products', productRouter);
app.use('/customers', customerRouter);
app.use('/orders', oderRouter);
app.use('/order_items', oderItemRouter);
app.use('/categories', categorieRouterr);
app.use('/category-map', category_mapRouter);
app.use('/discounts', discountRouter);
app.use('/discount-products', discountProductMapRouter);
app.use('/order-discount-maps', orderDiscountMapRouter);
app.use("/statistics", statisticsRoutes);

app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

const imagesDir = path.join(__dirname, 'public', 'images', 'ImageProduct');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagesDir); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); 
    }
});

const fileFilter = (req, file, cb) => {
    cb(null, true);  
};

const upload = multer({
    storage: imageStorage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } 
});

//upload ảnh lên server
app.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        console.log("Ảnh đã được tải lên:", req.file); 
        res.json({ imagePath: `images/ImageProduct/${req.file.filename}` }); 
    } else {
        console.error("Không có file ảnh được upload");
        res.status(400).json({ error: 'Không có file ảnh được upload' });  
    }
});

app.listen(8081, () => {
    console.log("Server is running on port 8081");
});
