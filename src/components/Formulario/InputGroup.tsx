import { InputAdornment, TextField } from "@mui/material";
import { Icon } from "@iconify/react";

export const InputGroup = () => {
  return (
    <>
      <TextField
        id="nombre"
        label="Nombre"
        type="text"
        variant="standard"
        placeholder="Ingrese su nombre"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="mdi:user" className="text-azulFuerte" />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="usuario"
        label="Usuario"
        type="text"
        variant="standard"
        placeholder="Ingrese su nombre"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="mdi:user" className="text-azulFuerte" />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="nombre"
        label="Nombre"
        type="text"
        variant="standard"
        placeholder="Ingrese su nombre"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="mdi:user" className="text-azulFuerte" />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="nombre"
        label="Nombre"
        type="text"
        variant="standard"
        placeholder="Ingrese su nombre"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="mdi:user" className="text-azulFuerte" />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="nombre"
        label="Nombre"
        type="text"
        variant="standard"
        placeholder="Ingrese su nombre"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="mdi:user" className="text-azulFuerte" />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};
