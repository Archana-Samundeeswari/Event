import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service'; 

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("authToken");
  const router = inject(Router);
  const authService = inject(AuthService); // Inject AuthService

  console.log("Token:", token);

  // Helper function to check if the token is expired
  const isTokenExpired = (token: string | null): boolean => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      return payload.exp < currentTime; // Compare expiry time with current time
    } catch (e) {
      console.error("Failed to decode token:", e);
      return true; // Treat as expired if decoding fails
    }
  };

  // Check if the request is for login, register, or if token is absent/expired
  if (req.url.includes('/login') || req.url.includes('/register') || !token || isTokenExpired(token)) {
    if (isTokenExpired(token)) {
      console.log("Token is expired. Logging out.");
      authService.logout(); // Perform logout if token is expired
      router.navigate(['/login']); // Navigate to login page
    }
    return next(req); // Pass original request
  }

  // Clone the request and add the Authorization header
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: "Bearer " + token
    }
  });

  // Pass the cloned request to the next handler
  return next(clonedRequest).pipe(
    catchError(error => {
      if (error.status === 403 || error.status === 401) {
        console.error('Unauthorized or forbidden. Logging out.');
        authService.logout(); // Log the user out
        router.navigate(['/login']); // Redirect to login page
      }
      return throwError(() => new Error(`HTTP Error: ${error.message || 'Unknown error'}`)); // Provide meaningful error
    })
  );
};
