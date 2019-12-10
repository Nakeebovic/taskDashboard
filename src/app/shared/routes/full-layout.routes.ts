import { Routes, RouterModule } from "@angular/router";

//Route for content layout with sidebar, navbar and footer
export const Full_ROUTES: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomeModule'
  },
  { path: "promo", loadChildren: "./pages/promo/promo.module#PromoModule" },
  { path: "trans", loadChildren: "./pages/trans/trans.module#TransModule" },
  { path: "users", loadChildren: "./pages/users/users.module#UsersModule" },
  { path: "admins", loadChildren: "./pages/admins/admins.module#AdminsModule" },
  { path: "category", loadChildren: "./pages/category/category.module#CategoryModule" },

];


