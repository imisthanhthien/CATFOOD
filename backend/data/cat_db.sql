-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th1 24, 2025 lúc 07:45 AM
-- Phiên bản máy phục vụ: 10.4.27-MariaDB
-- Phiên bản PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `cat_db`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `customers`
--

INSERT INTO `customers` (`id`, `name`, `email`, `phone`, `address`) VALUES
(20, 'Nguyễn Thành Thiện', 'imisthanhthien@gmail.com', '0336165737', 'Tây Ninh'),
(33, 'Nguyễn Văn Chiến', 'chiennguyenvan1992@gmail.com', '0987878985', 'Phú Thọ'),
(34, 'Trần Văn Trà', 'travantron@gmail.com', '0458789878', 'Long Biên'),
(35, 'Nguyễn Văn A', 'nguyenvana@example.com', '0901234567', 'Hà Nội, Việt Nam'),
(36, 'Trần Thị B', 'tranthib@example.com', '0902345678', 'TP. Hồ Chí Minh, Việt Nam'),
(37, 'Phạm Quang C', 'phamquangc@example.com', '0903456789', 'Đà Nẵng, Việt Nam'),
(38, 'Lê Minh D', 'leminhd@example.com', '0904567890', 'Hải Phòng, Việt Nam'),
(39, 'Vũ Thanh E', 'vuthanee@example.com', '0905678901', 'Cần Thơ, Việt Nam'),
(40, 'Bùi Hữu F', 'buihuuf@example.com', '0906789012', 'Bình Dương, Việt Nam'),
(41, 'Ngô Hạ G', 'ngohag@example.com', '0907890123', 'Nha Trang, Việt Nam'),
(42, 'Hoàng Mai H', 'hoangmaih@example.com', '0908901234', 'Quảng Ninh, Việt Nam'),
(43, 'Đoàn Văn I', 'doanvani@example.com', '0909012345', 'Lào Cai, Việt Nam'),
(44, 'Lương Hà J', 'luonghaj@example.com', '0901122334', 'Thanh Hóa, Việt Nam'),
(45, 'Trương Tấn K', 'truongtank@example.com', '0902233445', 'Hà Nam, Việt Nam'),
(46, 'Đặng Hoàng L', 'danghoangl@example.com', '0903344556', 'Vũng Tàu, Việt Nam'),
(47, 'Nguyễn Mai M', 'nguyenmaim@example.com', '0904455667', 'Quảng Bình, Việt Nam'),
(48, 'Vũ Hằng N', 'vuhangn@example.com', '0905566778', 'Lâm Đồng, Việt Nam'),
(49, 'Phan Huy O', 'phanhuyo@example.com', '0906677889', 'Đắk Lắk, Việt Nam'),
(50, 'Bùi Tài P', 'buitaip@example.com', '0907788990', 'Tây Ninh, Việt Nam'),
(51, 'Trần Hoàng Q', 'tranhoangq@example.com', '0908899001', 'Kiên Giang, Việt Nam'),
(52, 'Lê Minh R', 'leminhr@example.com', '0909900112', 'Long An, Việt Nam'),
(53, 'Nguyễn Thị S', 'nguyenthis@example.com', '0910011223', 'Cao Bằng, Việt Nam'),
(54, 'Phạm Tâm T', 'phamtamt@example.com', '0911122334', 'Lạng Sơn, Việt Nam'),
(55, 'Nguyễn Thiện', 'thiennfuyen@gmail.com', '123456789', 'Quảng Ninh'),
(60, 'Trần Văn ', 'vantran@gmail.com', '0658789754', 'Long An '),
(61, 'Em Bé', 'abcu3@gmail.com', '0787987548', 'Long An'),
(62, 'Thu Hằng', 'thuhangnguyen@gmail.com', '03364785898', 'Tây Nguyên'),
(63, 'Nguyễn Linh', 'linhkaka@gmail.com', '0984576547', '123 phú yên'),
(66, 'Có Em', '122222@gmail.com', '0336165744', 'Bình Định'),
(68, 'Ahihi', '2323@gmail.com', '0336165777', 'Vũng Tàu'),
(69, 'Thanh', 'thanh312313thien@gmail.com', '0336165234', 'Sóc Trăng'),
(70, 'Hay zo', '3233@gmail.com', '0336165888', 'Phú Quốc'),
(71, 'Không biết nói z', '333333233@gmail.com', '0336165788', 'Hà Nội'),
(75, 'Buồn của Anh', '343342@gmail.com', '0386165737', 'Lâm Đồng'),
(76, 'Nguyễn Thành Thiện', 'thanhth2222ien@gmail.com', '0336168737', 'Tây Ninh\nTây Ninh'),
(79, 'Anh Tư', '444444444@gmail.com', '0337765737', 'Tây Ninh'),
(80, 'Giấu Tên', '23233233@gmail.com', '0396165737', 'Bắc Giang'),
(81, 'Long ', 'longdz@gmail.com', '0987548568', 'Long An'),
(82, 'Linh Linh', 'linhkakfa@gmail.com', '0356897874', 'Long Biên'),
(83, 'Long Nguyen', 'longkaka@gmail.com', '0458789878', 'Long an'),
(84, 'Trần Văn Ký', 'kakaki@gmail.com', '0587898787', 'Kiên Giang'),
(85, 'MiNi', 'mini@gmail.com', '01457898785', 'Tây Nguyên');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `discounts`
--

CREATE TABLE `discounts` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `discount_type` enum('percentage','fixed') NOT NULL,
  `discount_value` int(100) NOT NULL,
  `min_purchase_amount` decimal(10,2) DEFAULT 0.00,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `discounts`
