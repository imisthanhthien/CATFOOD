-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th1 24, 2025 lúc 05:40 AM
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

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
