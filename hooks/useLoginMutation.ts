import { useMutation } from "@tanstack/react-query"
import { loginService } from "@/services/login"
import { LoginFormData } from "validators/loginSchema"

// hook useMutation, recibe por params los datos a utilizar para mutar y callback.
// por callback se manda la fx realizadora de la mutacion
export const useLoginMutation = () => {
    return useMutation((payload: LoginFormData) => 
        loginService(payload.email, payload.password)
    )
}