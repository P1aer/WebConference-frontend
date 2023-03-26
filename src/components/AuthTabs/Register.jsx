import React, {useState} from 'react';
import {Alert, Box, Button, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerSchema} from "../../constants/schemes";
import {fetchAuthRegister} from "../../redux/slices/userSlice";
import {useDispatch} from "react-redux";

const Register = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [showAlert,setShowAlert] = useState(false)

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    async function onSubmitHandler(values) {
        try {
            setLoading(true)
            dispatch(fetchAuthRegister(
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
                Register to proceed in app
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
                    required
                    label="Name"
                    variant="outlined"
                    error={!!errors['name']}
                    helperText={errors['name'] ? errors['name'].message : ''}
                    {...register('name')}
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
                <TextField
                    sx={{ mb: 2,width: '30rem' }}
                    label='Confirm Password'
                    type='password'
                    error={!!errors['passwordConfirm']}
                    helperText={
                        errors['passwordConfirm'] ? errors['passwordConfirm'].message : ''
                    }
                    {...register('passwordConfirm')}
                />
                {showAlert && <Alert severity="error">Oops, something gone wrong, change login or name or try later!</Alert>}
                <Button
                    variant='contained'
                    fullWidth
                    type='submit'
                    disabled={loading || Object.keys(errors).length > 0}
                    sx={{ py: '0.8rem', mt: '1rem' }}
                >
                    Register
                </Button>
            </Box>
        </Box>
    );
};

export default Register;