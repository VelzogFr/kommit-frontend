export const healthContent = {
  title: 'Kommit',
  subtitle: 'Vérification des connexions au backend.',
  server: {
    title: 'Serveur',
    description: "Interroge la route /health de l'API.",
    button: 'Vérifier la connexion au serveur',
    pendingButton: 'Vérification…',
    success: 'Serveur joignable.',
  },
  database: {
    title: 'Base de données',
    description: "Interroge la route /db-health de l'API.",
    button: 'Vérifier la connexion à la base',
    pendingButton: 'Vérification…',
    success: 'Base joignable.',
    unreachable: "La base n'a pas répondu.",
  },
} as const
