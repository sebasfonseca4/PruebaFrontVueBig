import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000';

export const getUserInfo = async (token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.get(`${apiUrl}/api/user`, config);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Error al traer la información del usuario');
        }
    } catch (error) {
        console.error('Error en la petición:', error.message);
        throw error;
    }
};
