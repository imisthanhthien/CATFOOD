// Lấy danh sách sản phẩm qua backend
export const getAllProduct = async () => {
    const response = await fetch('http://localhost:8081/products');
    if (!response.ok) {
        throw new Error('Lỗi khi lấy danh sách sản phẩm');
    }
    const data = await response.json();
    return data;
};

// Lấy thông tin sản phẩm theo ID qua backend
export const getProductById = async (id) => {
    const response = await fetch(`http://localhost:8081/products/${id}`);
    if (!response.ok) {
        throw new Error('Sản phẩm không tồn tại hoặc lỗi khi lấy dữ liệu');
    }
    const data = await response.json();
    return data;
};

// Lấy số lượng sản phẩm theo ID qua backend
export const getProductQuantityById = async (id) => {
    const response = await fetch(`http://localhost:8081/products/quantity/${id}`);
    if (!response.ok) {
        throw new Error('Lỗi khi lấy số lượng sản phẩm');
    }
    const data = await response.json();
    return data;
};

// Thêm sản phẩm qua backend
export const addProduct = async (product) => {
    const response = await fetch('http://localhost:8081/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        throw new Error('Lỗi khi thêm sản phẩm');
    }

    const data = await response.json();
    return data;
};

// Xóa sản phẩm qua backend
export const deleteProductById = async (id) => {
    const response = await fetch(`http://localhost:8081/products/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Lỗi khi xóa sản phẩm hoặc sản phẩm không tồn tại');
    }

    const data = await response.json();
    return data;
};

// Sửa thông tin sản phẩm qua backend
export const updateProductById = async (id, updatedFields) => {
    const response = await fetch(`http://localhost:8081/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
    });

    if (!response.ok) {
        throw new Error('Lỗi khi sửa thông tin sản phẩm hoặc sản phẩm không tồn tại');
    }

    const data = await response.json();
    return data;
};
