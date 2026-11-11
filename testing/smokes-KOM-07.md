# Smokes : KOM-07 · Authentification · frontend

Source : ticket Notion KOM-07 (https://app.notion.com/p/3ac0cd6b95d080f39307e0bef7545070), inventaire `testing/inventaire-KOM-07.md`.
Format : `docs/testing-strategy.md`, section « Format des smokes ». Messages backend tirés de `src/types/apiContract.ts`.

Ces scénarios sont écrits **avant** l'implémentation (test-first). Après le code, `e2e-test-writer` transcrit chacun d'eux en un e2e Playwright.

## Conventions communes à tous les scénarios

- **Serveurs** : front lancé (`pnpm dev`, http://localhost:5173) et backend Kommit lancé (http://localhost:3000).
- **Compte de référence** : un compte existe avec le prénom « Marc », l'email « marc.developpeur@gmail.com » et le mot de passe « motdepasse123 ». Les scénarios de signin s'appuient dessus.
- **Email neuf** : les scénarios de signup qui doivent réussir utilisent une adresse jamais utilisée, notée « marc+<horodatage>@test.dev » (ex. « marc+1760520000@test.dev »).
- **Libellés** : ceux de `src/data/`. Les champs du signup portent un astérisque (« Prénom* », « Email* », « Mot de passe* »), ceux du signin n'en ont pas (« Email », « Mot de passe »). Dans le header, « Se connecter » et « Créer un compte » ont l'aspect de boutons mais sont des liens (`<a>`) : pour Playwright, `getByRole('link')`.
- **Messages encore absents du code** : le message d'erreur du mot de passe vient de la maquette (`maquettes/F1/`), celui de l'email mal formé (« L'email n'est pas valide. ») d'une décision de l'utilisateur, et les textes des toasts du ticket (« Content de te revoir {prénom}. » confirmé par l'utilisateur). Ils ne sont pas encore dans `src/data/`. Si le code affiche un autre texte, le smoke échoue à l'étape « Attendu » correspondante.

---

### 1. Page d'accueil

| RM | Inventaire | Ce qu'on vérifie | Scénario |
|---|---|---|---|
| RM1 | 🔴 | Visiteur non connecté : message d'accueil et boutons « Se connecter » / « Créer un compte » dans le header | SM-1 |
| RM2 | 🟠 | Utilisateur connecté : « Quoi de neuf aujourd'hui, {prénom} ? » avec le vrai prénom de la session | SM-2 |
| RM15 | 🔴 | Le lien « ViDev » du footer ouvre la chaîne YouTube dans un nouvel onglet | SM-3 |

### SM-1 — Accueil visiteur non connecté

> ✅ **Ce qu'on vérifie :**
> - Sans session, l'accueil affiche le message d'accueil et les 2 boutons d'entrée dans le header.
> - Smoke parce que la décision « session `null` → non connecté » est triviale : ce qui peut casser, c'est la vraie réponse de session de l'API sans cookie.

Précondition : aucune session (fenêtre de navigation privée neuve).

1. Ouvrir http://localhost:5173/.

Attendu : le titre « Prêt(e) pour ton daily standup ? » et le sous-titre « Track tes résultats pour que les jours ne se ressemblent pas. » s'affichent, le header montre « Se connecter » et « Créer un compte », et le bouton « Se déconnecter » est absent.

- [ ] Vérifié

---

### SM-2 — Accueil connecté : titre avec le prénom de la session

> ✅ **Ce qu'on vérifie :**
> - Une fois connecté, le titre de l'accueil reprend le prénom renvoyé par la session (`SessionUser.name`).
> - Le texte « Quoi de neuf aujourd'hui, {prénom} ? » est celui de la maquette, qui fait foi sur le ticket (décision du 2026-10-15).
> - Smoke en complément de l'unitaire : la composition du titre est testée en unitaire, mais seul le vrai cookie de session (`credentials: 'include'`) prouve que le prénom arrive à l'écran.

Précondition : compte de référence existant, aucune session, page http://localhost:5173/signin ouverte.

1. Saisir « marc.developpeur@gmail.com » dans le champ « Email ».
2. Saisir « motdepasse123 » dans le champ « Mot de passe ».
3. Cliquer sur le bouton « Me connecter ».

Attendu : on arrive sur l'accueil (/), le titre affiche « Quoi de neuf aujourd'hui, Marc ? » et le sous-titre « Renseigne ton daily du jour ci-dessous. ».

- [ ] Vérifié

---

### SM-3 — Lien ViDev du footer en nouvel onglet

> ✅ **Ce qu'on vérifie :**
> - Le lien « ViDev » du footer ouvre https://www.youtube.com/@videv9858 dans un nouvel onglet, la page Kommit reste ouverte.
> - Smoke parce que l'ouverture d'un nouvel onglet est un comportement du navigateur (`target="_blank"`), sans logique à nous.

Précondition : page http://localhost:5173/ ouverte.

1. Cliquer sur le lien « ViDev » dans le footer.

Attendu : un nouvel onglet s'ouvre sur https://www.youtube.com/@videv9858, et l'onglet d'origine reste sur l'accueil Kommit.

- [ ] Vérifié

---

### 2. Navigation entre les pages

| RM | Inventaire | Ce qu'on vérifie | Scénario |
|---|---|---|---|
| RM6 | 🔴 | Clic sur « Créer un compte » → page de signup | SM-4 |
| RM7 | 🔴 | Clic sur « Se connecter » → page de signin | SM-5 |

### SM-4 — « Créer un compte » mène au signup

> ✅ **Ce qu'on vérifie :**
> - Le clic sur « Créer un compte » dans le header de l'accueil amène sur la page de signup.
> - Smoke parce que la navigation est portée par React Router, sans décision à nous.

Précondition : aucune session, page http://localhost:5173/ ouverte.

1. Cliquer sur « Créer un compte » dans le header.

Attendu : l'URL devient /signup, la carte est titrée « Créer un compte » et affiche les champs « Prénom* », « Email* » et « Mot de passe* ».

- [ ] Vérifié

---

### SM-5 — « Se connecter » mène au signin

> ✅ **Ce qu'on vérifie :**
> - Le clic sur « Se connecter » dans le header de l'accueil amène sur la page de signin.
> - Smoke parce que la navigation est portée par React Router, sans décision à nous.

Précondition : aucune session, page http://localhost:5173/ ouverte.

1. Cliquer sur « Se connecter » dans le header.

Attendu : l'URL devient /signin, la carte est titrée « Se connecter » et affiche les champs « Email » et « Mot de passe » ainsi que le bouton « Me connecter ».

- [ ] Vérifié

---

### 3. Formulaire d'authentification

| RM | Inventaire | Ce qu'on vérifie | Scénario |
|---|---|---|---|
| RM32 | 🟢 | Bouton « Me connecter » désactivé tant que les champs sont vides | aucun smoke, couvert en unitaire |
| RM33 | 🟢 | Bouton « Créer un compte » désactivé tant qu'un champ requis est vide, prénom trimé | aucun smoke, couvert en unitaire |
| RM10, RM11, RM20 | 🟢 | Critères de validation du signup, aucun format au signin | aucun smoke, couvert en unitaire |
| RM30 | 🔴 | Erreurs de format affichées à la 1re soumission, puis mises à jour pendant la saisie | SM-6 |
| RM17 | 🟠 | Pendant l'appel : bouton désactivé, spinner, libellé aria | SM-7 |
| RM16 | 🔴 | Double-clic : une seule requête part | SM-8 |
| RM9, RM13 | 🟠 | Message selon le `code` de l'`ApiError` : email déjà pris, identifiants invalides | SM-9, SM-10 |
| RM8, RM12 | 🔴 | Signup ou signin réussi → retour sur l'accueil, connecté | SM-11, SM-12 |

### SM-6 — Signup : erreur affichée à la soumission, puis effacée pendant la saisie

> ✅ **Ce qu'on vérifie :**
> - Aucune erreur de format ne s'affiche pendant la 1re saisie ; elle apparaît à la 1re soumission.
> - Ensuite, l'erreur se met à jour à chaque frappe, sans resoumettre.
> - Smoke parce que ce moment d'affichage est le réglage de react-hook-form (`mode: 'onSubmit'`, `reValidateMode: 'onChange'`) : le tester en unitaire reviendrait à tester la librairie.

Précondition : aucune session, page http://localhost:5173/signup ouverte.

1. Saisir « Marc » dans le champ « Prénom* ».
2. Saisir « marc.test.dev » dans le champ « Email* ».
3. Saisir « abc » dans le champ « Mot de passe* ».
4. Cliquer sur le bouton « Créer un compte ».
5. Saisir « defgh » à la suite dans le champ « Mot de passe* » (8 caractères au total).

Attendu :
- après l'étape 3 : aucun message d'erreur affiché, le bouton « Créer un compte » est actif ;
- après l'étape 4 : le champ « Email* » passe en bordure rouge avec le message « L'email n'est pas valide. » dessous, le champ « Mot de passe* » passe en bordure rouge avec le message « Le mot de passe doit contenir au moins 8 caractères. » dessous, et on reste sur /signup ;
- après l'étape 5, sans recliquer : le message et la bordure rouge du mot de passe disparaissent, ceux de l'email restent affichés.

- [ ] Vérifié

---

### SM-7 — Signin : bouton en chargement pendant l'appel

> ✅ **Ce qu'on vérifie :**
> - Tant que l'appel signin est en cours, le bouton est désactivé, son libellé est remplacé par un spinner, et son nom accessible est « Connexion en cours » (non visible à l'écran).
> - Smoke en complément de l'unitaire : l'état du bouton et le libellé aria sont testés en unitaire, mais l'état « en vol » vient de la vraie requête (TanStack Query) et le spinner est du rendu.

Précondition : compte de référence existant, aucune session, page http://localhost:5173/signin ouverte, réseau ralenti (DevTools > Réseau > profil « 3G lente » ; en e2e, réponse de l'API retardée).

1. Saisir « marc.developpeur@gmail.com » dans le champ « Email ».
2. Saisir « motdepasse123 » dans le champ « Mot de passe ».
3. Cliquer sur le bouton « Me connecter ».

Attendu : juste après le clic et tant que la réponse n'est pas arrivée, le texte « Me connecter » est remplacé par un spinner, le bouton est désactivé (un nouveau clic est sans effet) et l'inspecteur d'accessibilité lui donne le nom « Connexion en cours ». À l'arrivée de la réponse, on navigue vers l'accueil connecté.

- [ ] Vérifié

---

### SM-8 — Signup : un double-clic n'envoie qu'une requête

> ✅ **Ce qu'on vérifie :**
> - Un double-clic sur « Créer un compte » n'envoie qu'une seule requête d'inscription.
> - Smoke parce que la garantie repose sur le bouton désactivé de RM17 et sur le navigateur, qui ignore les clics sur un bouton `disabled`.
> - Signe visible d'un échec : une 2e requête partirait avec le même email et le message « Un compte avec cet email existe déjà » apparaîtrait.

Précondition : aucune session, page http://localhost:5173/signup ouverte, onglet Réseau des DevTools ouvert et filtré sur « sign-up ».

1. Saisir « Marc » dans le champ « Prénom* ».
2. Saisir « marc+<horodatage>@test.dev » dans le champ « Email* ».
3. Saisir « motdepasse123 » dans le champ « Mot de passe* ».
4. Double-cliquer sur le bouton « Créer un compte ».

Attendu : l'onglet Réseau ne montre qu'une seule requête d'inscription, on arrive sur l'accueil connecté (« Quoi de neuf aujourd'hui, Marc ? ») et le message « Un compte avec cet email existe déjà » ne s'affiche à aucun moment.

- [ ] Vérifié

---

### SM-9 — Signup avec un email déjà pris : message sous le champ Email

> ✅ **Ce qu'on vérifie :**
> - Quand le backend renvoie `EMAIL_ALREADY_EXISTS`, le message s'affiche sous le champ « Email* », pas en message global.
> - Smoke en complément de l'unitaire : le mapping code → message et emplacement est testé en unitaire, mais seul le vrai backend prouve que l'erreur de Better Auth arrive bien emballée en `ApiError` avec ce code (décision du 2026-10-15).

Précondition : compte de référence existant, aucune session, page http://localhost:5173/signup ouverte.

1. Saisir « Marc » dans le champ « Prénom* ».
2. Saisir « marc.developpeur@gmail.com » dans le champ « Email* ».
3. Saisir « motdepasse123 » dans le champ « Mot de passe* ».
4. Cliquer sur le bouton « Créer un compte ».

Attendu : le message « Un compte avec cet email existe déjà » (texte du contrat, `apiContract.ts`) s'affiche sous le champ « Email* », on reste sur /signup et aucun toast n'apparaît.

- [ ] Vérifié

---

### SM-10 — Signin avec un mauvais mot de passe : message générique

> ✅ **Ce qu'on vérifie :**
> - Quand le backend renvoie `INVALID_CREDENTIALS`, un message global du formulaire s'affiche, sans dire si c'est l'email ou le mot de passe qui est faux.
> - Smoke en complément de l'unitaire : même raison que SM-9, le code doit venir du vrai backend.

Précondition : compte de référence existant, aucune session, page http://localhost:5173/signin ouverte.

1. Saisir « marc.developpeur@gmail.com » dans le champ « Email ».
2. Saisir « mauvaismdp1 » dans le champ « Mot de passe ».
3. Cliquer sur le bouton « Me connecter ».

Attendu : le message « Email ou mot de passe incorrect » (sans point final) s'affiche en message global du formulaire, rattaché à aucun des 2 champs : il n'est sous ni « Email » ni « Mot de passe », et aucun champ ne passe en bordure rouge. On reste sur /signin et aucun toast n'apparaît. Ce texte est le `message` de l'`ApiError` renvoyé par le backend (`kommit-backend/src/services/errors/apiErrors/apiErrors.ts`), affiché tel quel par le front.

- [ ] Vérifié

---

### SM-11 — Signup réussi : retour sur l'accueil, connecté

> ✅ **Ce qu'on vérifie :**
> - Après un signup réussi, on arrive sur l'accueil en état connecté.
> - Smoke parce que cela dépend de la vraie session Better Auth, du cookie cross-origin (`credentials: 'include'`) et de la navigation réelle. Sans ce réglage, RM8 ne passe jamais et aucun unitaire ne le détecte.

Précondition : aucune session, page http://localhost:5173/signup ouverte.

1. Saisir « Marc » dans le champ « Prénom* ».
2. Saisir « marc+<horodatage>@test.dev » dans le champ « Email* ».
3. Saisir « motdepasse123 » dans le champ « Mot de passe* ».
4. Cliquer sur le bouton « Créer un compte ».

Attendu : l'URL devient /, le titre affiche « Quoi de neuf aujourd'hui, Marc ? », le header montre « Se déconnecter » et ne montre plus « Se connecter » ni « Créer un compte ».

- [ ] Vérifié

---

### SM-12 — Signin réussi : retour sur l'accueil, connecté

> ✅ **Ce qu'on vérifie :**
> - Après un signin réussi, on arrive sur l'accueil en état connecté.
> - Smoke pour la même raison que SM-11 : session réelle, cookie cross-origin, navigation réelle (RM12).

Précondition : compte de référence existant, aucune session, page http://localhost:5173/signin ouverte.

1. Saisir « marc.developpeur@gmail.com » dans le champ « Email ».
2. Saisir « motdepasse123 » dans le champ « Mot de passe ».
3. Cliquer sur le bouton « Me connecter ».

Attendu : l'URL devient /, le titre affiche « Quoi de neuf aujourd'hui, Marc ? », le header montre « Se déconnecter » et ne montre plus « Se connecter » ni « Créer un compte ».

- [ ] Vérifié

---

### 4. Le toast d'arrivée

| RM | Inventaire | Ce qu'on vérifie | Scénario |
|---|---|---|---|
| RM3, RM4 | 🟠 | Toast « Bienvenue {prénom}, ton compte est créé. » après signup, « Content de te revoir {prénom}. » après signin | SM-13, SM-14 |
| RM24, RM25 | 🔴 | Pas de toast après rechargement ou « retour » ; pas de toast à l'ouverture directe avec session persistée | SM-15, SM-16, SM-17 |

### SM-13 — Toast de bienvenue après un signup

> ✅ **Ce qu'on vérifie :**
> - Après un signup réussi, le toast « Bienvenue {prénom}, ton compte est créé. » s'affiche sur l'accueil.
> - Smoke en complément de l'unitaire : le choix du message selon l'origine est testé en unitaire, mais le transport de l'origine jusqu'à l'accueil (état de navigation de React Router) et l'affichage du toast Sonner sont réels.

Précondition : aucune session, page http://localhost:5173/signup ouverte.

1. Saisir « Marc » dans le champ « Prénom* ».
2. Saisir « marc+<horodatage>@test.dev » dans le champ « Email* ».
3. Saisir « motdepasse123 » dans le champ « Mot de passe* ».
4. Cliquer sur le bouton « Créer un compte ».

Attendu : sur l'accueil, un toast s'affiche en haut à droite avec le texte « Bienvenue Marc, ton compte est créé. » et un bouton de fermeture (croix).

- [ ] Vérifié

---

### SM-14 — Toast de retour après un signin

> ✅ **Ce qu'on vérifie :**
> - Après un signin réussi, le toast « Content de te revoir {prénom}. » s'affiche sur l'accueil, et non le toast de bienvenue.
> - Smoke en complément de l'unitaire : même raison que SM-13.

Précondition : compte de référence existant, aucune session, page http://localhost:5173/signin ouverte.

1. Saisir « marc.developpeur@gmail.com » dans le champ « Email ».
2. Saisir « motdepasse123 » dans le champ « Mot de passe ».
3. Cliquer sur le bouton « Me connecter ».

Attendu : sur l'accueil, un toast s'affiche en haut à droite avec le texte « Content de te revoir Marc. » et un bouton de fermeture (croix). Le texte « Bienvenue » n'apparaît pas.

- [ ] Vérifié

---

### SM-15 — Pas de toast après un rechargement

> ✅ **Ce qu'on vérifie :**
> - Après l'arrivée sur l'accueil avec le toast, recharger la page ne refait pas apparaître le toast.
> - Smoke parce que l'état de navigation de React Router survit au rechargement : ce qui est vérifié, c'est que l'origine est effacée une fois le toast affiché, dans le vrai navigateur.

Précondition : SM-14 vient d'être joué dans cet onglet (connecté, sur l'accueil, toast « Content de te revoir Marc. » affiché ou déjà disparu).

1. Recharger la page.

Attendu : l'accueil connecté s'affiche (« Quoi de neuf aujourd'hui, Marc ? ») et aucun toast n'apparaît, y compris en attendant 5 secondes.

- [ ] Vérifié

---

### SM-16 — Pas de toast après « retour » puis « avancer »

> ✅ **Ce qu'on vérifie :**
> - Revenir sur l'accueil par l'historique du navigateur ne refait pas apparaître le toast.
> - Smoke parce que cela dépend du vrai historique du navigateur et de l'effacement de l'origine dans l'entrée d'historique.

Précondition : SM-14 vient d'être joué dans cet onglet (connecté, sur l'accueil, toast affiché ou déjà disparu).

1. Cliquer sur le bouton « Précédent » du navigateur.
2. Cliquer sur le bouton « Suivant » du navigateur.

Attendu : à aucune des 2 étapes un toast n'apparaît, et après l'étape 2 l'accueil connecté s'affiche (« Quoi de neuf aujourd'hui, Marc ? »).

- [ ] Vérifié

---

### SM-17 — Pas de toast à l'ouverture directe avec une session persistée

> ✅ **Ce qu'on vérifie :**
> - Un utilisateur déjà connecté qui ouvre directement l'accueil voit la page personnalisée, sans toast.
> - Smoke parce que cela dépend de la vraie session persistée par cookie et de l'absence d'origine dans une navigation neuve.

Précondition : SM-12 a été joué dans cette fenêtre de navigateur (session active).

1. Ouvrir un nouvel onglet sur http://localhost:5173/.

Attendu : l'accueil connecté s'affiche (« Quoi de neuf aujourd'hui, Marc ? ») et aucun toast n'apparaît.

- [ ] Vérifié

---

### 5. Sign out et fin de session

| RM | Inventaire | Ce qu'on vérifie | Scénario |
|---|---|---|---|
| RM5 | 🔴 | Déconnexion : session fermée, accueil non connecté, ni modale ni toast | SM-18 |
| RM31 | 🔴 | Session expirée : au chargement suivant, accueil non connecté, sans message | SM-19 |

### SM-18 — Déconnexion silencieuse

> ✅ **Ce qu'on vérifie :**
> - Le clic sur « Se déconnecter » ferme la session et l'accueil repasse en état non connecté, sans modale de confirmation ni toast.
> - Smoke parce que la fermeture de session est faite par l'API ; le rechargement vérifie que la session est bien fermée côté serveur, et pas seulement masquée à l'écran.

Précondition : connecté avec le compte de référence, sur http://localhost:5173/, aucun toast visible.

1. Cliquer sur le bouton « Se déconnecter ».
2. Recharger la page.

Attendu : après l'étape 1, l'accueil visiteur s'affiche (« Prêt(e) pour ton daily standup ? », « Se connecter » et « Créer un compte » dans le header), sans fenêtre de confirmation ni toast. Après l'étape 2, l'accueil reste en état visiteur.

- [ ] Vérifié

---

### SM-19 — Session expirée : accueil non connecté, sans message

> ✅ **Ce qu'on vérifie :**
> - Quand la session a expiré côté serveur, le chargement suivant affiche l'accueil visiteur sans aucun message.
> - Smoke parce que l'expiration est un comportement de Better Auth : le navigateur envoie toujours son cookie, c'est le backend qui répond une session `null`.

Précondition : connecté avec le compte de référence, sur http://localhost:5173/. Dans la base du backend, la date `expiresAt` de cette session (table `Session`, `kommit-backend/prisma/schema.prisma`) est passée dans le passé, par exemple via Prisma Studio. Supprimer le cookie dans le navigateur ne convient pas : ce serait le cas de SM-1, pas une expiration.

1. Recharger la page.

Attendu : l'accueil visiteur s'affiche (« Prêt(e) pour ton daily standup ? », « Se connecter » et « Créer un compte » dans le header), sans toast, sans modale et sans message d'erreur.

- [ ] Vérifié
