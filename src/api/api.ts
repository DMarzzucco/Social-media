import axios, { AxiosError, AxiosResponse } from "axios";
import instance from "./instances";
import { ApiErrorResponse, User } from "../ts/interfaces";

export const RegisterRequest = (user: User) => {
    return instance.post(`/Register`, user)
        .then(response => {
            console.log('Response', response.data)
            return response.data;
        })
        .catch(error => {
            console.error('There was an error', error)
            if (axios.isAxiosError(error) && error.response) {
                const apiError: ApiErrorResponse = error.response.data;
                throw { response: { data: apiError, status: error.response.status } };
            } else {
                throw { errors: [{ message: "Unexpected Error" }] };
            }
        })
}

export const LoginRequest = (user: User) => {
    return instance.post(`/Login`, user)
        .then(response => {
            console.log('Response', response.data)
            return response.data;
        })
        .catch(error => {
            console.error('There was an error ', error)
            if (axios.isAxiosError(error) && error.response) {
                const apiError: AxiosError = error.response.data;
                throw { response: { data: apiError, status: error.response.status } }
            } else {
                throw { errors: [{ message: "Unexpected Error" }] }
            }
        })
}

export const veryTokenResponse = (): Promise<User> => {
    return instance.get(`/very`)
        .then((response: AxiosResponse<User>) => {
            console.log("Token Verifacation", response.data.user.username)
            return response.data
        })
        .catch((error) => {
            console.error("Error verifying token", error)
            if (axios.isAxiosError(error) && error.response) {
                const apiError: ApiErrorResponse = error.response.data;
                throw { response: { data: apiError, status: error.response.status } };
            }
            throw { errors: [{ message: "Unexpected error" }] }

        })
}



export const getProfile = () => {
    return instance.get('/profile')
        .then(response => {
            return response.data
        })
        .catch((error) => {
            console.error("Error verifying token", error)
            if (axios.isAxiosError(error) && error.response) {
                const apiError: ApiErrorResponse = error.response.data;
                throw { response: { data: apiError, status: error.response.status } }
            } else {
                throw { errors: [{ message: "Unexpected error" }] }
            }
        })
}
export const logOutResponse = () => {
    return instance.post('/task')
        .then(response => { return response.data })
        .catch((error) => {
            console.error("Error", error)
            throw error
        })
}
export const updateUserResponse = () => {
    return instance.put('/update/:id')
        .then(response => { return response.data.id })
        .catch((error) => {
            console.error(error)
            throw error;
        })
}