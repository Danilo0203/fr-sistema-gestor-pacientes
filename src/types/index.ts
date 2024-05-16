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

// DIRECCIONES
export type DireccionData = {
  id: string;
  nombre: string;
  municipio: string;
  municipioID: string;
  direccion: string;
};

export type MunicipioData = {
  id: string;
  nombre: string;
  departamento: string;
  departamentoID: string;
  municipio: string;
};

export type DepartamentoData = {
  id: string;
  nombre: string;
  departamento: string;
};

// PACIENTES
export type PacienteData = {
  id: string;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  direccion: string;
  direccionID: string;
  municipio: string;
  municipioID: string;
  genero: string;
  generoID: string;
  estadoCivil: string;
  estadoCivilID: string;
  profesion: string;
  profesionID: string;
};

export type ProfesionData = {
  id: string;
  nombre: string;
};

export type EstadoCivilData = {
  id: string;
  nombre: string;
};

export type GeneroData = {
  id: string;
  nombre: string;
};

// DATOS MEDICOS
export type DatosMedicosData = {
  id: string;
  nombre: string;
};

export type DatosMedicosPacienteData = {
  id: string;
  fecha: string;
  datoMedico: string;
  datoMedicoID: string;
  paciente: string;
  pacienteID: string;
  valor: string;
};

// RECETAS MEDICAS
export type RecetasData = {
  id: string;
  fecha: string;
  usuario: string;
  usuarioID: string;
};

export type RecetasPacienteData = {
  id: string;
  recetaFecha: string;
  recetaID: string;
  pacienteNombre: string;
  pacienteApellido: string;
  pacienteID: string;
  descripcion: string;
};

export interface ModalProps {
  idUser?: string;
  idRol?: string;
  idDireccion?: string;
  idMunicipio?: string;
  idDepartamento?: string;
  idProfesion?: string;
  idEstadoCivil?: string;
  idGenero?: string;
  idPaciente?: string;
  idDatoMedico?: string;
  idReceta?: string;
  updateTable?: () => void;
}
