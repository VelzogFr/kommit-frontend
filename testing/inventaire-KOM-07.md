# Inventaire de test : KOM-07 · Authentification · frontend

Source : ticket Notion KOM-07 (https://app.notion.com/p/3ac0cd6b95d080f39307e0bef7545070).
Doctrine appliquée : `docs/testing-strategy.md`. Codes d'erreur lus dans `src/types/apiContract.ts`.
Décisions du 2026-10-15 : formulaires gérés avec react-hook-form + Zod ; origine du toast transportée dans l'état de navigation de React Router, effacée après lecture.
Les paquets et le découpage des RM sont ceux du ticket, dans son ordre.

### 1. Page d'accueil

| RM | Ce qu'on vérifie | Testable unitaire ? | Pourquoi | Comment |
|---|---|---|---|---|
| RM1 | Visiteur non connecté : l'accueil affiche le message d'accueil et les boutons « Se connecter » / « Créer un compte » dans le header | 🔴 | La décision « session `null` → état non connecté » est un simple test de nullité, et le reste est du rendu statique (`tests.md` : ne pas tester). Ce qui peut casser, c'est la vraie réponse de session de l'API sans cookie. | Manuel (smoke navigateur) |
| RM2 | Utilisateur connecté : le corps affiche « Quoi de neuf aujourd'hui, {prénom} ? » (texte de la maquette, qui fait foi sur le ticket : décision du 2026-10-15) | 🟠 | La composition de la phrase à partir de `SessionUser.name` est à nous. Le prénom, lui, vient de la vraie session (cookie envoyé avec `credentials: 'include'`, contrainte technique) : un unitaire vert ne prouve pas qu'il arrive à l'écran. | Unitaire (composition du titre) + smoke manuel |
| RM15 | Le lien « ViDev » du footer ouvre la chaîne YouTube dans un nouvel onglet | 🔴 | L'ouverture d'un nouvel onglet est un comportement du navigateur (`target="_blank"`), aucune logique à nous. | Manuel (smoke navigateur) |

### 2. Navigation entre les pages

| RM | Ce qu'on vérifie | Testable unitaire ? | Pourquoi | Comment |
|---|---|---|---|---|
| RM6 | Clic sur « Créer un compte » → page de signup | 🔴 | Navigation réelle portée par React Router, aucune décision à nous. | Manuel (smoke navigateur) |
| RM7 | Clic sur « Se connecter » → page de signin | 🔴 | Navigation réelle portée par React Router, aucune décision à nous. | Manuel (smoke navigateur) |

### 3. Formulaire d'authentification

| RM | Ce qu'on vérifie | Testable unitaire ? | Pourquoi | Comment |
|---|---|---|---|---|
| RM32 | Le bouton « Me connecter » est désactivé tant que les champs sont vides | 🟢 | Décision d'état du bouton, calculable à partir des valeurs saisies. Un champ fait uniquement d'espaces compte comme vide, comme le prénom du signup (décision du 2026-10-15). | Unitaire, test-first |
| RM33 | Le bouton « Créer un compte » est désactivé tant qu'un champ requis est vide ; un prénom fait d'espaces compte comme vide | 🟢 | Décision d'état du bouton, avec trim du prénom : fonction pure. | Unitaire, test-first |
| RM10, RM11, RM20 | Signup : prénom trimé non vide, email bien formé, mot de passe ≥ 8 caractères. Signin : aucun format vérifié | 🟢 | Les 3 critères sont des règles métier à nous, même si le schéma Zod les applique. Les tests passent par notre schéma et testent chaque règle à sa frontière (7 caractères refusés / 8 acceptés, prénom `"   "` refusé, email sans `@` refusé), pas le comportement général des primitives Zod. Ils servent de documentation des règles et restent valables si Zod est remplacé (décision du 2026-10-15). | Unitaire, test-first |
| RM30 | Les erreurs de format s'affichent à la 1re soumission, puis se mettent à jour pendant la saisie | 🔴 | Ce moment d'affichage est le réglage de react-hook-form (`mode: 'onSubmit'`, `reValidateMode: 'onChange'`) : le tester en unitaire reviendrait à tester la librairie (`tests.md`). Reste à vérifier le résultat à l'écran. | Manuel (smoke navigateur) |
| RM17 | Pendant l'appel, bouton désactivé, spinner à la place du libellé, libellé aria « Connexion en cours » / « Création du compte en cours » | 🟠 | Le choix « désactivé si requête en vol » et le libellé aria selon le formulaire sont à nous. L'état « en vol » vient de la vraie requête (TanStack Query) et le spinner est du rendu. | Unitaire (état du bouton + libellé aria) + smoke manuel |
| RM16 | Double-clic sur le bouton : une seule requête part | 🔴 | Le ticket fait reposer la garantie sur le bouton désactivé de RM17, donc sur le navigateur qui ignore les clics sur un bouton `disabled`. La décision à nous est déjà couverte par RM17. | Manuel (smoke navigateur) |
| RM9, RM13 | Le message affiché dépend du `code` de l'`ApiError` : email déjà pris (sous le champ email), identifiants invalides (message générique global) | 🟠 | Reformulée côté front : l'unicité de l'email et la vérification des identifiants sont du backend. Ce que le front décide, c'est le mapping `EMAIL_ALREADY_EXISTS` / `INVALID_CREDENTIALS` → message et emplacement (fixé par `apiContract.ts`). Mais rien ne prouve en unitaire que le backend renvoie bien ces codes dans un `ApiError` (erreurs de Better Auth à emballer) : un smoke contre le vrai backend le vérifie (décision du 2026-10-15). | Unitaire (mapping code → message) + smoke manuel |
| RM8, RM12 | Signup ou signin réussi → retour sur l'accueil, connecté | 🔴 | Dépend de la vraie session Better Auth, du cookie cross-origin (`credentials: 'include'`, contrainte technique) et de la navigation réelle. Le ticket dit lui-même que sans ce réglage ces RM ne passent jamais, ce qu'aucun unitaire ne détecte. | Manuel (smoke navigateur) |

### 4. Le toast d'arrivée

| RM | Ce qu'on vérifie | Testable unitaire ? | Pourquoi | Comment |
|---|---|---|---|---|
| RM3, RM4 | Après signup : « Bienvenue {prénom}, ton compte est créé. » ; après signin : « Content de te revoir {prénom}. » | 🟠 | Le choix du message selon l'origine (signup / signin) et le prénom est à nous. Le transport de l'origine jusqu'à l'accueil (contrainte technique : `SessionUser` ne la porte pas) et l'affichage du toast Sonner sont réels. | Unitaire (choix du message selon l'origine) + smoke manuel |
| RM24, RM25 | Le toast ne réapparaît pas après rechargement ou « retour » ; ouverture directe de l'accueil avec session persistée → pas de toast | 🔴 | Ce qui est vérifié, c'est l'effacement de l'origine une fois utilisée (contrainte technique). L'origine passe par l'état de navigation de React Router, qui survit au rechargement : il faut remplacer l'entrée d'historique sans état une fois le toast affiché. Ce comportement dépend du vrai navigateur (historique, rechargement). Le cas « pas d'origine → pas de message » est absorbé par l'unitaire de RM3, RM4. | Manuel (smoke navigateur) |

