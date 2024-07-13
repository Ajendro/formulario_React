"use client";
import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import './form.css'


const RegisterForm = () => {
  const [formValues, setFormValues] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = React.useState({});
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.firstName = formValues.firstName ? "" : "Este campo es requerido.";
    tempErrors.lastName = formValues.lastName ? "" : "Este campo es requerido.";
    tempErrors.email = (/.+@.+..+/).test(formValues.email) ? "" : "Correo electrónico no válido.";
    tempErrors.password = formValues.password.length > 6 ? "" : "La contraseña debe tener al menos 7 caracteres.";
    tempErrors.confirmPassword = formValues.password === formValues.confirmPassword ? "" : "Las contraseñas no coinciden.";

    setErrors({ ...tempErrors });
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
        const response = await fetch('', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Registration successful:', data);
          setFormSubmitted(true);
        } else {
          console.error('Registration failed');
          alert('Error al registrar. Por favor, inténtalo de nuevo.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error al registrar. Por favor, inténtalo de nuevo.');
      }
    }
  };

  return (
    <Box
    sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '500px',
        marginLeft: '500px', 
        p: 3,
        marginTop:'60px',
        backgroundColor:'#2b2e36',
        borderRadius: '10px',
        
        
      }}
    >
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%', maxWidth: 400 }} >
        <Typography variant="h5" gutterBottom align="center" color={'#09ba7f'} fontWeight="bold">Formulario de Registro</Typography>

        <TextField
          className='custom-text-file'
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="Nombre"
          name="firstName"
          value={formValues.firstName}
          onChange={handleChange}
          autoComplete="off"
          error={!!errors.firstName}
          helperText={errors.firstName}
          variant="standard"
          InputProps={{
            style: { color: 'white' }, 
        }}
          
        />

        <TextField
          className='custom-text-file'
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Apellido"
          name="lastName"
          value={formValues.lastName}
          onChange={handleChange}
          autoComplete="off"
          error={!!errors.lastName}
          helperText={errors.lastName}
          variant="standard"
          InputProps={{
            style: { color: 'white' }, }}
          
        />

        <TextField
          className='custom-text-file'
          margin="normal"
          required
          fullWidth
          id="email"
          label="Correo Electrónico"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          autoComplete="off"
          type="email"
          error={!!errors.email}
          helperText={errors.email}
          variant="standard"
          InputProps={{
            style: { color: 'white' }, }}
        />

        <TextField
          className='custom-text-file'
          margin="normal"
          required
          fullWidth
          id="password"
          label="Contraseña"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          autoComplete="off"
          type="password"
          error={!!errors.password}
          helperText={errors.password}
          variant="standard"
          InputProps={{
            style: { color: 'white' }, }}
        />

        <TextField
          className='custom-text-file'
          margin="normal"
          required
          fullWidth
          id="confirmPassword"
          label="Confirmar Contraseña"
          name="confirmPassword"
          value={formValues.confirmPassword}
          onChange={handleChange}
          autoComplete="off"
          type="password"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          variant="standard"
          InputProps={{
            style: {
              color: 'white',},}}
        />

        <Button
          className='boton'
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          InputProps={{
            style: { color: '#09ba7f' }, }}
        >
          Registrar
        </Button>

        {formSubmitted && (
          <Typography variant="body1" color="success" sx={{ mt: 2 }}>
            Registro exitoso.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default RegisterForm;
