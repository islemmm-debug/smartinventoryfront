// src/app/environment/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5280/swagger/index.html',
  /** Connexion sans backend : email contenant « admin », « manager » ou autre → rôle mock. */
  useMockAuth: true,
  /** Données métier en mémoire (services locaux). Passer à false quand les HttpClient sont branchés. */
  useMockData: true,
  /** Petite bannière « API status » en bas à droite (désactivée par défaut). */
  showApiDebugBanner: false,
};