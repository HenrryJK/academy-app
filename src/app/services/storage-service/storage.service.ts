import { Injectable } from "@angular/core";

import * as KEYS from '../../shared/static/storage.static';

type Values<T> = T extends { [s: string]: infer O } ? O : never;

const STORAGE_KEYS = Object.values(KEYS).filter(s => s !== KEYS.PRENAME) as Exclude<
    Values<typeof KEYS>,
    typeof KEYS.PRENAME
>[];

@Injectable({
    providedIn: 'root',
})

export class StorageService {
    set<T>(name: string, value: T): void {
        localStorage.setItem(`${KEYS.PRENAME}:${name}`, JSON.stringify(value));
    }

    get<T>(name: string): T | null {
        try {
            return JSON.parse(localStorage.getItem(`${KEYS.PRENAME}:${name}`) ?? 'null');
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    removeItem(name: string): void {
        localStorage.removeItem(`${KEYS.PRENAME}:${name}`);
    }

    clear(): void {
        for (const name of STORAGE_KEYS) {
            this.removeItem(name);
        }
    }



}







