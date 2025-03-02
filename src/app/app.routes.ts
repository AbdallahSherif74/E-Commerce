import { ShopByBrandComponent } from './pages/shop-by-brand/shop-by-brand.component';
import { AllordersComponent } from './pages/allorders/allorders.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { DetailsComponent } from './pages/details/details.component';
import { Routes, Route } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';
import { RenderMode , ServerRoute} from '@angular/ssr';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '',
        component: AuthLayoutComponent,
        canActivate:[loggedGuard],
        children: [
            {
                path: 'login',
                loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
                title: 'Login'
            },
            {
                path: 'register',
                loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
                title: 'Register'
            },
            {
                path: 'forgot',
                loadComponent: () => import('./components/forgotpassword/forgotpassword.component').then(m => m.ForgotpasswordComponent),
                title: 'forgotPassword'
            }
        ]
    },
    {
        path: '',
        component: BlankLayoutComponent,
        canActivate:[authGuard],
        children: [
            {
                path: 'home',
                loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
                title: 'Home',
                data:{breadcrumb :"Home"},
                
            },
            {
                path: 'brands',
                loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent),
                title: 'Brands',
                data:{breadcrumb :"Brands"}
            },
            {
                path: 'wishlist',
                loadComponent: () => import('./pages/wishlist/wishlist.component').then(m => m.WishlistComponent),
                title: 'wishlist',
                data:{breadcrumb :"Wishlist"}
            },
            {
                path: 'cart',
                loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent),
                title: 'Cart',
                data: { breadcrumb: "Cart" },
                
            },
            {
                path: 'categories',
                loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent),
                title: 'Categories',
               
                
            },
            {
                path: 'checkout/:id',
                loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent),
                title: 'Checkout',
                data: { breadcrumb: "Checkout", rendererMode:RenderMode.Server},
               
            },
            {
                path: 'subcategories/:id/:name',
                loadComponent: () => import('./pages/subcategories/subcategories.component').then(m => m.SubcategoriesComponent),
                title: 'Subcategories',
                data: { breadcrumb: "Subcategories", rendererMode:RenderMode.Server }
            },
            {
                path: 'shopByBrand/:id/:name',
                loadComponent: () => import('./pages/shop-by-brand/shop-by-brand.component').then(m => m.ShopByBrandComponent),
                title: 'Shop By Brand',
                data: { breadcrumb: "Shop By Brand", rendererMode:RenderMode.Server }
            },
            {
                path: 'products',
                loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent),
                title: 'Products',
                data:{breadcrumb :"Products"}
            },
            {
                path: 'allorders',
                loadComponent: () => import('./pages/allorders/allorders.component').then(m => m.AllordersComponent),
                title: 'allorders',
                data:{breadcrumb :"All Orders"}
            },
            {
                path: 'details/:id',
                loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent),
                title: 'Details',
                data: { breadcrumb: "Details", rendererMode:RenderMode.Server }
            },
            {
                path: '**',
                component: NotfoundComponent,
                title: 'Not Found',
                
            }
        ]
    }
];
