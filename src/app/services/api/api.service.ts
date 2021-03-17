import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { url } from 'inspector'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private mailChimpUrl = `https://user1:${environment.mailchimpApiKey}@us17.api.mailchimp.com/3.0/ping`
  private corsURL = 'https://cors-proxy.airgap.prod.gke.papers.tech/proxy?url='
  constructor(private readonly http: HttpClient) {
    console.log('environment apikey', environment.mailchimpApiKey)
  }

  testRequest(): Observable<any> {
    const options = {
      withCredential: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        apikey: environment.mailchimpApiKey,
      }),
    }
    const result = this.http.get(`${this.corsURL}${this.mailChimpUrl}`, options)
    return result
  }
}
