export interface TituloBienvenidaProps {
  descripcion: string;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export interface BotonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface DatosRegisroProp {
  datosRegistro: Array<{
    [key: string]: string;
  }>;
}

export type FormInicioSesionType = {
  nombre: string;
  contraseña: string;
};

export type FormRegistroType = {
  nombre: string;
  usuario: string;
  correo: string;
  contraseña: string;
};

export type UserData = {
  id: string;
  usuario: string;
  nombre: string;
  email: string;
  rol_id: string;
};

export type RolData = {
  id: string;
  nombre: string;
  descripcion: string;
};

export interface ModalProps {
  idUser?: string;
  idRol?: string;
  updateTable?: () => void;
}
