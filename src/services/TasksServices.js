import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000';

export const getTasks = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await axios.get(`${apiUrl}/api/tasks`, config);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Error al traer la información de las tareas');
        }
    } catch (error) {
        console.error('Error en la petición:', error.message);
        throw error;
    }
};

export const getTaskById = async (token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await axios.get(`${apiUrl}/api/tasks/${id}`, config);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Error al traer la información de la tarea');
        }
    } catch (error) {
        console.error('Error en la petición:', error.message);
        throw error;
    }
};

export const createTask = async (token, body) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    console.log(body)
    try {
        const response = await axios.post(`${apiUrl}/api/tasks`, body, config);
        if (response.status === 201) {
            return response.data;
        } else {
            throw new Error('Error al crear la tarea');
        }
    } catch (error) {
        console.error('Error en la petición:', error.message);
        throw error;
    }
};

export const deleteTask = async (token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await axios.delete(`${apiUrl}/api/tasks/${id}`, config);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Error al eliminar la tarea');
        }
    } catch (error) {
        console.error('Error en la petición:', error.message);
        throw error;
    }
};

export const updateTaskService = async (token, id, body) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await axios.put(`${apiUrl}/api/tasks/${id}`, body, config);
        console.log(response)
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Error al editar la tarea');
        }
    } catch (error) {
        console.error('Error en la petición:', error.message);
        throw error;
    }
};
