import { Routes } from '@angular/router';
import { HomeComponent } from './components/user/home/home.component';
import { LoginRegisterComponent } from './components/user/login-register/login-register.component';
import { PlayerDashboardComponent } from './components/player-dashboard/player-dashboard.component';
import { SpectatorDashboardComponent } from './components/spectator-dashboard/spectator-dashboard.component';
import { UserComponent } from './components/user/user.component'; 
import { ManageUserComponent } from './components/admin/manage-user/manage-user.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { ManagePlayerComponent } from './components/admin/manage-player/manage-player.component';
import { ManageTeamComponent } from './components/admin/manage-team/manage-team.component';
import { ManageMatchComponent } from './components/admin/manage-match/manage-match.component';
import { ManageTournamentComponent } from './components/admin/manage-tournament/manage-tournament.component';

export const routes: Routes = [
    {path:'', component:UserComponent, children:[
        {path:'', component:HomeComponent},
        {path:'login', component:LoginRegisterComponent}
    ]},
    { path: 'login', component: LoginRegisterComponent },
    { path: 'admin', component: AdminComponent, children:[
        {path:"", component:DashboardComponent},
        {path:"dashboard", component:DashboardComponent},
        {path:"manage-users", component:ManageUserComponent},
        {path:"manage-players", component:ManagePlayerComponent},
        {path:"manage-teams", component:ManageTeamComponent},
        {path:"manage-matches",component:ManageMatchComponent},
        {path:"manage-tournaments", component:ManageTournamentComponent}
    ] },
    { path: 'player-dashboard', component: PlayerDashboardComponent },
    { path: 'spectator-dashboard', component: SpectatorDashboardComponent }
];
