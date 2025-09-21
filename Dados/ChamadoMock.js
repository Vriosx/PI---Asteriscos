// Dados temporários dos chamados
const chamados = [];

export const addChamado = (chamado) => {
  const novoChamado = {
    id: Date.now().toString(),
    ...chamado,
    hora: new Date().toLocaleTimeString(),
  };
  chamados.unshift(novoChamado); // adiciona no início
};

export const getChamados = () => chamados;
