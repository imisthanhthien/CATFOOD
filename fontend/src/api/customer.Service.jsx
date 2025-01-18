// Kiểm tra email có tồn tại trong hệ thống không
export const checkEmailExists = async (email) => {
    const response = await fetch(`http://localhost:8081/customers/check-email/${email}`);
    if (!response.ok) {
        throw new Error('Lỗi khi kiểm tra email hoặc email không tồn tại');
    }

    const data = await response.json();
    return data;
};

// Lấy danh sách khách hàng qua backend
export const getCustomers = async () => {
    const response = await fetch('http://localhost:8081/customers');
    if (!response.ok) {
        throw new Error('Lỗi khi lấy danh sách khách hàng');
    }
    const data = await response.json();
    return data;
};

// Lấy thông tin khách hàng theo ID qua backend
export const getCustomerById = async (id) => {
    const response = await fetch(`http://localhost:8081/customers/${id}`);
    if (!response.ok) {
        throw new Error('Khách hàng không tồn tại hoặc lỗi khi lấy dữ liệu');
    }
    const data = await response.json();
    return data;
};

// Lấy thông tin khách hàng theo email qua backend
export const getCustomerByEmail = async (email) => {
    const response = await fetch(`http://localhost:8081/customers/email/${email}`);
    if (!response.ok) {
        throw new Error('Khách hàng không tồn tại hoặc lỗi khi lấy dữ liệu');
    }
    const data = await response.json();
    return data;
};

// Lấy ID khách hàng theo email qua backend
export const getCustomerIdByEmail = async (email) => {
    const response = await fetch(`http://localhost:8081/customers/email/id/${email}`);
    if (!response.ok) {
        throw new Error('Không tìm thấy khách hàng hoặc có lỗi khi lấy dữ liệu');
    }
    const data = await response.json();
    return data.id;  // Trả về ID khách hàng
};

// Thêm khách hàng qua backend
export const addCustomer = async (customer) => {
    const response = await fetch('http://localhost:8081/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
    });

    if (!response.ok) {
        throw new Error('Lỗi khi thêm khách hàng');
    }

    const data = await response.json();
    return data;
};

// Xóa khách hàng qua backend
export const deleteCustomerById = async (id) => {
    const response = await fetch(`http://localhost:8081/customers/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Lỗi khi xóa khách hàng hoặc khách hàng không tồn tại');
    }

    const data = await response.json();
    return data;
};

// Sửa thông tin khách hàng qua backend
export const updateCustomerById = async (id, updatedFields) => {
    const response = await fetch(`http://localhost:8081/customers/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
    });

    if (!response.ok) {
        throw new Error('Lỗi khi sửa thông tin khách hàng hoặc khách hàng không tồn tại');
    }

    const data = await response.json();
    return data;
};
