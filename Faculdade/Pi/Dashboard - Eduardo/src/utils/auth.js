// Recupera o token JWT salvo
export const getToken = () => localStorage.getItem("token");

// Recupera o perfil do usuário (admin, professor, aluno)
export const getPerfil = () => {
  try {
    return JSON.parse(localStorage.getItem("perfil"));
  } catch {
    return null;
  }
};

// Verifica se o usuário é admin
export const isAdmin = () => getPerfil() === "admin";

// Verifica se o usuário é professor
export const isProfessor = () => getPerfil() === "professor";

// Verifica se o usuário é aluno
export const isAluno = () => getPerfil() === "aluno";
