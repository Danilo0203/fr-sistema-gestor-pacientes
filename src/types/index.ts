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
