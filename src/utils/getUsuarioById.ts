export const getUsuarioById = (id: string = "1", usuarios: string[]) => {
  const usuario = usuarios.filter((usuario) => usuario.id == id);
  return usuario;
};