### 5. Sign out et fin de session

| RM | Ce qu'on vérifie | Testable unitaire ? | Pourquoi | Comment |
|---|---|---|---|---|
| RM5 | Clic sur « Déconnexion » : session fermée, accueil non connecté, ni modale ni toast | 🔴 | La fermeture de session est faite par l'API, le retour à l'état non connecté dépend de la vraie réponse de session. L'absence de modale et de toast est un constat d'affichage. | Manuel (smoke navigateur) |
| RM31 | Session expirée : au chargement suivant, accueil non connecté, sans message | 🔴 | L'expiration est un comportement du backend (Better Auth). Côté front, cela revient à recevoir une session `null`, déjà le cas de RM1. | Manuel (smoke navigateur) |

## Récap

**Test unitaire automatisé (→ `unit-test-writer`)**
- RM32 : bouton « Me connecter » désactivé si champs vides.
- RM33 : bouton « Créer un compte » désactivé si champ requis vide, prénom trimé.
- RM10, RM11, RM20 : critères de validation du signup, aucun format au signin.

**Couverture partielle (🟠 : unitaire + smoke manuel)**
- RM2 : unitaire sur la composition du titre ; smoke : se connecter, vérifier que l'accueil affiche « Quoi de neuf aujourd'hui, {prénom} ? » avec le vrai prénom.
- RM9, RM13 : unitaire sur le mapping `EMAIL_ALREADY_EXISTS` / `INVALID_CREDENTIALS` → message et emplacement ; smoke : signup avec un email déjà pris, signin avec un mot de passe faux, voir le bon message.
- RM17 : unitaire sur l'état du bouton et le libellé aria ; smoke : soumettre avec un réseau ralenti, voir le bouton désactivé avec spinner.
- RM3, RM4 : unitaire sur le choix du message ; smoke : un signup réussi affiche le toast « Bienvenue… », un signin réussi affiche « Content de te revoir… ».

**Vérifié à la main (→ `smoke-test-writer`)**
- RM1 : accueil non connecté.
- RM15 : lien ViDev en nouvel onglet.
- RM6 : navigation vers le signup.
- RM7 : navigation vers le signin.
- RM16 : double-clic, une seule requête.
- RM30 : soumettre un signup invalide, voir les messages sous les champs, corriger un champ et voir son message disparaître à la frappe.
- RM8, RM12 : succès signup / signin, retour à l'accueil connecté.
- RM24, RM25 : pas de toast après rechargement, retour arrière ou ouverture directe.
- RM5 : déconnexion silencieuse.
- RM31 : session expirée, accueil non connecté sans message.
