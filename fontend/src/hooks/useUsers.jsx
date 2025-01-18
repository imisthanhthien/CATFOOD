import { useState, useEffect } from 'react';
import axios from 'axios';

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8081/users');
                console.log("Dữ liệu trả về từ API:", response.data); // Log dữ liệu trả về
                setUsers(response.data);  // Set users từ kết quả trả về
            } catch (err) {
                setError('Đã xảy ra lỗi khi kết nối với server');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const addUser = async (user) => {
        try {
            const response = await axios.post('http://localhost:8081/users', user);
            console.log("Dữ liệu trả về sau khi thêm người dùng:", response.data);
            setUsers((prevUsers) => [...prevUsers, response.data]);  // Thêm người dùng mới vào danh sách
        } catch (err) {
            setError('Đã xảy ra lỗi khi thêm người dùng');
        }
    };

    const editUser = async (user) => {
        try {
            const response = await axios.put(`http://localhost:8081/users/${user.id}`, user);
            console.log("Dữ liệu trả về sau khi cập nhật người dùng:", response.data);
            setUsers((prevUsers) => prevUsers.map((u) => (u.id === response.data.id ? response.data : u)));  // Cập nhật người dùng
        } catch (err) {
            setError('Đã xảy ra lỗi khi chỉnh sửa người dùng');
        }
    };

    const removeUser = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8081/users/${id}`);
            console.log("Dữ liệu trả về sau khi xóa người dùng:", response.data);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));  // Cập nhật lại danh sách sau khi xóa
        } catch (err) {
            setError('Không thể xóa người dùng');
        }
    };

    return { users, loading, error, addUser, editUser, removeUser };
};

export default useUsers;
