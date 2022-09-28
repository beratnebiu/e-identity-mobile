import axios from "axios";

const API_URL = 'http://192.168.43.129:3000/mobile';

export const login = (data) => {
    return new Promise(async (resolve, reject) => {
        await axios.get(`${API_URL}/login`, {params: data})
            .then(response => {
                resolve(response.data);
            }).catch(err => {
                if (err.response) {
                    reject(err.response.data.error.message);
                } else if (err.request) {
                    reject(err.request);
                } else {
                    reject(err);
                }
            });
    })
}

export const getDocumentsAndApplications = (token) => {
    return new Promise(async (resolve, reject) => {
        await axios.get(`${API_URL}/getDocumentsAndApplications`,
            {
                headers: {
                    'Authorization': `Basic ${token}`
                }
            })
            .then(response => {
                resolve(response.data);
            }).catch(err => {
                if (err.response) {
                    reject(err.response.data.error.message);
                } else if (err.request) {
                    reject(err.request);
                } else {
                    reject(err);
                }
            });
    })
}

export const setApplication = (token, params) => {
    return new Promise(async (resolve, reject) => {
        await axios.post(`${API_URL}/setApplication`, params,{
                headers: {
                    'Authorization': `Basic ${token}`
                }
            })
            .then(response => {
                resolve(response.data);
            }).catch(err => {
                if (err.response) {
                    reject(err.response.data.error.message);
                } else if (err.request) {
                    reject(err.request);
                } else {
                    reject(err);
                }
            })
    })
}
