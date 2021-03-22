import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

export interface TransactionBody {
  name: string
  operation_hash: string
  tezos_address: string
  token_id: number
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public url = environment.backendUrl
  public options = {
    withCredential: true,
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ApiKey: environment.backendApiKey,
    }),
  }

  constructor(private readonly http: HttpClient) {}

  postTransaction(
    name: string,
    operationHash: string,
    tzAddress: string,
    tokenId: number
  ): Observable<any> {
    const body: TransactionBody = {
      name: name,
      operation_hash: operationHash,
      tezos_address: tzAddress,
      token_id: tokenId,
    }
    const requestUrl = `${this.url}/api/mapping-sold/`
    const result = this.http.post<TransactionBody>(requestUrl, body)
    return result
  }
}
