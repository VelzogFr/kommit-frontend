# kommit-frontend

Le repo frontend de Kommit, une application React qui parle au backend Kommit. Le backend vit dans un repo séparé (`kommit-backend`) : rien ici ne le modifie.

## Arborescence

```
kommit-frontend/
├── CLAUDE.md      # ce fichier
├── .claude/
│   ├── rules/     # les règles de code, valables partout dans le repo
│   └── skills/    # les skills du projet
├── docs/          # la doc du projet (stack technique, décisions)
├── e2e/           # les tests end-to-end Playwright, un fichier par parcours
├── maquettes/     # les extractions brutes des maquettes (code, assets, screenshots, FLOW.md), une série par dossier
├── public/        # les fichiers servis tels quels par Vite
├── src/           # le code de l'application
└── testing/       # les inventaires et scénarios de smoke des tickets
```

Le détail de `src/` est dans `.claude/rules/architecture-frontend.md` : c'est cette rule qui fait foi sur le découpage en couches.

> **À maintenir :** dès qu'un dossier de premier niveau est ajouté ou supprimé dans le repo, mettre à jour cette arborescence en conséquence (ajouter/retirer la ligne + son commentaire de rôle).
