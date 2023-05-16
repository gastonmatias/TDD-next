import axios from "axios"

export const loginService = async (email: string, password: string) => {
    const response = await axios.post('/login',{
        email,
        password
    })

    return response
}
