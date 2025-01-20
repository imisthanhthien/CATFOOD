import { useSelector, useDispatch } from 'react-redux';
import { AddProduct, DeleteProduct } from '../GioHang/cart';
import React, { useState, useEffect, useRef } from 'react';
import useProducts from '../hooks/useProducts';
import useDiscountProduct from '../hooks/useDiscountProduct';
import useCategories from '../hooks/useCategori';
import useCategoryMap from '../hooks/useCategoriMap';

const Products = () => {

  const { products, loading, error } = useProducts();
  const dispatch = useDispatch();
  const [notification, setNotification] = useState('');
  const cart = useSelector((state) => state.cart.CartArr);
  const [selectedOption, setSelectedOption] = useState("Mới nhất");
  const [sortedProducts, setSortedProducts] = useState(products);
  const { categories, loading: categoriesLoading, error: categoriesError, getCategories } = useCategories();
  const { getCategoriesByProductId } = useCategoryMap();
  const [productsWithCategories, setProductsWithCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const prevProductsRef = useRef();

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setSortedProducts(products);
  }, [products]);

  useEffect(() => {
    if (JSON.stringify(prevProductsRef.current) !== JSON.stringify(products)) {
      const fetchProductsWithCategories = async () => {
        try {
          const enrichedProducts = await Promise.all(
            products.map(async (product) => {
              const categoryId = await getCategoriesByProductId(product.id);
              return { ...product, category: categoryId };
            })
          );
          setProductsWithCategories(enrichedProducts);
        } catch (error) {
          console.error('Lỗi khi tải sản phẩm với danh mục:', error);
        }
      };

      fetchProductsWithCategories();
      prevProductsRef.current = products;
    }
  }, [products, getCategoriesByProductId]);

  const sortOptions = [
    { label: "Mới nhất", value: "Mới nhất" },
    { label: "A - Z", value: "A - Z" },
    { label: "Giá giảm dần", value: "Giá giảm dần" },
    { label: "Giá tăng dần", value: "Giá tăng dần" }
  ];

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const handlePriceRangeChange = (e) => {
    const value = e.target.id;
    setPriceRange((prev) =>
      e.target.checked
        ? [...prev, value]
        : prev.filter((range) => range !== value)
    );
  };

  const handleAddToCart = (product) => {
    dispatch(AddProduct(product));
    setNotification(`${product.name} đã được thêm vào giỏ hàng!`);
    setTimeout(() => setNotification(''), 3000);
  };

  const [priceRange, setPriceRange] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const filterProducts = () => {
    const filtered = productsWithCategories.filter((product) => {
      const matchesPrice =
        priceRange.length === 0
          ? true

          : priceRange.some((range) => {
            if (range === '1') return product.price > 0 && product.price <= 50000;
            if (range === '2') return product.price > 50000 && product.price <= 100000;
            if (range === '3') return product.price > 100000 && product.price <= 200000;
            if (range === '4') return product.price > 200000 && product.price <= 300000;
            if (range === '5') return product.price > 300000 && product.price <= 400000;
            if (range === '6') return product.price > 400000 && product.price <= 500000;
            if (range === '7') return product.price > 500000;
            return false;
          });

      const matchesCategory =
        selectedCategories.length > 0
          ? selectedCategories.includes(product.category)
          : true;

      const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesPrice && matchesCategory && matchesSearchTerm;
    });

    // Sắp xếp danh sách sản phẩm
    switch (selectedOption) {
      case 'A - Z':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Giá tăng dần':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'Giá giảm dần':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredProducts = filterProducts();
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Số trang
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Chuyển đến trang tiếp theo/trước đó
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {loading && <p className="text-yellow-500 text-center text-xl">Đang tải dữ liệu...</p>}
      {error && <p className="text-red-500 text-center text-xl">{error}</p>}

      {notification && (
        <div className="fixed top-16 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <p>{notification}</p>
        </div>
      )}

      {/* Thanh lọc */}
      <div className="flex gap-3 mb-8">
        {/* Bộ lọc */}
        <div className="flex items-center gap-2 mr-10">
          <img
            src="/filter-alt-2-svgrepo-com.svg"
            alt="Filter Icon"
            className="w-8 h-8 filter grayscale"
          />
          <label className="text-lg font-medium uppercase">Bộ lọc</label>
        </div>

        {/* Lọc theo giá */}
        <div className="flex items-center gap-2 mr-10">

          <div className="relative group">
            {/* Tiêu đề không thay đổi */}
            <div className="flex items-center gap-2 p-2 border border-gray-300 cursor-pointer w-56">
              <div className="inline-block gap-2 ">
                <img
                  src="/filter-svgrepo-com.svg"
                  alt="Filter Icon"
                  className="w-5 h-5 mt-1 transform scale-150"
                />
              </div>

              <span className='font-light'>{"Lọc theo giá"}</span>
              {/* Mũi tên */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 transform transition-transform duration-300 group-hover:rotate-180 ml-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Dropdown List */}
            <div className="absolute left-0 mt-0 w-full bg-white border  shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all z-20">
              <div className="flex flex-col font-thin">
                <div

                  className="flex items-center p-2 gap-2 hover:bg-gray-100 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="1"
                    checked={priceRange.includes('1')}
                    onChange={handlePriceRangeChange}
                  />
                  <span>0 - 50.000 VNĐ</span>
                </div>
                <div

                  className="flex items-center p-2 gap-2 hover:bg-gray-100 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="2"
                    checked={priceRange.includes('2')}
                    onChange={handlePriceRangeChange}
                  />
                  <span>50.000 - 100.000 VNĐ</span>
                </div>
                <div

                  className="flex items-center p-2 gap-2 hover:bg-gray-100 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="3"
                    checked={priceRange.includes('3')}
                    onChange={handlePriceRangeChange}
                  />
                  <span>100.000 - 200.000 VNĐ</span>
                </div>
                <div

                  className="flex items-center p-2 gap-2 hover:bg-gray-100 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="4"
                    checked={priceRange.includes('4')}
                    onChange={handlePriceRangeChange}
                  />
                  <span>200.000 - 300.000 VNĐ</span>
                </div>
                <div

                  className="flex items-center p-2 gap-2 hover:bg-gray-100 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="5"
                    checked={priceRange.includes('5')}
                    onChange={handlePriceRangeChange}
                  />
                  <span>300.000 - 400.000 VNĐ</span>
                </div>
                <div

                  className="flex items-center p-2 gap-2 hover:bg-gray-100 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="6"
                    checked={priceRange.includes('6')}
                    onChange={handlePriceRangeChange}
                  />
                  <span>400.000 - 500.000 VNĐ</span>
                </div>
                <div

                  className="flex items-center p-2 gap-2 hover:bg-gray-100 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="7"
                    checked={priceRange.includes('7')}
                    onChange={handlePriceRangeChange}
                  />
                  <span>Trên 500.000 VNĐ</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lọc theo loại sản phẩm */}
        <div className="flex items-center gap-2">
          <div className="relative group">
            <div className="flex items-center gap-2 p-2 border border-gray-300  cursor-pointer w-56">
              <img
                src='/category-list-svgrepo-com.svg'
                className='w-5 h-5'
              >
              </img>
              <span className='font-light'> {"Loại sản phẩm"}</span>
              {/* Mũi tên */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 transform transition-transform duration-300 group-hover:rotate-180 ml-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Dropdown List */}
            <div className="absolute left-0 mt-0 w-full bg-white border  shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all z-20">
              <div className="flex flex-col font-thin">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                    <input
                      type="checkbox"
                      id={category.id}
                      className="mr-2"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryChange(category.id)}
                    />
                    <span>{category.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Sắp xếp */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="relative group">
            <div className="flex items-center gap-2 p-2 border border-gray-300 cursor-pointer w-56">
              <img
                src='/az-sort-ascending-letters-svgrepo-com.svg'
                className='w-5 h-5'
                alt="Sort"
              />
              <span className='font-light'>{"Sắp xếp"}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 transform transition-transform duration-300 group-hover:rotate-180 ml-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <div className="absolute left-0 mt-0 w-full bg-white border rounded-md shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all z-20">
              <div className="flex flex-col font-thin">
                {sortOptions.map(option => (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="flex items-center w-full">
                      <span className="flex-1">{option.label}</span>
                      {selectedOption === option.value && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 ml-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} handleAddToCart={handleAddToCart} />
        ))}
      </div>

      {/* Phân trang */}
      <div className="flex justify-center mt-6 space-x-3">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm text-gray-700 bg-white rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
</svg>
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 text-sm rounded-3xl font-medium transition-all duration-300 transform ${currentPage === index + 1
              ? 'bg-blue-500 text-white shadow-lg scale-105'
              : 'bg-white text-gray-700 hover:bg-gray-100 hover:scale-105'
              }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm text-gray-700 bg-white rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
        
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
</svg>
        </button>
      </div>
    </div>
  );
};

