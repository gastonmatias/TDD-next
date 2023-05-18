import { useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import { Button, TextField, Box, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';

import { LoginFormData, loginSchema } from '@/validators';
import { useLoginMutation } from '@/hooks/useLoginMutation';
import { Spinner } from '@/components/ui/Spinner';

const LoginPage = () => {
    
    const [errorMessage, setErrorMessage] = useState<string>('');
    const mutation = useLoginMutation()

    // destruct de useForm, recibe como <T> el type inferido* del esquema yup
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema) //loginSchema es el esquema yup explicito
    });

    // fx manejadora del submit, retorna submitHandler de libreria react-hook-form,
    // recibe como <T> el type inferido* del esquema del yup
    const onSubmit: SubmitHandler<LoginFormData> = async ({email,password}) => {
        // se invoca el mutation y se manda como argumento los mismos params
        // que fueron establecidos a momento de crear el hook
        mutation.mutate(
            {
                email,
                password
            },
            {
                // personalizar manejo de error con metodo de reactQuery sobre mutation "onError"
                onError(error) {
                    if(axios.isAxiosError(error) && error?.response?.status === 500){
                        setErrorMessage('Unexpected error, please try again')
                    } else{
                        setErrorMessage('The email or password are not correct')
                    }
                },
            }
        )
    }

    return (
    <>
    <Container component="main" maxWidth="xs">
        
        {  mutation.isLoading && <Spinner/> }

        {/* { ( mutation.isError )   */}
        { ( true )  
            ? <Typography>{errorMessage}</Typography>
            : null
        }

        <Box
          sx={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              {...register("email",{required:true})}
              helperText={errors.email?.message}
              error={!!errors.email}
              />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password",{required:true})}
              helperText={errors.password?.message}
              error={!!errors.password}
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={mutation.isLoading}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

    </>
  )
}
export default LoginPage