import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { url } from 'inspector'
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
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: environment.backendApiKey,
    }),
  }

  private mailChimpUrl = `https://user1:${environment.mailchimpApiKey}@us17.api.mailchimp.com/3.0`
  private corsURL = 'https://cors-proxy.airgap.prod.gke.papers.tech/proxy?url='
  private listId = '8636bff37b'

  constructor(private readonly http: HttpClient) {}

  getAllBidsForAllAuctions() {
    return this.http
      .get<{ [key: string]: number }>(
        `${environment.indexerUrl}auction/operations/count?groupBy=storage_diff.children.1.children.0.name`
      )
      .toPromise()
  }

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
    const result = this.http.post<TransactionBody>(
      requestUrl,
      body,
      this.options
    )
    result.subscribe((response) =>
      console.log('response api posting: ', response)
    )
    return result
  }

  getMembers(): Observable<any> {
    console.log(new Date().getTime())

    const options = {
      withCredential: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        apikey: environment.mailchimpApiKey,
      }),
    }
    const result = this.http.get(
      `${this.corsURL}${this.mailChimpUrl}/lists/${this.listId}/members`,
      options
    )
    return result
  }

  addMember(email: string): Observable<any> {
    const body = {
      email_address: email,
      email_type: 'html',
      status: 'subscribed',
      merge_fields: {},
      interests: {},
      language: '',
      vip: false,
      location: { latitude: 0, longitude: 0 },
      marketing_permissions: [],
      ip_signup: '',
      timestamp_signup: '',
      ip_opt: '',
      timestamp_opt: '',
      tags: [],
    }

    const options = {
      withCredential: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        apikey: environment.mailchimpApiKey,
      }),
    }
    const result = this.http.post(
      `${this.corsURL}${this.mailChimpUrl}/lists/${this.listId}/members`,
      body,
      options
    )
    return result
  }
}
