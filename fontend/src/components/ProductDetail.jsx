import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AddProduct } from '../GioHang/cart';
import useProducts from '../hooks/useProducts';
import useDiscountProduct from '../hooks/useDiscountProduct';

const ProductDetail = () => {
  const { id } = useParams();
  const { product, productLoading, productError, fetchProductById, products } = useProducts();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [randomProducts, setRandomProducts] = useState([]);
  const [discountValue, setDiscountValue] = useState(null);
  const [discountValueram, setDiscountValueram] = useState([]);
  const { getProductsByDiscountId } = useDiscountProduct();
  const [totalPrice, setTotalPrice] = useState(0); 

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const fetchDiscountValue = async () => {
      if (id) {

        const value = await getProductsByDiscountId(id);
        setDiscountValue(value);
      }
    };
    fetchDiscountValue();
  }, [id]);


  useEffect(() => {
    const fetchDiscountValues = async () => {
      const productIds = randomProducts.map(product => product.id);

      if (productIds) {
        try {
          const discountData = [];
          for (const id of productIds) {
            const value = await getProductsByDiscountId(id);
            discountData.push({ productId: id, discountValue: value || 0 });
          }
          setDiscountValueram(discountData);
        } catch (error) {
          console.error("Error fetching discount values:", error);
        }
      }
    };

    fetchDiscountValues();
  }, [randomProducts]);

  useEffect(() => {
    if (product) {
      // Cập nhật tổng giá khi sản phẩm hoặc số lượng thay đổi
      const discountedPrice = calculateDiscountedPrice(product.price);
      setTotalPrice(discountedPrice * quantity);
    }
  }, [product, quantity, discountValue]);


  const toggleInfo = () => {
    setIsOpen(!isOpen);
  };

  const toggleShipping = () => setIsShippingOpen(!isShippingOpen);
  useEffect(() => {
    fetchProductById(id);


  }, [id]);

  useEffect(() => {
    if (products && products.length > 0) {
      const shuffled = [...products].sort(() => 0.5 - Math.random()); // Xáo trộn sản phẩm
      setRandomProducts(shuffled.slice(0, 7)); // Lấy 7 sản phẩm đầu tiên
    }
  }, [products]);
  if (productLoading) return <p className="text-center text-xl text-gray-600">Đang tải dữ liệu sản phẩm...</p>;
  if (productError) return <p className="text-center text-xl text-red-600">{productError}</p>;
  if (!product) return <p className="text-center text-xl text-gray-600">Sản phẩm không tồn tại.</p>;

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrement = () => {
    if (quantity < product.quantity) setQuantity(quantity + 1);
    else alert("Số lượng sản phẩm không đủ");
  };

  const handleAddToCart = () => {
    let price = product.price;

    // Kiểm tra xem có giảm giá không
    if (discountValue) {
      const discountAmount = (product.price * parseFloat(discountValue)) / 100;
      price = product.price - discountAmount;
    }

    const productToAdd = { ...product, quantity, price };
    // Thêm sản phẩm vào giỏ hàng
    dispatch(AddProduct(productToAdd));

     // Hiển thị thông báo thành công
     setShowSuccessMessage(true);

     // Ẩn thông báo sau 2 giây
     setTimeout(() => {
         setShowSuccessMessage(false);
     }, 2000);
   
  };

  const calculateDiscountedPrice = (price) => {
    if (discountValue) {
      const discountAmount = (price * parseFloat(discountValue)) / 100;
      return price - discountAmount;
    }
    return price;
  };

  const calculateDiscountedPriceram = (price) => {
    if (discountValueram && discountValueram.length > 0) {
      // Lấy giá trị giảm giá đầu tiên từ discountValueram
      const discountValue = discountValueram[0]?.discountValue;

      if (discountValue) {
        const discountAmount = (price * parseFloat(discountValue)) / 100;
        return price - discountAmount;
      }
    }
    return price; // Nếu không có giảm giá, trả về giá gốc
  };

  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Hình ảnh sản phẩm */}
          <div className="   w-full md:w-1/2 flex justify-center items-center relative">
            <img
              src={`http://localhost:8081/${product.image}`}
              alt={product.name}
              className="w-full max-w-md h-auto object-contain rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
              onError={(e) => {
                e.target.src = 'http://localhost:8081/images/ImageProduct/default.jpg';
              }}
            />
            {/* Nếu có giảm giá, hiển thị nhãn giảm giá */}
            {discountValue && (
              <div className="absolute  bottom-[450px] right-20 bg-gradient-to-r
               from-red-500 to-pink-500 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg 
                hover:scale-110 hover:opacity-100 transition-all duration-500 ease-in-out hover:shadow-2xl hover:shadow-pink-500/50 hover:ring-2 hover:ring-pink-300 hover:ring-opacity-50 z-10">
                Giảm {discountValue} %
              </div>
            )}
          </div>

          {/* Chi tiết sản phẩm */}
          <div className="w-full md:w-1/2 space-y-6 flex flex-col justify-between">
            {/* Tên sản phẩm */}
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight uppercase">{product.name}</h1>

            {/* Mô tả sản phẩm */}
            <span className="text-lg font-serif text-gray-700 leading-relaxed hover:text-gray-900 transition-all duration-300 ease-in-out">{product.description}</span>
            {/* Số lượng sản phẩm */}
            <p className="mt-2 text-lg font-medium text-gray-600">Số lượng tồn kho: <span className="text-xl text-black-600 font-semibold">{product.quantity}</span></p>


            <p className="flex flex-col items-start">
  {/* Nếu có giảm giá, hiển thị giá cũ bị gạch đi */}
  {discountValue ? (
    <>
      <span className="text-gray-400 line-through mr-2">
        Giá gốc: {new Intl.NumberFormat('vi-VN').format(product.price)} VNĐ
      </span>
     
      <span className="text-rose-500 font-bold">
        Giá:{" "}
        {new Intl.NumberFormat('vi-VN').format(
          calculateDiscountedPrice(product.price) * quantity
        )}{" "}
        VNĐ
      </span>
    </>
  ) : (
    // Nếu không có giảm giá, chỉ hiển thị giá gốc và tổng tiền
    <>
      <span className="text-rose-500 font-bold">
       Giá:{" "}
        {new Intl.NumberFormat('vi-VN').format(product.price * quantity)} VNĐ
      </span>
    </>
  )}
