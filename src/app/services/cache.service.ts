import { Injectable } from '@angular/core'
import { StorageMap } from '@ngx-pwa/local-storage'
import { Observable } from 'rxjs'

export enum CacheKeys {
  termsAgreed = 'termsAgreed',
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor(private readonly storage: StorageMap) {}

  delete(key: CacheKeys): Observable<undefined> {
    return this.storage.delete(key)
  }

  set<T>(key: CacheKeys, value: T): Observable<undefined> {
    return this.storage.set(key, value)
  }

  get<T>(key: CacheKeys): Observable<T> {
    return <Observable<T>>this.storage.get(key)
  }
}
