import axios from "axios";

export const getEvents = async () => {
    const response = await axios.post('http://localhost:1500/api/add/events');
    return response.data;
};

export const getUsers = async () => {
    const response = await axios.post('http://localhost:1500/api/add/users');
    return response.data;
};

export const certCode = async (code, email) => {
    await axios.put('http://localhost:1500/api/add/code', {code, email});
};

export const check = async (code) => {
    const response = await axios.post('http://localhost:1500/api/add/check', {code});
    return response.data;
};

export const attend = async (email, name, _id) => {
    await axios.post('http://localhost:1500/api/add/attend', {email, name, _id});
};

export const leave = async (email, _id) => {
    await axios.post('http://localhost:1500/api/add/leave', {email, _id});
}

export const report = async (bags, type, eventid, addinfo, attended, distance, coordinator) => {
    const response = await axios.post('http://localhost:1500/api/add/report', {bags, type, eventid, addinfo, attended, distance, coordinator});
    alert(response.data.message)
}