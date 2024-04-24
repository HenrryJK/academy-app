import { Injectable, NgZone } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { StorageService } from '../services/storage-service/storage.service';
import { AUTH_TOKEN_KEY } from '../shared/static/storage.static';




@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private readonly storageService: StorageService,
        private zone: NgZone,
    ) { }
    canActivate(): boolean {
        const token: string | null = this.storageService.get(AUTH_TOKEN_KEY);
        console.log('token auth guards', token);
        if (!token) {
            this.zone.run(() => {
                this.router.navigate(['/login']);
            });
            return false;
        }

        return true;
    }
}
