import axios from "axios"

export const loginService = async (email: string, password: string): Promise<void> => {
    return axios.post('/login',{
        email,
        password
    })
}
