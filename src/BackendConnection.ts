import axios from 'axios';

export const getConnection = () => {
    const conn = new axios.Axios({ baseURL: 'http://localhost:3000' });
    return conn;
}
