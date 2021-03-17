import { Injectable } from '@angular/core'

export enum CacheKeys {
  termsAgreed = 'termsAgreed',
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor() {}

  delete(key: CacheKeys) {
    return localStorage.removeItem(key)
  }

  set<T>(key: CacheKeys, value: string) {
    return localStorage.setItem(key, value)
  }

  get<T>(key: CacheKeys): string | null {
    return localStorage.getItem(key)
  }
}