--

INSERT INTO `discounts` (`id`, `code`, `description`, `discount_type`, `discount_value`, `min_purchase_amount`, `start_date`, `end_date`, `is_active`) VALUES
(4, 'DISCOUNT10', 'Giảm 10% ', 'percentage', 10, '0.00', '2025-01-16 00:00:00', '2025-01-31 00:00:00', NULL),
(5, 'DISCOUNT6', 'Giảm 6% ', 'percentage', 6, '0.00', '2025-01-16 00:00:00', '2025-01-31 00:00:00', NULL),
(6, 'DISCOUNT4', 'Giảm 4% ', 'percentage', 4, '0.00', '2025-01-18 00:00:00', '2025-01-31 00:00:00', NULL),
(7, 'DISCOUNT5', 'Giảm 5% ', 'percentage', 5, '0.00', '2025-01-18 00:00:00', '2025-01-31 00:00:00', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `discount_product_map`
--

CREATE TABLE `discount_product_map` (
  `discount_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `discount_product_map`
--

INSERT INTO `discount_product_map` (`discount_id`, `product_id`) VALUES
(4, 3),
(4, 6),
(4, 8),
(4, 13),
(4, 19),
(4, 100),
(5, 1),
(5, 4),
(5, 10),
(5, 16),
(5, 111),
(6, 82),
(6, 90),
(6, 103),
(6, 106),
(6, 115),
(7, 86),
(7, 93),
(7, 96),
(7, 108);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(50) DEFAULT 'pending',
  `total_price` decimal(10,2) DEFAULT NULL,
  `detail_order` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `customer_id`, `order_date`, `status`, `total_price`, `detail_order`) VALUES
(23, 33, '2025-01-18 02:47:30', 'shipping', '673600.00', '[{\"id\":6,\"name\":\"Thức ăn Mèo Khô 4\",\"description\":\"Thức ăn khô bổ sung vitamin cho mèo\",\"price\":144000,\"quantity\":3,\"image\":\"images/ImageProduct/1736925630093-906998151.jpg\"},{\"id\":4,\"name\":\"Thức ăn Mèo Wet 2\",\"description\":\"Thức ăn ướt hương cá ngừ vip\",\"price\":131600,\"quantity\":1,\"image\":\"images/ImageProduct/1736925563979-225391287.jpg\"},{\"id\":11,\"name\":\"Thức ăn Mèo Wet 5\",\"description\":\"Thức ăn ướt vị tôm\",\"price\":\"110000.00\",\"quantity\":1,\"image\":\"images/ImageProduct/1736925785733-747074357.jpg\"}]'),
(24, 34, '2025-01-18 02:48:08', 'shipping', '144000.00', '[{\"id\":6,\"name\":\"Thức ăn Mèo Khô 4\",\"description\":\"Thức ăn khô bổ sung vitamin cho mèo\",\"price\":144000,\"quantity\":1,\"image\":\"images/ImageProduct/1736925630093-906998151.jpg\"}]'),
(25, 55, '2025-01-18 04:17:42', 'shipping', '85500.00', '[{\"id\":3,\"name\":\"Thức ăn Mèo Wet 1\",\"description\":\"Thức ăn ướt cho mèo con\",\"price\":85500,\"quantity\":1,\"image\":\"images/ImageProduct/1736925520532-14003239.jpg\"}]'),
(59, 20, '2025-01-19 22:09:01', 'shipping', '55000.00', '[{\"id\":2,\"name\":\"Thức ăn ướt cho mèo\",\"description\":\"Thức ăn ướt dành cho mèo con, hương vị thịt gà\",\"price\":\"55000.00\",\"quantity\":1,\"image\":\"images/ImageProduct/1736925479687-110882193.jpg\"}]'),
(60, 62, '2025-01-19 22:15:07', 'shipping', '394800.00', '[{\"id\":4,\"name\":\"Thức ăn Mèo Wet 2\",\"description\":\"Thức ăn ướt hương cá ngừ vip\",\"price\":131600,\"quantity\":3,\"image\":\"images/ImageProduct/1736925563979-225391287.jpg\"}]'),
(61, 62, '2025-01-19 22:22:29', 'shipping', '110000.00', '[{\"id\":2,\"name\":\"Thức ăn ướt cho mèo\",\"description\":\"Thức ăn ướt dành cho mèo con, hương vị thịt gà\",\"price\":\"55000.00\",\"quantity\":2,\"image\":\"images/ImageProduct/1736925479687-110882193.jpg\"}]'),
(62, 62, '2025-01-19 22:56:38', 'shipping', '85528.00', '[{\"id\":3,\"name\":\"Thức ăn Mèo Wet 1\",\"description\":\"Thức ăn ướt cho mèo con\",\"price\":85500,\"quantity\":1,\"image\":\"images/ImageProduct/1736925520532-14003239.jpg\"},{\"id\":112,\"name\":\"Snack thịt bò cho mèo\",\"description\":\"Thức ăn nhẹ thịt bò mềm mại, dễ nhai cho mèo\",\"price\":\"28.00\",\"quantity\":1,\"image\":\"images/ImageProduct/1737167981041-177640654.jpg\"}]'),
(63, 20, '2025-01-19 22:58:00', 'shipping', '1100000.00', '[{\"id\":11,\"name\":\"Thức ăn Mèo Wet 5\",\"description\":\"Thức ăn ướt vị tôm\",\"price\":\"110000.00\",\"quantity\":10,\"image\":\"images/ImageProduct/1736925785733-747074357.jpg\"}]');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_discount_map`
--

CREATE TABLE `order_discount_map` (
  `order_id` int(11) NOT NULL,
  `discount_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`, `time`) VALUES
(112, 24, 6, 1, '144000.00', '2025-01-18 02:48:20'),
(113, 23, 6, 3, '144000.00', '2025-01-18 02:48:22'),
(114, 23, 4, 1, '131600.00', '2025-01-18 02:48:22'),
(115, 23, 11, 1, '110000.00', '2025-01-18 02:48:22'),
(116, 25, 3, 1, '85500.00', '2025-01-18 04:21:03'),
(117, 61, 2, 2, '55000.00', '2025-01-19 22:23:43'),
(118, 60, 4, 3, '131600.00', '2025-01-19 22:23:45'),
(119, 59, 2, 1, '55000.00', '2025-01-19 22:23:47'),
(120, 62, 3, 1, '85500.00', '2025-01-19 22:56:57'),
(121, 62, 112, 1, '28.00', '2025-01-19 22:56:57'),
(122, 63, 11, 10, '110000.00', '2025-01-19 22:58:12');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `image` varchar(999) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `quantity`, `image`) VALUES
(1, 'Thức ăn khô cho mèo', 'Thức ăn khô dành cho mèo trưởng thành, hương vị cá hồi', '45000.00', 24, 'images/ImageProduct/1736925450121-693753951.jpg'),
(2, 'Thức ăn ướt cho mèo', 'Thức ăn ướt dành cho mèo con, hương vị thịt gà', '55000.00', 17, 'images/ImageProduct/1736925479687-110882193.jpg'),
(3, 'Whiskas Thức Ăn Ướt Cho Mèo', 'Thức ăn ướt cho mèo con', '95000.00', 42, 'images/ImageProduct/1736925520532-14003239.jpg'),
(4, 'Royal Canin Thức Ăn Ướt Cho Mèo', 'Thức ăn ướt hương cá ngừ vip', '140000.00', 26, 'images/ImageProduct/1736925563979-225391287.jpg'),
(5, 'Thức ăn Mèo Khô 3', 'Thức ăn khô cho mèo có nhu cầu đặc biệt', '200000.00', 45, 'images/ImageProduct/1736925604101-125340236.jpg'),
(6, 'Thức ăn Mèo Khô 4', 'Thức ăn khô bổ sung vitamin cho mèo', '160000.00', 4, 'images/ImageProduct/1736925630093-906998151.jpg'),
(7, 'Thức ăn Mèo Wet 3', 'Thức ăn ướt vị gà', '504000.00', 8, 'images/ImageProduct/1736925670404-183957208.jpg'),
(8, 'Thức ăn Mèo Wet 4', 'Thức ăn ướt cho mèo có vấn đề về tiêu hóa', '100000.00', 18, 'images/ImageProduct/1736925707733-11896463.jpg'),
(9, 'Thức ăn Mèo Khô 5', 'Thức ăn khô cho mèo có độ tuổi trung bình', '190000.00', 10, 'images/ImageProduct/1736925730683-310064958.jpg'),
(10, 'Thức ăn Mèo Khô 6', 'Thức ăn khô cho mèo trưởng thành', '210000.00', 13, 'images/ImageProduct/1736925747930-110578932.jpg'),
(11, 'Thức ăn Mèo Wet 5', 'Thức ăn ướt vị tôm', '110000.00', 7, 'images/ImageProduct/1736925785733-747074357.jpg'),
(12, 'Thức ăn Mèo Wet 6', 'Thức ăn ướt dành cho mèo bị dị ứng', '125000.00', 58, 'images/ImageProduct/1736925816938-9241179.jpg'),
(13, 'Thức ăn Mèo Khô 7', 'Thức ăn khô vị thịt bò', '140000.00', 18, 'images/ImageProduct/1736925919211-981273565.jpg'),
(14, 'Thức ăn Mèo Khô 8', 'Thức ăn khô cho mèo ngoại quốc', '230000.00', 50, 'images/ImageProduct/1736925955404-654566928.jpg'),
(15, 'Thức ăn Mèo Wet 7', 'Thức ăn ướt vị vịt', '140000.00', 9, 'images/ImageProduct/1736925989748-719731676.jpg'),
(16, 'Thức ăn Mèo Wet 8', 'Thức ăn ướt cho mèo có tình trạng thừa cân', '150000.00', 13, 'images/ImageProduct/1736926014291-488039540.jpg'),
(17, 'Thức ăn Mèo Khô 9', 'Thức ăn khô bổ sung collagen cho da lông', '201000.00', 70, 'images/ImageProduct/1736926053866-263186.jpg'),
(18, 'Thức ăn Mèo Khô 10', 'Thức ăn khô cho mèo có nhu cầu dinh dưỡng cao', '450000.00', 10, 'images/ImageProduct/1736926154757-699915029.jpg'),
(19, 'Thức ăn Mèo Wet 9', 'Thức ăn ướt cho mèo già', '100000.00', 5, 'images/ImageProduct/1736926158647-775294478.jpg'),
(20, 'Thức ăn Mèo Wet 10', 'Thức ăn ướt vị cá hồi', '301000.00', 25, 'images/ImageProduct/1736926163281-534738182.jpg'),
(79, 'Royal Canin Feline Health Nutrition', 'Thức ăn cho mèo trưởng thành cung cấp dinh dưỡng hoàn hảo.', '350000.00', 50, 'images/ImageProduct/1737165759082-176572475.jpg'),
(80, 'Hill\'s Science Diet Adult', 'Thức ăn dinh dưỡng cho mèo trưởng thành với thành phần cao cấp.', '400000.00', 60, 'images/ImageProduct/1737165767712-491712975.jpg'),
(81, 'Iams ProActive Health', 'Giúp duy trì sức khỏe và tăng cường hệ miễn dịch cho mèo trưởng thành.', '250000.00', 40, 'images/ImageProduct/1737165776047-716851700.jpg'),
(82, 'Orijen Cat & Kitten', 'Thức ăn dinh dưỡng tự nhiên với protein từ thịt tươi ', '800000.00', 30, 'images/ImageProduct/1737165784119-864368807.jpg'),
(83, 'Acana Indoor Entrée', 'Cung cấp dinh dưỡng từ thịt gà và cá cho mèo trong nhà.', '600000.00', 45, 'images/ImageProduct/1737165793748-58547067.jpg'),
(84, 'Purina Pro Plan Savor', 'Thức ăn dinh dưỡng giúp hỗ trợ hệ tiêu hóa và tăng cường miễn dịch', '350000.00', 70, 'images/ImageProduct/1737165808911-417259779.jpg'),
(85, 'Wellness CORE Grain-Free', 'Thức ăn dinh dưỡng không chứa ngũ cốc, giàu protein ', '550000.00', 50, 'images/ImageProduct/1737165816557-896458924.jpg'),
(86, 'Blue Buffalo Wilderness', 'Giàu protein và dinh dưỡng từ cá cho mèo con và trưởng thành.', '650000.00', 60, 'images/ImageProduct/1737165901035-702075867.jpg'),
(87, 'Natural Balance L.I.D. Limited Ingredient Diets', 'Thức ăn cho mèo dễ tiêu hóa, giảm dị ứng thực phẩm.', '700000.00', 35, 'images/ImageProduct/1737165907977-603486156.jpg'),
(88, 'Merrick Purrfect Bistro', 'Cung cấp dinh dưỡng cao cấp cho mèo trưởng thành', '450000.00', 50, 'images/ImageProduct/1737165913134-175720456.jpg'),
(89, 'Royal Canin Mother & Babycat', 'Thức ăn bổ sinh cho mèo mẹ và mèo con', '450000.00', 50, 'images/ImageProduct/1737166591436-970479406.jpg'),
(90, 'Science Diet Adult Optimal Care', 'Giúp duy trì sức khỏe sinh sản và sức khỏe ', '500000.00', 40, 'images/ImageProduct/1737166599532-616185103.jpg'),
(91, 'Iams ProActive Health Indoor Weight & Hairball Care', 'Cung cấp dinh dưỡng giúp duy trì sức khỏe sinh sản ', '350000.00', 60, 'images/ImageProduct/1737166947277-715848421.jpg'),
(92, 'Orijen Original Dry Cat Food', 'Cung cấp dinh dưỡng bổ sung cho mèo mẹ ', '800000.00', 30, 'images/ImageProduct/1737166983120-59028380.jpg'),
(93, 'Acana Wild Prairie', 'Giúp mèo duy trì sức khỏe sinh sản, bổ sung dưỡng chất từ thịt gà', '600000.00', 45, 'images/ImageProduct/1737166888838-820507709.jpg'),
(94, 'Purina Pro Plan Focus Urinary Tract Health', 'Thức ăn hỗ trợ sức khỏe sinh lý của mèo', '350000.00', 70, 'images/ImageProduct/1737166881744-346273728.jpg'),
(95, 'Wellness CORE RawRev', 'Thức ăn dinh dưỡng bổ sung giúp tăng cường sức khỏe sinh sản', '650000.00', 50, 'images/ImageProduct/1737166873632-53895925.jpg'),
(96, 'Blue Buffalo Natural Veterinary Diet', 'Giúp hỗ trợ sức khỏe sinh lý và cải thiện chế độ ăn uống ', '750000.00', 60, 'images/ImageProduct/1737166868961-854129985.jpg'),
(97, 'Natural Balance Fat Cats', 'Cung cấp chế độ dinh dưỡng hỗ trợ sức khỏe sinh sản ', '700000.00', 35, 'images/ImageProduct/1737166863939-113431020.jpg'),
(98, 'Merrick Grain-Free Healthy Weight', 'Thức ăn bổ sinh giúp mèo duy trì sức khỏe sinh lý', '500000.00', 50, 'images/ImageProduct/1737166857238-347530945.jpg'),
(99, 'Whiskas Temptations Mix-ups', 'Thức ăn hỗn hợp với vị thịt và cá', '150000.00', 80, 'images/ImageProduct/1737167466527-795489604.jpg'),
(100, 'Friskies Mix', 'Hỗn hợp thức ăn cho mèo với các hương vị thịt gà', '130000.00', 100, 'images/ImageProduct/1737167471102-85709789.jpg'),
(101, 'Hill\'s Science Diet Adult Sensitive Stomach & Skin', 'Thức ăn hỗn hợp dành cho mèo trưởng thành', '550000.00', 50, 'images/ImageProduct/1737167475782-675411874.jpg'),
(102, 'Purina ONE SmartBlend Healthy Metabolism', 'Hỗn hợp thức ăn hỗ trợ cân nặng và duy trì sức khỏe', '420000.00', 60, 'images/ImageProduct/1737167480703-213225908.jpg'),
(103, 'Royal Canin Instinctive', 'Hỗn hợp thức ăn với công thức phù hợp cho mèo trưởng thành', '600000.00', 40, 'images/ImageProduct/1737167487522-532856711.jpg'),
(104, 'Iams ProActive Health Healthy Adult', 'Thức ăn hỗn hợp cho mèo trưởng thành', '450000.00', 55, 'images/ImageProduct/1737167514055-53834298.jpg'),
(105, 'Acana Singles + Wholesome Grains', 'Hỗn hợp thức ăn dinh dưỡng giúp hỗ trợ sức khỏe đường ruột', '700000.00', 35, 'images/ImageProduct/1737167507875-659938800.jpg'),
(106, 'Orijen Six Fish Dry Cat Food', 'Hỗn hợp thức ăn dinh dưỡng, giàu protein từ cá', '850000.00', 25, 'images/ImageProduct/1737167502646-462305650.jpg'),
(107, 'Wellness CORE Grain-Free', 'Hỗn hợp thức ăn hỗ trợ sức khỏe tiêu hóa', '650000.00', 45, 'images/ImageProduct/1737167497792-233462467.jpg'),
(108, 'Natural Balance L.I.D. Limited Ingredient Diets', 'Thức ăn hỗn hợp dành cho mèo đặc biệt.', '500000.00', 50, 'images/ImageProduct/1737167492129-678899059.jpg'),
(109, 'Snack cá ngừ cho mèo', 'Thức ăn nhẹ với cá ngừ tươi ngon cho mèo', '250000.00', 100, 'images/ImageProduct/1737167933261-937254464.jpg'),
(110, 'Bánh quy gà cho mèo', 'Bánh quy giòn với hương vị gà cho mèo', '200000.00', 150, 'images/ImageProduct/1737167949977-338696206.jpg'),
(111, 'Snack cá hồi cho mèo', 'Cá hồi tươi ngon, bổ sung dinh dưỡng cho mèo', '300000.00', 120, 'images/ImageProduct/1737167974455-705633170.jpg'),
(112, 'Snack thịt bò cho mèo', 'Thức ăn nhẹ thịt bò mềm mại, dễ nhai cho mèo', '280000.00', 89, 'images/ImageProduct/1737167981041-177640654.jpg'),
(113, 'Thịt gà nướng cho mèo', 'Gà nướng thơm ngon cho mèo, giàu protein', '350000.00', 110, 'images/ImageProduct/1737167988344-790512720.jpg'),
(114, 'Snack tôm cho mèo', 'Tôm tươi ngon, cung cấp dinh dưỡng cho mèo', '330000.00', 80, 'images/ImageProduct/1737168023694-140712652.jpg'),
(115, 'Bánh quy cá ngừ cho mèo', 'Bánh quy với cá ngừ cho mèo yêu thích', '220000.00', 130, 'images/ImageProduct/1737168014287-831549731.jpg'),
(116, 'Snack thịt cừu cho mèo', 'Thịt cừu tươi ngon, bổ sung vitamin cho mèo', '270000.00', 95, 'images/ImageProduct/1737168008877-712264229.jpg'),
(117, 'Snack gà xé cho mèo', 'Gà xé sợi, dễ ăn cho mèo', '240000.00', 140, 'images/ImageProduct/1737168003914-858888159.jpg'),
(118, 'Snack cá mòi cho mèo', 'Cá mòi tươi cho mèo, giúp da và lông khỏe mạnh', '350000.00', 100, 'images/ImageProduct/1737167999365-15897380.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_categories`
--

CREATE TABLE `product_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product_categories`
--

INSERT INTO `product_categories` (`id`, `name`) VALUES
(1, 'Thức ăn khô'),
(2, 'Thức ăn ướt'),
(3, 'Bổ sung dinh dưỡng '),
(13, 'Thức ăn bổ sung'),
(14, 'Thức ăn hỗn hợp'),
(15, 'Thức ăn nhẹ');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_category_map`
--

CREATE TABLE `product_category_map` (
  `product_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product_category_map`
--

INSERT INTO `product_category_map` (`product_id`, `category_id`) VALUES
(1, 1),
(2, 2),
(3, 2),
(4, 2),
(5, 1),
(7, 2),
(8, 2),
(9, 1),
(10, 1),
(11, 2),
(12, 2),
(13, 1),
(14, 1),
(15, 2),
(16, 2),
(17, 1),
(18, 1),
(19, 2),
(20, 2),
(6, 1),
(79, 3),
(80, 3),
(81, 3),
(82, 3),
(83, 3),
(84, 3),
(85, 3),
(86, 3),
(87, 3),
(88, 3),
(89, 13),
(90, 13),
(91, 13),
(93, 13),
(95, 13),
(96, 13),
(97, 13),
(98, 13),
(92, 13),
(94, 13),
(99, 14),
(100, 14),
(101, 14),
(102, 14),
(103, 14),
(104, 14),
(105, 14),
(106, 14),
(107, 14),
(108, 14),
(109, 15),
(110, 15),
(111, 15),
(112, 15),
(113, 15),
(114, 15),
(115, 15),
(116, 15),
(117, 15),
(118, 15);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vouchers`
--

CREATE TABLE `vouchers` (
  `id` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `discount_percentage` decimal(5,2) DEFAULT NULL,
  `discount_amount` decimal(10,2) DEFAULT NULL,
  `min_order_amount` decimal(10,2) NOT NULL,
  `expiration_date` date DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `max_discount_amount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `vouchers`
--

INSERT INTO `vouchers` (`id`, `code`, `discount_percentage`, `discount_amount`, `min_order_amount`, `expiration_date`, `status`, `max_discount_amount`) VALUES
(1, 'NEW50K', '0.00', '50000.00', '300000.00', '2025-06-21', 'active', '0.00'),
(2, 'NEW30PERCENT', '30.00', '0.00', '300000.00', '2025-06-21', 'active', '100000.00'),
(11, '10PERCENT', '10.00', '0.00', '400000.00', '2025-03-21', 'active', '50000.00'),
(12, '15PERCENT', '15.00', '0.00', '100000.00', '2025-03-22', 'active', '300000.00'),
(13, '15PERCENT1', '15.00', '0.00', '60000.00', '2025-04-19', 'active', '30000.00'),
(14, 'G15K', '0.00', '15000.00', '50000.00', '2025-03-22', 'active', '0.00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `voucher_customer`
--

CREATE TABLE `voucher_customer` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `voucher_id` int(11) NOT NULL,
  `applied_date` datetime DEFAULT current_timestamp(),
  `status` varchar(20) DEFAULT 'unused'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `voucher_customer`
--

INSERT INTO `voucher_customer` (`id`, `customer_id`, `voucher_id`, `applied_date`, `status`) VALUES
(1, 80, 2, '2025-01-21 11:28:45', 'unused'),
(2, 80, 1, '2025-01-21 11:28:45', 'unused'),
(4, 81, 2, '2025-01-21 11:30:40', 'unused'),
(5, 81, 1, '2025-01-21 11:30:40', 'unused'),
(6, 82, 2, '2025-01-22 09:08:52', 'unused'),
(7, 83, 2, '2025-01-22 09:18:21', 'unused'),
(8, 84, 2, '2025-01-22 09:22:45', 'used'),
(9, 84, 1, '2025-01-22 09:22:45', 'used'),
(11, 85, 2, '2025-01-22 16:58:54', 'used'),
(12, 85, 1, '2025-01-22 16:58:54', 'used'),
(139, 20, 11, '2025-01-23 10:09:59', 'unused'),
(140, 33, 11, '2025-01-23 10:09:59', 'unused'),
(141, 34, 11, '2025-01-23 10:09:59', 'unused'),
(142, 35, 11, '2025-01-23 10:09:59', 'unused'),
(143, 36, 11, '2025-01-23 10:09:59', 'unused'),
(144, 37, 11, '2025-01-23 10:09:59', 'unused'),
(145, 38, 11, '2025-01-23 10:09:59', 'unused'),
(146, 39, 11, '2025-01-23 10:09:59', 'unused'),
(147, 40, 11, '2025-01-23 10:09:59', 'unused'),
(148, 41, 11, '2025-01-23 10:09:59', 'unused'),
(149, 42, 11, '2025-01-23 10:09:59', 'unused'),
(150, 43, 11, '2025-01-23 10:09:59', 'unused'),
(151, 44, 11, '2025-01-23 10:09:59', 'unused'),
(152, 45, 11, '2025-01-23 10:09:59', 'unused'),
(153, 46, 11, '2025-01-23 10:09:59', 'unused'),
(154, 47, 11, '2025-01-23 10:09:59', 'unused'),
(155, 48, 11, '2025-01-23 10:09:59', 'unused'),
(156, 49, 11, '2025-01-23 10:09:59', 'unused'),
(157, 50, 11, '2025-01-23 10:09:59', 'unused'),
(158, 51, 11, '2025-01-23 10:09:59', 'unused'),
(159, 52, 11, '2025-01-23 10:09:59', 'unused'),
(160, 53, 11, '2025-01-23 10:09:59', 'unused'),
(161, 54, 11, '2025-01-23 10:09:59', 'unused'),
(162, 55, 11, '2025-01-23 10:09:59', 'unused'),
(163, 60, 11, '2025-01-23 10:09:59', 'unused'),
(164, 61, 11, '2025-01-23 10:09:59', 'unused'),
(165, 62, 11, '2025-01-23 10:09:59', 'unused'),
(166, 63, 11, '2025-01-23 10:09:59', 'unused'),
(167, 66, 11, '2025-01-23 10:09:59', 'unused'),
(168, 68, 11, '2025-01-23 10:09:59', 'unused'),
(169, 69, 11, '2025-01-23 10:09:59', 'unused'),
(170, 70, 11, '2025-01-23 10:09:59', 'unused'),
(171, 71, 11, '2025-01-23 10:09:59', 'unused'),
(172, 75, 11, '2025-01-23 10:09:59', 'unused'),
(173, 76, 11, '2025-01-23 10:09:59', 'unused'),
(174, 79, 11, '2025-01-23 10:09:59', 'unused'),
(175, 80, 11, '2025-01-23 10:09:59', 'unused'),
(176, 81, 11, '2025-01-23 10:09:59', 'unused'),
(177, 82, 11, '2025-01-23 10:09:59', 'unused'),
(178, 83, 11, '2025-01-23 10:09:59', 'unused'),
(179, 84, 11, '2025-01-23 10:09:59', 'unused'),
(180, 85, 11, '2025-01-23 10:09:59', 'unused'),
(181, 20, 12, '2025-01-23 10:14:18', 'unused'),
(182, 33, 12, '2025-01-23 10:14:18', 'unused'),
(183, 34, 12, '2025-01-23 10:14:18', 'unused'),
(184, 35, 12, '2025-01-23 10:14:18', 'unused'),
(185, 36, 12, '2025-01-23 10:14:18', 'unused'),
(186, 37, 12, '2025-01-23 10:14:18', 'unused'),
(187, 38, 12, '2025-01-23 10:14:18', 'unused'),
(188, 39, 12, '2025-01-23 10:14:18', 'unused'),
(189, 40, 12, '2025-01-23 10:14:18', 'unused'),
(190, 41, 12, '2025-01-23 10:14:18', 'unused'),
(191, 42, 12, '2025-01-23 10:14:18', 'unused'),
(192, 43, 12, '2025-01-23 10:14:18', 'unused'),
(193, 44, 12, '2025-01-23 10:14:18', 'unused'),
(194, 45, 12, '2025-01-23 10:14:18', 'unused'),
(195, 46, 12, '2025-01-23 10:14:18', 'unused'),
(196, 47, 12, '2025-01-23 10:14:18', 'unused'),
(197, 48, 12, '2025-01-23 10:14:18', 'unused'),
(198, 49, 12, '2025-01-23 10:14:18', 'unused'),
(199, 50, 12, '2025-01-23 10:14:18', 'unused'),
(200, 51, 12, '2025-01-23 10:14:18', 'unused'),
(201, 52, 12, '2025-01-23 10:14:18', 'unused'),
(202, 53, 12, '2025-01-23 10:14:18', 'unused'),
(203, 54, 12, '2025-01-23 10:14:18', 'unused'),
(204, 55, 12, '2025-01-23 10:14:18', 'unused'),
(205, 60, 12, '2025-01-23 10:14:18', 'unused'),
(206, 61, 12, '2025-01-23 10:14:18', 'unused'),
(207, 62, 12, '2025-01-23 10:14:18', 'unused'),
(208, 63, 12, '2025-01-23 10:14:18', 'unused'),
(209, 66, 12, '2025-01-23 10:14:18', 'unused'),
(210, 68, 12, '2025-01-23 10:14:18', 'unused'),
(211, 69, 12, '2025-01-23 10:14:18', 'unused'),
(212, 70, 12, '2025-01-23 10:14:18', 'unused'),
(213, 71, 12, '2025-01-23 10:14:18', 'unused'),
(214, 75, 12, '2025-01-23 10:14:18', 'unused'),
(215, 76, 12, '2025-01-23 10:14:18', 'unused'),
(216, 79, 12, '2025-01-23 10:14:18', 'unused'),
(217, 80, 12, '2025-01-23 10:14:18', 'unused'),
(218, 81, 12, '2025-01-23 10:14:18', 'unused'),
(219, 82, 12, '2025-01-23 10:14:18', 'unused'),
(220, 83, 12, '2025-01-23 10:14:18', 'unused'),
(221, 84, 12, '2025-01-23 10:14:18', 'unused'),
(222, 85, 12, '2025-01-23 10:14:18', 'unused'),
(223, 20, 13, '2025-01-23 10:15:18', 'unused'),
(224, 33, 13, '2025-01-23 10:15:18', 'unused'),
(225, 34, 13, '2025-01-23 10:15:18', 'unused'),
(226, 35, 13, '2025-01-23 10:15:18', 'unused'),
(227, 36, 13, '2025-01-23 10:15:18', 'unused'),
(228, 37, 13, '2025-01-23 10:15:18', 'unused'),
(229, 38, 13, '2025-01-23 10:15:18', 'unused'),
(230, 39, 13, '2025-01-23 10:15:18', 'unused'),
(231, 40, 13, '2025-01-23 10:15:18', 'unused'),
(232, 41, 13, '2025-01-23 10:15:18', 'unused'),
(233, 42, 13, '2025-01-23 10:15:18', 'unused'),
(234, 43, 13, '2025-01-23 10:15:18', 'unused'),
(235, 44, 13, '2025-01-23 10:15:18', 'unused'),
(236, 45, 13, '2025-01-23 10:15:18', 'unused'),
(237, 46, 13, '2025-01-23 10:15:18', 'unused'),
(238, 47, 13, '2025-01-23 10:15:18', 'unused'),
(239, 48, 13, '2025-01-23 10:15:18', 'unused'),
(240, 49, 13, '2025-01-23 10:15:18', 'unused'),
(241, 50, 13, '2025-01-23 10:15:18', 'unused'),
(242, 51, 13, '2025-01-23 10:15:18', 'unused'),
(243, 52, 13, '2025-01-23 10:15:18', 'unused'),
(244, 53, 13, '2025-01-23 10:15:18', 'unused'),
(245, 54, 13, '2025-01-23 10:15:18', 'unused'),
(246, 55, 13, '2025-01-23 10:15:18', 'unused'),
(247, 60, 13, '2025-01-23 10:15:18', 'unused'),
(248, 61, 13, '2025-01-23 10:15:18', 'unused'),
(249, 62, 13, '2025-01-23 10:15:18', 'unused'),
(250, 63, 13, '2025-01-23 10:15:18', 'unused'),
(251, 66, 13, '2025-01-23 10:15:18', 'unused'),
(252, 68, 13, '2025-01-23 10:15:18', 'unused'),
(253, 69, 13, '2025-01-23 10:15:18', 'unused'),
(254, 70, 13, '2025-01-23 10:15:18', 'unused'),
(255, 71, 13, '2025-01-23 10:15:18', 'unused'),
(256, 75, 13, '2025-01-23 10:15:18', 'unused'),
(257, 76, 13, '2025-01-23 10:15:18', 'unused'),
(258, 79, 13, '2025-01-23 10:15:18', 'unused'),
(259, 80, 13, '2025-01-23 10:15:18', 'unused'),
(260, 81, 13, '2025-01-23 10:15:18', 'unused'),
(261, 82, 13, '2025-01-23 10:15:18', 'unused'),
(262, 83, 13, '2025-01-23 10:15:18', 'unused'),
(263, 84, 13, '2025-01-23 10:15:18', 'unused'),
(264, 85, 13, '2025-01-23 10:15:18', 'unused'),
(265, 20, 14, '2025-01-23 10:16:35', 'unused'),
(266, 33, 14, '2025-01-23 10:16:35', 'unused'),
(267, 34, 14, '2025-01-23 10:16:35', 'unused'),
(268, 35, 14, '2025-01-23 10:16:35', 'unused'),
(269, 36, 14, '2025-01-23 10:16:35', 'unused'),
(270, 37, 14, '2025-01-23 10:16:35', 'unused'),
(271, 38, 14, '2025-01-23 10:16:35', 'unused'),
(272, 39, 14, '2025-01-23 10:16:35', 'unused'),
(273, 40, 14, '2025-01-23 10:16:35', 'unused'),
(274, 41, 14, '2025-01-23 10:16:35', 'unused'),
(275, 42, 14, '2025-01-23 10:16:35', 'unused'),
(276, 43, 14, '2025-01-23 10:16:35', 'unused'),
(277, 44, 14, '2025-01-23 10:16:35', 'unused'),
(278, 45, 14, '2025-01-23 10:16:35', 'unused'),
(279, 46, 14, '2025-01-23 10:16:35', 'unused'),
(280, 47, 14, '2025-01-23 10:16:35', 'unused'),
(281, 48, 14, '2025-01-23 10:16:35', 'unused'),
(282, 49, 14, '2025-01-23 10:16:35', 'unused'),
(283, 50, 14, '2025-01-23 10:16:35', 'unused'),
(284, 51, 14, '2025-01-23 10:16:35', 'unused'),
(285, 52, 14, '2025-01-23 10:16:35', 'unused'),
(286, 53, 14, '2025-01-23 10:16:35', 'unused'),
(287, 54, 14, '2025-01-23 10:16:35', 'unused'),
(288, 55, 14, '2025-01-23 10:16:35', 'unused'),
(289, 60, 14, '2025-01-23 10:16:35', 'unused'),
(290, 61, 14, '2025-01-23 10:16:35', 'unused'),
(291, 62, 14, '2025-01-23 10:16:35', 'unused'),
(292, 63, 14, '2025-01-23 10:16:35', 'unused'),
(293, 66, 14, '2025-01-23 10:16:35', 'unused'),
(294, 68, 14, '2025-01-23 10:16:35', 'unused'),
(295, 69, 14, '2025-01-23 10:16:35', 'unused'),
(296, 70, 14, '2025-01-23 10:16:35', 'unused'),
(297, 71, 14, '2025-01-23 10:16:35', 'unused'),
(298, 75, 14, '2025-01-23 10:16:35', 'unused'),
(299, 76, 14, '2025-01-23 10:16:35', 'unused'),
(300, 79, 14, '2025-01-23 10:16:35', 'unused'),
(301, 80, 14, '2025-01-23 10:16:35', 'unused'),
(302, 81, 14, '2025-01-23 10:16:35', 'unused'),
(303, 82, 14, '2025-01-23 10:16:35', 'unused'),
(304, 83, 14, '2025-01-23 10:16:35', 'unused'),
(305, 84, 14, '2025-01-23 10:16:35', 'used'),
(306, 85, 14, '2025-01-23 10:16:35', 'unused');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Chỉ mục cho bảng `discounts`
--
ALTER TABLE `discounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Chỉ mục cho bảng `discount_product_map`
--
ALTER TABLE `discount_product_map`
  ADD PRIMARY KEY (`discount_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Chỉ mục cho bảng `order_discount_map`
--
ALTER TABLE `order_discount_map`
  ADD PRIMARY KEY (`order_id`,`discount_id`),
  ADD KEY `discount_id` (`discount_id`);

--
-- Chỉ mục cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `product_category_map`
--
ALTER TABLE `product_category_map`
  ADD KEY `product_id` (`product_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Chỉ mục cho bảng `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Chỉ mục cho bảng `voucher_customer`
--
ALTER TABLE `voucher_customer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `voucher_id` (`voucher_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT cho bảng `discounts`
--
ALTER TABLE `discounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT cho bảng `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT cho bảng `product_categories`
--
ALTER TABLE `product_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `voucher_customer`
--
ALTER TABLE `voucher_customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=307;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `discount_product_map`
--
ALTER TABLE `discount_product_map`
  ADD CONSTRAINT `discount_product_map_ibfk_1` FOREIGN KEY (`discount_id`) REFERENCES `discounts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `discount_product_map_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`);

--
-- Các ràng buộc cho bảng `order_discount_map`
--
ALTER TABLE `order_discount_map`
  ADD CONSTRAINT `order_discount_map_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_discount_map_ibfk_2` FOREIGN KEY (`discount_id`) REFERENCES `discounts` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `product_category_map`
--
ALTER TABLE `product_category_map`
  ADD CONSTRAINT `product_category_map_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `product_category_map_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `product_categories` (`id`);

--
-- Các ràng buộc cho bảng `voucher_customer`
--
ALTER TABLE `voucher_customer`
  ADD CONSTRAINT `voucher_customer_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  ADD CONSTRAINT `voucher_customer_ibfk_2` FOREIGN KEY (`voucher_id`) REFERENCES `vouchers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
