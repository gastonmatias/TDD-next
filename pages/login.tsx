import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, TextField, Box, Typography } from '@mui/material'

import { LoginFormData, loginSchema } from '@/validators';
import { useLoginMutation } from '@/hooks/useLoginMutation';

// import styles from './login.module.css'
import { Spinner } from '@/components/ui/Spinner';

const LoginPage = () => {
    
    const mutation = useLoginMutation()

    // destruct de useForm, recibe como <T> el type inferido* del esquema yup
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema) //loginSchema es el esquema yup explicito
    });

    // fx manejadora del submit, retorna submitHandler de libreria react-hook-form,
    // recibe como <T> el type inferido* del esquema del yup
    const onSubmit: SubmitHandler<LoginFormData> = async ({email,password}) => {
        // await loginService(email,password) // con mutation, esto ya no es innecesario
        
        // se invoca el mutation y se manda como argumento los mismos params
        // que fueron establecidos a momento de crear el hook
        mutation.mutate({email,password})
    }

    return (
    <>
    <Box>
        <Typography variant="h1" >Login</Typography>
        
        { 
        	mutation.isLoading && <Spinner/>
        }

        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField 
                variant="outlined" 
                label="email" 
                {...register("email",{required:true})}
                helperText={errors.email?.message}
                />

            <TextField 
                label="password" 
                variant="outlined" 
                {...register("password",{required:true})}
                helperText={errors.password?.message}
            />

            <Button
                variant='contained' 
                type='submit'
                disabled={mutation.isLoading}
            >
                Login
            </Button>
        </form>
    </Box>

    </>
  )
}
export default LoginPage