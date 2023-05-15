import { Button, TextField, Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormData, loginSchema } from '@/validators';

const LoginPage = () => {
    
    // destruct de useForm, recibe como <T> el type inferido* del esquema yup
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema) //loginSchema es el esquema yup explicito
    });

    // fx manejadora del submit, retorna submitHandler de libreria react-hook-form,
    // recibe como <T> el type inferido* del esquema del yup
    const onSubmit: SubmitHandler<LoginFormData> = data => {
        console.log(data)
        console.log(errors)
    }

    return (
    <>
    <Box>

    <Typography variant="h1" >Login</Typography>

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

        <Button variant='contained' type='submit'>Login</Button>
    </form>
    </Box>

    </>
  )
}
export default LoginPage