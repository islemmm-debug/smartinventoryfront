import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NbCardModule, NbLayoutModule, NbButtonModule } from '@nebular/theme';

@Component({
  selector: 'app-pending-approval',
  standalone: true,
  imports: [RouterLink, NbCardModule, NbLayoutModule, NbButtonModule],
  template: `
    <nb-layout>
      <nb-layout-column class="column">
        <nb-card>
          <nb-card-header>Compte créé</nb-card-header>
          <nb-card-body>
            <p>
              Votre demande a été enregistrée. Un <strong>administrateur</strong> doit activer votre compte et vous
              attribuer un <strong>rôle</strong> avant que vous puissiez vous connecter.
            </p>
            <p class="hint">Mode démo front : aucun envoi réel vers le serveur tant que l’API n’est pas branchée.</p>
          </nb-card-body>
          <nb-card-footer>
            <a nbButton routerLink="/auth/login" status="primary">Retour à la connexion</a>
          </nb-card-footer>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
  styles: [
    `
      .column {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
      }
      nb-card {
        max-width: 480px;
        width: 100%;
      }
      .hint {
        font-size: 13px;
        opacity: 0.85;
        margin-top: 12px;
      }
    `,
  ],
})
export class PendingApprovalComponent {}
