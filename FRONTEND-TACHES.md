# Tâches frontend — Smart Inventory (sans backend)

Objectif : avancer sur **interfaces**, **navigation**, **données fictives** et **contrats TypeScript** pour brancher l’API plus tard.

Légende : `[ ]` à faire · `[~]` en cours · `[x]` fait

---

## Phase A — Fondations (priorité haute)

- [ ] **Routage principal** : sous `ShellComponent`, enfants lazy pour `/dashboard`, `/products`, `/stock`, `/movements`, `/alerts`, `/stores`, `/reports`, `/admin/users` (aujourd’hui la sidebar pointe vers des URLs inexistantes dans `app.routes.ts`).
- [ ] **Guards** : appliquer `authGuard` sur toutes les routes « app » ; `roleGuard` (ou équivalent) sur `/admin/*` ; aligner les redirections (`/auth/login` vs `/login` — le guard utilise actuellement `['/login']`).
- [ ] **Couche « API future »** : pour chaque feature, un **service** avec `of(mockData).pipe(delay(300))` ou `HttpClient` commenté + `environment.useMock = true` — un seul endroit à basculer quand le backend est prêt.
- [ ] **Modèles** : vérifier que `User`, `Role`, `Permission`, `Product`, `Stock`, etc. (`core/models`) correspondent au diagramme / cahier ; ajouter `PendingUser`, `RegisterResponse` si besoin.
- [ ] **Interceptor erreurs** : brancher `error.interceptor` (toast / message utilisateur) pour simuler 401, 403, compte en attente.

---

## Phase B — Authentification & inscription (cahier + workflow admin)

- [ ] **Register** : formulaire relié à un `AuthService.register()` mock (succès → message + redirection vers login ou page « en attente »).
- [ ] **Page `pending-approval`** : texte clair (« votre compte doit être validé par un administrateur ») + lien vers login.
- [ ] **Login** : états UI mock — succès admin / gestionnaire / magasinier ; simuler **403 compte inactif** avec message dédié.
- [ ] **Mot de passe oublié** : maquette flux (formulaire + message « email envoyé ») sans API réelle.

---

## Phase C — Layout & navigation

- [ ] **Navbar** : titre de page dynamique, profil utilisateur mock, déconnexion.
- [ ] **Sidebar** : visibilité des entrées selon **rôle mock** (Admin vs Gestionnaire vs Magasinier), cohérent avec le cahier §2.2.
- [ ] **Breadcrumbs** ou titre de section (optionnel, selon temps).

---

## Phase D — Écrans métier (maquettes cahier §7.3)

### D1 — Dashboard (`/dashboard`)

- [ ] Cartes : stock total, ruptures, alertes actives, placeholder graphique, bloc « Prévisions IA » (données statiques ou `dashboard.service` mock).

### D2 — Produits (`/products`)

- [ ] Liste tableau (référence, nom, catégorie, stock) + recherche / filtres mock.
- [ ] Modales ou pages : ajouter / modifier (formulaires validés, pas d’API).

### D3 — Mouvements (`/movements`)

- [ ] Formulaire entrée / sortie / transfert (champs du modèle `MouvementStock`).
- [ ] Zone « scan » placeholder (champ texte + bouton) en attendant le vrai scan.

### D4 — Alertes (`/alerts`)

- [ ] Liste avec type, article, magasin, statut ; bouton « Marquer comme traitée » (mise à jour locale / mock).

### D5 — Magasins (`/stores`)

- [ ] Liste magasins + stock par magasin (données `stores.data` / `stock` mock).
- [ ] UI transfert (wizard simple ou modale).

### D6 — Stock (`/stock`)

- [ ] Vue consolidée ou par magasin ; cohérent avec les seuils min/max du modèle article.

### D7 — Rapports & IA (`/reports`)

- [ ] Placeholders graphiques / tableaux + texte « données IA simulées ».

---

## Phase E — Administration (§2.2.1 cahier)

- [ ] **`/admin/users`** : liste utilisateurs avec colonne **Actif** (`isActive`).
- [ ] Filtrer **en attente** (`isActive === false`).
- [ ] Actions mock : **Approuver** (passe `isActive` à true), **Assigner rôle** (Admin / Gestionnaire / Magasinier), aligné `UserRole` / diagramme.
- [ ] (Option) Écran **rôles & permissions** : lecture seule des `Role` / `Permission` depuis mock `role.model`.

---

## Phase F — Finitions avant branchement API

- [ ] Retirer ou désactiver la bannière de test API dans `app.component.ts` quand plus nécessaire.
- [ ] **README** développeur : liste des endpoints attendus par écran (contrat minimal).
- [ ] Tests smoke manuels : chaque route chargée sans erreur console.
- [ ] (Option) Responsive : vérifier sidebar mobile (drawer).

---

## Ordre suggéré pour gagner du temps

1. Phase A (routing + guards + mock flag)  
2. Phase B + C (auth complète côté UX + shell propre)  
3. D1 → D2 → D3 (cœur métier du PFE)  
4. D4, D5, D6, D7  
5. Phase E  
6. Phase F  

---

## Fichiers déjà utiles dans le repo

- Modèles : `src/app/core/models/*.model.ts`
- Données mock : `src/app/features/*/data/*.data.ts`
- Services : `src/app/features/*/services/*.service.ts`
- Shell / sidebar : `src/app/core/layout/`
