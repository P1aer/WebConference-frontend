import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema } from "../../constants/schemes";
import {Alert, Box, Button, TextField, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {fetchAuth} from "../../redux/slices/userSlice";

const Login = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [showAlert,setShowAlert] = useState(false)

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

   async function onSubmitHandler(values) {
        try {
            setLoading(true)
            dispatch(fetchAuth(
                {
                    values,
                    errorCb: () => {
                        setShowAlert(true)
                        setTimeout(() => {
                            setShowAlert(false)
                        }, 2500)
                    },
                })
            )
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <Box sx={{
            display:'flex',
            alignItems:"center",
            flexDirection:'column',
            justifyContent:'center',
            padding: '1rem'
        }}
        >
            <Typography variant='h4' component='h1' sx={{ mb: '1rem' }}>
                Or login if you have an account
            </Typography>
            <Box
                component='form'
                noValidate
                autoComplete='off'
                onSubmit={handleSubmit(onSubmitHandler)}
                sx={{
                    display:'flex',
                    alignItems:"center",
                    flexDirection:'column',
                    justifyContent:'center',
                }}
            >
                <TextField
                    sx={{ mb: 2,width: '30rem' }}
                    label="Login"
                    variant="outlined"
                    required
                    error={!!errors['login']}
                    helperText={errors['login'] ? errors['login'].message : ''}
                    {...register('login')}
                />
                <TextField
                    sx={{ mb: 2,width: '30rem' }}
                    label='Password'
                    required
                    type='password'
                    error={!!errors['password']}
                    helperText={errors['password'] ? errors['password'].message : ''}
                    {...register('password')}
                />
                {showAlert && <Alert severity="error">Login or password are incorrect !</Alert>}
                <Button
                    variant='contained'
                    fullWidth
                    type='submit'
                    disabled={loading || Object.keys(errors).length > 0}
                    sx={{ py: '0.8rem', mt: '1rem' }}
                >
                    Login
                </Button>
            </Box>
        </Box>
    );
};

export default Login;