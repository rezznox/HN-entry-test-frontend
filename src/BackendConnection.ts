import axios from 'axios';

export const getConnection = () => {
    const conn = new axios.Axios({ baseURL: 'localhost:3000' });
    return conn;
}
