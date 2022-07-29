import axios from "axios";

export const profile = async (email, token) => {
    const response = await axios.post('http://localhost:1500/api/auth/profile', {email, token});
    localStorage.setItem('user', response.data);
    return response.data;
};

export const login = async (email, password, handleSetIsAuth) => {
    const response = await axios.post('http://localhost:1500/api/auth/login', {email, password});
    handleSetIsAuth();
    localStorage.setItem('token', response.data);
    return response;
};

export const registration = async (
    name,
    city,
    email,
    grade,
    country,
    password,
    telegram,
    instagram,
    dateOfBirth,
    affiliation,
    phoneNumber,
    volunteeringHours
) => {
    await axios.post('http://localhost:1500/api/auth/registration', {
        name,
        city,
        email,
        grade,
        country,
        password,
        telegram,
        instagram,
        dateOfBirth,
        affiliation,
        phoneNumber,
        volunteeringHours
    });
};