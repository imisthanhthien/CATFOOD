

export const getUsers = async () => {
    const response = await fetch('http://localhost:8081/users');
    const data = await response.json();
    return data;
};

export const createUser = async (userData) => {
    const response = await fetch('http://localhost:8081/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    return response.json();
};

export const updateUser = async (userId, userData) => {
    const response = await fetch(`http://localhost:8081/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    return response.json();
};

export const deleteUser = async (userId) => {
    const response = await fetch(`http://localhost:8081/users/${userId}`, {
        method: 'DELETE',
    });
    return response.json();
};
