import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000';

export const getProjects = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await axios.get(`${apiUrl}/api/projects`, config);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Error al traer la información de los proyectos');
        }
    } catch (error) {
        console.error('Error en la petición:', error.message);
        throw error;
    }
};

export const getProjectById = async (token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await axios.get(`${apiUrl}/api/projects/${id}`, config);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Error al traer la información del proyecto');
        }
    } catch (error) {
        console.error('Error en la petición:', error.message);
        throw error;
    }
};

export const createProject = async (token, body) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    console.log(body)
    try {
        const response = await axios.post(`${apiUrl}/api/projects`, body, config);
        console.log(response)
        if (response.status === 201) {
            return response.data;
        } else {
            throw new Error('Error al crear el proyecto');
        }
    } catch (error) {
        console.error('Error en la petición:', error.message);
        throw error;
    }
};

export const deleteProject = async (token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await axios.delete(`${apiUrl}/api/projects/${id}`, config);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Error al eliminar el proyecto');
        }
    } catch (error) {
        console.error('Error en la petición:', error.message);
        throw error;
    }
};

export const updateProjectService = async (token, id, body) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await axios.put(`${apiUrl}/api/projects/${id}`, body, config);
        console.log(response)
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Error al editar el proyecto');
        }
    } catch (error) {
        console.error('Error en la petición:', error.message);
        throw error;
    }
};
