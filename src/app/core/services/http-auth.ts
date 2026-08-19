import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, PLATFORM_ID, Service } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Service()
export class HttpAuth {
    private BASE_URL: string = environment.apiUrl

//claves para almacenar el token y el usuario en localStorage 
    private readonly TOKEN_KEY = 'token';
    private readonly USER_KEY = 'user';

    private http = inject(HttpClient);
    private router = inject(Router);
    private platFormId = inject(PLATFORM_ID);               // OBTENGO EL ID DE ANGULAR PARA IDENTIFICAR SPAs O SSR
    private isBrowser: boolean = isPlatformBrowser(this.platFormId)

    //persistencia de datos en la app
    currentUser$ = new BehaviorSubject<any>(this.getUserFromStorage());
    currentToken$ = new BehaviorSubject<any>(this.getTokenFromStorage());

    user$ = this.currentUser$.asObservable();
    token$ = this.currentToken$.asObservable();

    register(newUser: any) {
    return this.http.post(`${this.BASE_URL}/auth/register`, newUser);
    }

    loginUser(credentials: any) {
        // credentias { "email": "amed@example.com", "password": "123456789" }
        return this.http.post<any>(`${this.BASE_URL}/auth/login`, credentials).pipe(
            // Sirve para generar acciones de acuerdo a X o Y dato
            tap((res) => {

                // Verificamos que la respuesta contenga las propiedades esperadas
                if (res?.token && res?.data) {

                    this.setAuthData(res.token, res.data);
                    // this.saveDataLocalStorage(res.token, res.data)

                    // Redireccionamos
                    this.router.navigateByUrl('/dashboard');
                }

                //console.log( data );
            }),
            map((data) => data.msg),
            catchError((err: HttpErrorResponse) => {

                if(!err.error?.msg){
                    err.error.msg = 'No se puede iniciar sesion '
                }

                console.error(err);

                return throwError(() => err );
            })
        )
    }

    setAuthData(token:string, user: any): void {
        this.token = token;
        this.user = user;

        }

    getDataLocalStorage(): any {
        let token;
        let user;

        //verificando el tipo de app que estamos ejecutanco (SSR O SPA)
        if (isPlatformBrowser(this.platFormId)) {
            const valueKeyToken = localStorage.getItem('token'); 
            const token = valueKeyToken ? valueKeyToken: null;

            const valueKeyUser = localStorage.getItem ('user');
            const user = valueKeyUser ? JSON.parse(valueKeyUser ): null;
            
            this.currentToken$.next (token);  //actualizamos el token en el Behaviorsubject
            this.currentUser$.next(user);     //actualizamos el usuario en el Behaviorsubject

            return {
                token, 
                user
            };
        }

    }

    deleteDataLocalStorage (){
        if (isPlatformBrowser(this.platFormId)) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }

        this.currentToken$.next(null);
        this.currentUser$.next(null);

    }

    clearAuthData():void{
        this.token = null;
        this.user = null;

    }
   
    logoutUser(): void{
       this.clearAuthData();        //redireccionamos
    }

    checkAuth(){
        
    }

    isLoggedIn(): boolean{
        return !!this.token && !!this.user;
    }


    private getTokenFromStorage(): string | null {
        if (this.isBrowser){
            return localStorage.getItem(this.TOKEN_KEY);
        }
        return null;
    }

    private getUserFromStorage(): string | null {
        if (this.isBrowser){
            const user = localStorage.getItem(this.USER_KEY);
            return user ? JSON.parse(user): null;
        }
        return null;
    }


   set token (token: string | null) {
    if (this.isBrowser) {
        if (token){
            localStorage.setItem(this.TOKEN_KEY, token);
        } else {
            localStorage.removeItem(this.TOKEN_KEY);
        }
    }
    this.currentToken$.next(token);
    console.log('[Setter Token]:', token);
   }

   set user (user: any) {
    if (this.isBrowser){
        if (user) {
            localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(this.USER_KEY);
        }
    }

    this.currentUser$.next(user);
    console.log('[Setter User]:', user);
   }

   get token(): string | null {
    return this.currentToken$.getValue();
   }

   get user(): any {
    return this.currentUser$.getValue();
   }
 
}
