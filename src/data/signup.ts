export const signupContent = {
  title: 'Créer un compte',
  firstNameLabel: 'Prénom*',
  emailLabel: 'Email*',
  emailPlaceholder: 'jean.dev@gmail.com',
  passwordLabel: 'Mot de passe*',
  submit: 'Créer un compte',
  pendingSubmit: 'Création du compte en cours',
  footerText: 'Tu as déjà un compte ? ',
  footerLink: 'Connecte-toi.',
  errors: {
    firstNameRequired: 'Le prénom est obligatoire.',
    emailInvalid: "L'email n'est pas valide.",
    passwordTooShort: 'Le mot de passe doit contenir au moins 8 caractères.',
  },
} as const
