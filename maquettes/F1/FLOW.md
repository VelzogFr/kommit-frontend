# F1 : flux d'authentification (16 frames)

Fichiers : `screenshots/F1-<NN>-<node-id>.png`. Le NN suit l'ordre donné par l'orchestrateur.

## Pages

- **Accueil visiteur** : titre d'accroche + sous-titre, header avec logo Kommit et 2 boutons (« Se connecter », « Créer un compte »), pied de page. Zone centrale vide sous le sous-titre.
- **Inscription** : header avec logo et un seul bouton « Se connecter ». Carte centrale « Créer un compte » avec 3 champs obligatoires (Prénom, Email, Mot de passe), bouton « Créer un compte », lien « Tu as déjà un compte ? Connecte-toi. », mention « Authentification sécurisée ».
- **Connexion** : header avec logo et un seul bouton « Créer un compte ». Carte centrale « Se connecter » avec 2 champs (Email, Mot de passe), bouton « Me connecter », lien « Pas de compte ? Créer un compte maintenant. », mention « Authentification sécurisée ». Un espace vide est réservé entre le champ mot de passe et le bouton.
- **Accueil connecté** : header avec logo et bouton « Se déconnecter » (icône de sortie). Titre « Quoi de neuf aujourd'hui, Marc ? » + sous-titre « Renseigne ton daily du jour ci-dessous. » Zone centrale vide.

## Parcours 1 : inscription (01 à 07)

- **État 01 : Accueil visiteur, repos.** Les 2 boutons du header sont au repos.
- **État 02 : Accueil visiteur, survol de « Créer un compte ».** Un curseur main apparaît sur le bouton, qui s'éclaircit. Clic = aller à l'Inscription.
- **État 03 : Inscription, formulaire vide.** Prénom et mot de passe vides, Email avec un placeholder d'exemple (jean.dev@gmail.com). Le bouton « Créer un compte » est désactivé (pâle).
- **État 04 : Inscription, remplie, mot de passe trop court non encore signalé.** Prénom « Marc », email « marc.developpeur@gmail.com », mot de passe de 3 caractères masqués. Le bouton est actif.
- **État 05 : Inscription, erreur sur le mot de passe.** Mêmes valeurs qu'à l'état 04. Le champ mot de passe passe en rouge et un message apparaît dessous : « Le mot de passe doit contenir au moins 8 caractères. » Le bouton reste actif et la carte s'allonge vers le bas pour loger le message. On en déduit que l'erreur s'affiche après une tentative de soumission (ou à la perte du focus), à confirmer.
- **État 06 : Inscription, remplie et valide.** Mot de passe de 8 caractères masqués, plus de message d'erreur, bouton actif.
- **État 07 : Accueil connecté, avec toast de succès.** Après soumission réussie : redirection vers l'Accueil connecté. Un toast vert avec icône de validation et croix de fermeture apparaît en haut à droite : « Bienvenue Marc, ton compte est créé. » Le prénom saisi est repris dans le titre.

## Parcours 2 : connexion (08 à 12)

- **État 08 : Accueil visiteur, repos.** Identique à l'état 01 (même page, même rendu). Sert de point de départ au parcours de connexion.
- **État 09 : Accueil visiteur, survol de « Se connecter ».** Curseur main sur ce bouton, qui s'éclaircit. Clic = aller à la Connexion.
- **État 10 : Connexion, formulaire vide.** Email avec placeholder d'exemple, mot de passe vide, bouton « Me connecter » désactivé.
- **État 11 : Connexion, remplie.** Email « marc.developpeur@gmail.com », mot de passe de 8 caractères masqués, bouton actif. La carte est un peu moins haute qu'à l'état 10 : l'espace réservé sous le mot de passe est légèrement plus petit, le bouton remonte de quelques pixels.
- **État 12 : Accueil connecté, avec toast de succès.** Après connexion : toast vert « Content de te revoir Marc » avec croix de fermeture (plus court que celui de l'inscription). Titre personnalisé avec « Marc ».

## Parcours 3 : déconnexion (13 à 16)

- **État 13 : Accueil connecté, repos, sans toast.** Le toast a disparu (ou n'est pas encore apparu). Bouton « Se déconnecter » au repos.
- **État 14 : Accueil connecté, survol de « Se déconnecter ».** Curseur main, le bouton est grisé/atténué.
- **État 15 : Accueil connecté, clic sur « Se déconnecter ».** Le curseur main est dans une variante « cliquant » (doigt jaune), le bouton est revenu à son rendu normal. Pas de changement de page visible dans cette frame.
- **État 16 : Accueil visiteur, repos.** Retour à l'Accueil visiteur, identique aux états 01 et 08. Pas de toast de déconnexion.

## Résumé du flux

Accueil visiteur (01/02) -> Inscription (03, 04, 05, 06) -> Accueil connecté avec toast d'inscription (07).
Accueil visiteur (08/09) -> Connexion (10, 11) -> Accueil connecté avec toast de connexion (12) -> même page sans toast (13).
Accueil connecté (13, 14, 15) -> clic « Se déconnecter » -> Accueil visiteur (16).

Il y a donc 4 pages seulement : Accueil visiteur (états 01, 02, 08, 09, 16), Inscription (03 à 06), Connexion (10, 11), Accueil connecté (07, 12 à 15). Les autres frames sont des états de ces pages.

## Points à confirmer

- Le contexte supposé (01-07 signup, 08-12 signin, 13-16 signout) est confirmé par les screenshots.
- Aucune annotation de flèche ni de lien entre frames n'a été vue sur les screenshots : les transitions ci-dessus sont déduites des boutons survolés et du contenu.
- Pas de frame pour l'erreur de connexion (mauvais identifiants) ni pour l'erreur serveur à l'inscription (email déjà utilisé) : non fournies dans ce périmètre.
- Le déclencheur exact de l'erreur de l'état 05 (soumission ou perte du focus) n'est pas visible.
- Les états 14 et 15 portent l'annotation « Pointer Finger » (doigt) : c'est une annotation d'interaction, pas de l'UI. Idem le curseur des états 02 et 09.