</p>


            {/* Thêm nút tăng giảm số lượng */}
            <div className="flex items-center gap-6 mt-6">
              {/* Nút giảm số lượng */}
              <div className="flex items-center mt-6">
                {/* Nút giảm số lượng */}
                <button
                  className="px-4 py-2 text-[#6B4F3D] font-semibold rounded-sm border-2 border-[#D1D5DB] bg-[#F3F4F6] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6B4F3D] focus:ring-opacity-50 transition-all duration-300 ease-in-out"
                  onClick={handleDecrement}
                >
                  -
                </button>

                {/* Input số lượng */}
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(product.quantity, e.target.value)))}
                  className=" w-15 px-4 py-2 text-[#6B4F3D] font-semibold rounded-sm border-2 border-[#D1D5DB] bg-[#F3F4F6] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6B4F3D] focus:ring-opacity-50 transition-all duration-300 ease-in-out"
                  min="1"
                  max={product.quantity}
                />

                {/* Nút tăng số lượng */}
                <button
                  className="px-4 py-2 text-[#6B4F3D] font-semibold rounded-sm border-2 border-[#D1D5DB] bg-[#F3F4F6] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6B4F3D] focus:ring-opacity-50 transition-all duration-300 ease-in-out"
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>
              {showSuccessMessage && (
                <div
                    className="fixed text-sm top-14 right-2 bg-green-500 text-white p-3 rounded-lg shadow-md z-50"
                >
                    Sản phẩm {product.name} đã được thêm vào giỏ hàng của bạn.
                </div>
            )}
             
              <div className=" w-full flex items-center gap-5 mt-6">
                {/* Nút Thêm vào giỏ */}
                <button
                  onClick={handleAddToCart}
                  className="w-full py-2 px-6 bg-red-500 text-white font-semibold text-lg rounded-xl shadow-lg hover:bg-red-600 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  THÊM VÀO GIỎ
                </button>
              </div>
            </div>

            {/* Thông tin sản phẩm */}
            <div className='h-auto mt-6'>
              <h2 className="text-black flex items-center justify-between">
                <h2 className="uppercase">Thông tin sản phẩm</h2>
                <button
                  onClick={toggleInfo}
                  className="text-3xl text-[#6B4F3D] transition-all duration-300 ease-in-out transform hover:scale-110"
                >
                  {isOpen ? '-' : '+'}
                </button>
              </h2>
              <div
                className={`mt-1 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'
                  }`}
              >
                {isOpen && (
                  <div>
                    <p className="text-gray-700 mt-2">
                      Chứa đầy đủ dưỡng chất giúp mèo khỏe mạnh, phát triển toàn diện.
                    </p>
                    <p className="text-gray-500 mt-1">
                      500g - Hương vị cá ngừ, dễ ăn, phù hợp với mọi giống mèo.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Thanh gạch giữa */}
            <div className="my-1 border-t border-gray-300 mt-6"></div>

            {/* Dịch vụ giao hàng */}
            <div className='h-auto mb-0'>
              <h2 className="text-black flex items-center justify-between mt-3 mb-0"> {/* Giảm margin-top ở đây */}
                <h2 className="uppercase">Dịch vụ giao hàng</h2>
                <button
                  onClick={toggleShipping}
                  className="text-3xl text-[#6B4F3D] transition-all duration-300 ease-in-out transform hover:scale-110"
                >
                  {isShippingOpen ? '-' : '+'}
                </button>
              </h2>
              <div
                className={`mt-1 overflow-hidden transition-all duration-300 ease-in-out ${isShippingOpen ? 'max-h-screen' : 'max-h-0'
                  }`}
              >
                {isShippingOpen && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6M12 9v6" />
                      </svg>
                      <p className="text-gray-700">Miễn phí đổi hàng</p>
                    </div>
                    <p className="text-gray-500 ml-9">* Hotline: 0908.008.xxx</p> {/* Dòng phụ */}

                    <div className="flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
                      </svg>
                      <p className="text-gray-700">Giao hàng trong ngày</p>
                    </div>
                    <p className="text-gray-500 ml-9">* Chúng tôi cam kết giao hàng đúng giờ trong ngày.</p> {/* Dòng phụ */}

                    <div className="flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20l9-5-9-5-9 5 9 5z" />
                      </svg>
                      <p className="text-gray-700">Đặt hàng trực tuyến</p>
                    </div>
                    <p className="text-gray-500 ml-9">* Hotline: 0908.008.xxx để đặt hàng nhanh chóng.</p> {/* Dòng phụ */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="my-1 border-t border-gray-300 w-full"></div>

        <div className="mt-8">
          <h1 className="text-4xl font-bold mb-10 text-center ">SẢN PHẨM LIÊN QUAN</h1>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={18}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024:{ slidesPerView: 4 },
            }}
            className="p-4"
          >
            {randomProducts.map((relatedProduct) => (
              <SwiperSlide key={relatedProduct.id}>
                <div className="w-full max-w-xs bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <a href={`/products/${relatedProduct.id}`} className="block">
                    <img
                      src={`http://localhost:8081/${relatedProduct.image}`}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover aspect-[16/13] shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                      onError={(e) => {
                        e.target.src = 'http://localhost:8081/images/ImageProduct/default.jpg';
                      }}
                    />
                    {/* Nếu có giảm giá, hiển thị nhãn giảm giá */}
                    {discountValueram.find((item) => item.productId === relatedProduct.id && item.discountValue) && (
                      <div className="absolute top-1 right-8 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg z-50  hover:scale-110 hover:opacity-100 transition-all duration-500 ease-in-out hover:shadow-2xl hover:shadow-pink-500/50 hover:ring-2 hover:ring-pink-300 hover:ring-opacity-50">
                        Giảm {discountValueram.find((item) => item.productId === relatedProduct.id)?.discountValue} %
                      </div>
                    )}
                  </a>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">{relatedProduct.name}</h3>
                    <p className="flex items-center">
                      {discountValueram.find((item) => item.productId === relatedProduct.id && item.discountValue > 0) ? (
                        <>
                          {/* Hiển thị giá cũ */}
                          <span className="text-gray-400 line-through mr-2">
                            {new Intl.NumberFormat('vi-VN').format(relatedProduct.price)} VNĐ
                          </span>
                          {/* Hiển thị giá giảm */}
                          <span className="text-rose-500 font-bold">
                            {new Intl.NumberFormat('vi-VN').format(
                              calculateDiscountedPriceram(relatedProduct.price))} VNĐ
                          </span>
                        </>
                      ) : (
                        // Nếu không có giảm giá, chỉ hiển thị giá gốc
                        <span className="text-rose-500 font-bold">
                          {new Intl.NumberFormat('vi-VN').format(relatedProduct.price)} VNĐ
                        </span>
                      )}
                    </p>

                    <div className="mt-4">
                      <a
                        href={`/products/${relatedProduct.id}`}
                        className="relative w-full flex items-center justify-center py-2 px-4 text-black font-medium text-sm rounded-lg border-2 border-transparent bg-[#6B4F3D] overflow-hidden group transition-all duration-300 ease-in-out hover:text-white"
                      >
                        {/* Hiệu ứng "sao băng ngược" */}
                        <span
                          className="  absolute inset-0  bg-white translate-x-0 transition-transform duration-500 ease-out group-hover:translate-x-full "
                        ></span>

                        {/* Nội dung nút */}
                        <span className=" relative z-10 flex items-center  hover:text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-bag mr-2 text-current transition-all duration-300"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                          </svg>
                          <span className="text-current transition-all duration-300 ">
                            Chọn mua
                          </span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