const ProductCard = ({ product, handleAddToCart }) => {
  const productDetailUrl = `/products/${product.id}`;
  const [discountValue, setDiscountValue] = useState(null);
  const { getProductsByDiscountId } = useDiscountProduct();

  useEffect(() => {
    const fetchDiscountValue = async () => {
      if (product.id) {
        const value = await getProductsByDiscountId(product.id);
        setDiscountValue(value);

      }
    };
    fetchDiscountValue();
  }, [product.id]);


  const calculateDiscountedPrice = (price) => {
    if (discountValue) {
      const discountAmount = (price * parseFloat(discountValue)) / 100;
      return price - discountAmount;
    }
    return price;
  };

  const discountedPrice = calculateDiscountedPrice(product.price);

  return (
    <div className=" bg-gradient-to-r from-gray-100 via-white to-gray-200 shadow-lg rounded-2xl overflow-hidden transform transition duration-500 ease-in-out">

      {/* Ảnh sản phẩm */}
      <a href={productDetailUrl} className="relative block">
        <img
          src={`http://localhost:8081/${product.image || 'http://localhost:8081/images/ImageProduct/default.jpg'}`}
          alt={product.name}
          className=" duration-700  w-full h-full object-cover aspect-[16/15] shadow-lg transition-all ease-in-out transform hover:scale-105 hover:shadow-2xl"
          onError={(e) => {
            e.target.src = 'http://localhost:8081/images/ImageProduct/default.jpg';
          }}
        />
        {/* Nếu có giảm giá, hiển thị nhãn giảm giá */}
        {discountValue && (
          <div className="absolute top-1 right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg z-50 transform scale-90 opacity-0 animate-fadeIn hover:scale-110 hover:opacity-100 transition-all duration-500 ease-in-out hover:shadow-2xl hover:shadow-pink-500/50 hover:ring-2 hover:ring-pink-300 hover:ring-opacity-50">
            Giảm {discountValue} %
          </div>
        )}
      </a>

      {/* Thông tin sản phẩm */}
      <div className="p-6 max-w-xs mx-auto bg-white shadow-md">
        <div className="h-12 overflow-y-auto">
          <p className=" text-sm opacity-90 leading-relaxed text-teal-950">
            {product.description}
          </p>
        </div>

        <p className="flex items-center ">
          {/* Nếu có giảm giá, hiển thị giá cũ bị gạch đi */}
          {discountValue ? (
            <>
              <span className="text-gray-400 line-through mr-2 ">
                {new Intl.NumberFormat('vi-VN').format(product.price)} VNĐ
              </span>
              <span className="text-rose-500 font-bold">
                {new Intl.NumberFormat('vi-VN').format(discountedPrice)} VNĐ
              </span>
            </>
          ) : (
            // Nếu không có giảm giá, chỉ hiển thị giá gốc
            <span className="text-rose-500 font-bold">
              {new Intl.NumberFormat('vi-VN').format(product.price)} VNĐ
            </span>
          )}
        </p>

        <div className="mt-3 flex gap-3 ">
          <a
            href={productDetailUrl}
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
  );
};

export default Products;
