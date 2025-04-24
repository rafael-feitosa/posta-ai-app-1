// utils/sortTasks.js
// export const sortTasksByCreatedAt = (tasks) => {
//   if (!Array.isArray(tasks)) return [];

//   return [...tasks].sort((a, b) => {
//     const dateA = a.createdAt?.toDate
//       ? a.createdAt.toDate()
//       : new Date(a.createdAt);
//     const dateB = b.createdAt?.toDate
//       ? b.createdAt.toDate()
//       : new Date(b.createdAt);
//     return dateB - dateA; // Mais recentes primeiro
//   });
// };

export const sortTasksByDeadline = (tasks) => {
  if (!Array.isArray(tasks)) return [];

  return [...tasks].sort((a, b) => {
    const dateA = a.deadline?.toDate
      ? a.deadline.toDate()
      : new Date(a.deadline);
    const dateB = b.deadline?.toDate
      ? b.deadline.toDate()
      : new Date(b.deadline);
    return dateA - dateB; // Mais próximas primeiro
  });
};

// Quando você for exibir para o usuário:
// Por exemplo, no card da tarefa, aí sim você formata:
// const formatDateCreatedAt = (timestamp) => {
//   if (!timestamp) return 'Data não disponível';
//   const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
//   return date.toLocaleDateString('pt-BR', {
//     day: '2-digit',
//     month: '2-digit',
//     year: 'numeric',
//   }) + ' às ' + date.toLocaleTimeString('pt-BR', {
//     hour: '2-digit',
//     minute: '2-digit'
//   });
// };
