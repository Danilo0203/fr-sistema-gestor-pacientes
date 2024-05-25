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
// Tipos para los Store
export type StoreProps = {
  loading: boolean;
  success: boolean;
  error: boolean;
  data: string[];
  errorData: string | null;
  dataLoaded: boolean;
  execute: () => void;
  init: () => void;
};

// Tipos para el panel del store
export type PanelStoreProps = {
  loading: boolean;
  success: boolean;
  error: boolean;
  dataPacientes: string[];
  dataAtendidos: string[];
  dataNoAtendidos: string[];
  errorData: string | null;
  dataLoaded: boolean;
  execute: () => void;
  init: () => void;
};

// Tipos para los encabezados de las tablas
export interface TableUsuariosProps {
  id: string;
  usuario: string;
  nombre: string;
  rol: string;
  acciones: string;
  index: number;
}

export type TableUsuariosKeys = keyof TableUsuariosProps;

// Tipo de datos para los Usuarios del store
export interface UsuarioProp {
  id: number;
  usuario: string;
  nombre: string;
  email: string;
  rol: {
    nombre: string;
    id: number;
  };
}

// Tipo de datos para los Roles del store
export interface RolProp {
  id: number;
  nombre: string;
  descripcion: string;
}

// Tipo de datos para las Recetas del store
export interface RecetasProp {
  id: number;
  fecha: string;
  usuario: {
    nombre: string;
    id: number;
  };
  usuarioID: number;
}

// Tipo de datos para las RecetasPaciente del store
export interface RecetasPacienteProp {
  id: number;
  descripcion: string;
  receta: {
    fecha: string;
    id: number;
  };
  paciente: {
    nombre: string;
    apellido: string;
    id: number;
  };
}

// Tipo de datos de Estado Civil
export interface EstadoCivilProp {
  id: number;
  nombre: string;
}

// Tipo de datos de Genero
export interface GeneroProp {
  id: number;
  nombre: string;
}

// Tipo de datos de Pacientes
export interface PacienteProp {
  id: number;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  genero: {
    nombre: string;
    id: number;
  };
  estado_civil: {
    nombre: string;
    id: number;
  };
  profesion: {
    nombre: string;
    id: number;
  };
  direccion: {
    nombre: string;
    id: number;
    municipio: {
      nombre: string;
      id: number;
    };
  };
}

// Tipo de datos de Citas
export interface CitaProp {
  id: string;
  atender: number;
  paciente_id: string;
}

// Tipo de datos de Profesiones
export interface ProfesionProp {
  id: number;
  nombre: string;
}

// Tipo de datos de Departamentos
export interface DepartamentoProp {
  id: number;
  nombre: string;
}

// Tipo de datos de Direcciones
export interface DireccionProp {
  id: number;
  nombre: string;
  municipio: {
    nombre: string;
    id: number;
    departamento: {
      nombre: string;
      id: number;
    };
  };
}

// Tipo de datos de Municipios
export interface MunicipioProp {
  id: number;
  nombre: string;
  departamento: {
    nombre: string;
    id: number;
  };
}

// Tipo de datos de Datos Medicos
export interface DatosMedicosProp {
  id: number;
  nombre: string;
}

// Tipo de datos de Datos Medicos Paciente
export interface DatosMedicosPacienteProp {
  id: number;
  fecha: string;
  dato_medico: {
    nombre: string;
    id: number;
  };
  paciente: {
    nombre: string;
    id: number;
  };
  valor: string;
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
