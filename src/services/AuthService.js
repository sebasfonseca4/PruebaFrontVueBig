import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000'; 

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${apiUrl}/api/login`, {
      email: username,
      password: password
    });
    if (response.status === 200) {
      return response.data.token;
    } else {
      throw new Error('Error al iniciar sesión');
    }
  } catch (error) {
    console.error('Error en el login:', error.message);
    throw error; 
  }
};
