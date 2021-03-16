import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private mailChimpUrl = `https://user1:${environment.mailchimpApiKey}@us17.api.mailchimp.com/3.0/ping`
  constructor(private readonly http: HttpClient) {}

  testRequest(): Observable<any> {
    console.log('its happening')
    return this.http.get(this.mailChimpUrl)
  }
}
