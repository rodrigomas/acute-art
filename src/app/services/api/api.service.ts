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

const responseList = {
  lists: [
    {
      id: '8636bff37b',
      web_id: 147973,
      name: 'Newsletter Subscribers',
      contact: {
        company: 'Acute Art',
        address1: 'Somerset House',
        address2: 'Strand',
        city: 'Greater London',
        state: 'London',
        zip: 'WC2R 1LA',
        country: 'GB',
        phone: '',
      },
      permission_reminder:
        'You are receiving this email because you opted in at our website or event page.',
      use_archive_bar: true,
      campaign_defaults: {
        from_name: 'Acute Art',
        from_email: 'hello@acuteart.com',
        subject: '',
        language: 'en',
      },
      notify_on_subscribe: '',
      notify_on_unsubscribe: '',
      date_created: '2018-06-14T07:46:08+00:00',
      list_rating: 3,
      email_type_option: false,
      subscribe_url_short: 'http://eepurl.com/dyndGD',
      subscribe_url_long:
        'https://acuteart.us17.list-manage.com/subscribe?u=55c0e6d268c67a787ce9068f6&id=8636bff37b',
      beamer_address: 'us17-83cfaf85aa-33b719f93c@inbound.mailchimp.com',
      visibility: 'pub',
      double_optin: false,
      has_welcome: false,
      marketing_permissions: false,
      modules: [],
      stats: {
        member_count: 3793,
        unsubscribe_count: 210,
        cleaned_count: 79,
        member_count_since_send: 824,
        unsubscribe_count_since_send: 13,
        cleaned_count_since_send: 1,
        campaign_count: 36,
        campaign_last_sent: '2020-12-03T16:59:48+00:00',
        merge_field_count: 0,
        avg_sub_rate: 98,
        avg_unsub_rate: 6,
        target_sub_rate: 8,
        open_rate: 35.77033321390183,
        click_rate: 3.74891649812193,
        last_sub_date: '2021-03-17T09:51:24+00:00',
        last_unsub_date: '2021-01-31T01:27:06+00:00',
      },
      _links: [
        {
          rel: 'self',
          href: 'https://us17.api.mailchimp.com/3.0/lists/8636bff37b',
          method: 'GET',
          targetSchema:
            'https://us17.api.mailchimp.com/schema/3.0/Definitions/Lists/Response.json',
        },
        {
          rel: 'parent',
          href: 'https://us17.api.mailchimp.com/3.0/lists',
          method: 'GET',
          targetSchema:
            'https://us17.api.mailchimp.com/schema/3.0/Definitions/Lists/CollectionResponse.json',
          schema:
            'https://us17.api.mailchimp.com/schema/3.0/Paths/Lists/Collection.json',
        },
        {
          rel: 'update',
          href: 'https://us17.api.mailchimp.com/3.0/lists/8636bff37b',
          method: 'PATCH',
          targetSchema:
            'https://us17.api.mailchimp.com/schema/3.0/Definitions/Lists/Response.json',
          schema:
            'https://us17.api.mailchimp.com/schema/3.0/Definitions/Lists/PATCH.json',
        },
        {
          rel: 'batch-sub-unsub-members',
          href: 'https://us17.api.mailchimp.com/3.0/lists/8636bff37b',
          method: 'POST',
          targetSchema:
            'https://us17.api.mailchimp.com/schema/3.0/Definitions/Lists/BatchPOST-Response.json',
          schema:
            'https://us17.api.mailchimp.com/schema/3.0/Definitions/Lists/BatchPOST.json',
        },
        {
          rel: 'delete',
          href: 'https://us17.api.mailchimp.com/3.0/lists/8636bff37b',
          method: 'DELETE',
        },
        {
          rel: 'abuse-reports',
          href:
            'https://us17.api.mailchimp.com/3.0/lists/8636bff37b/abuse-reports',
          method: 'GET',
          targetSchema:
            'https://us17.api.mailchimp.com/schema/3.0/Definitions/Lists/Abuse/CollectionResponse.json',
          schema:
            'https://us17.api.mailchimp.com/schema/3.0/Paths/Lists/Abuse/Collection.json',
        },
        {
          rel: 'activity',
          href: 'https://us17.api.mailchimp.com/3.0/lists/8636bff37b/activity',
          method: 'GET',
          targetSchema:
            'https://us17.api.mailchimp.com/schema/3.0/Definitions/Lists/Activity/Response.json',
        },
        {
          rel: 'clients',
          href: 'https://us17.api.mailchimp.com/3.0/lists/8636bff37b/clients',
          method: 'GET',
          targetSchema:
            'https://us17.api.mailchimp.com/schema/3.0/Definitions/Lists/Clients/Response.json',
        },
        {
          rel: 'growth-history',
          href:
            'https://us17.api.mailchimp.com/3.0/lists/8636bff37b/growth-history',
          method: 'GET',
          targetSchema:
            'https://us17.api.mailchimp.com/schema/3.0/Definitions/Lists/Growth/CollectionResponse.json',
          schema:
            'https://us17.api.mailchimp.com/schema/3.0/Paths/Lists/Growth/Collection.json',
        },
        {
          rel: 'interest-categories',
          href:
            'https://us17.api.mailchimp.com/3.0/lists/8636bff37b/interest-categories',
          method: 'GET',
          targetSchema:
            'https://us17.api.mailchimp.com/schema/3.0/Definitions/Lists/InterestCategories/CollectionResponse.json',
          schema:
            'https://us17.api.mailchimp.com/schema/3.0/Paths/Lists/InterestCategories/Collection.json',
        },
        {
          rel: 'members',
          href: 'https://us17.api.mailchimp.com/3.0/lists/8636bff37b/members',
          method: 'GET',
          targetSchema:
            'https://us17.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/CollectionResponse.json',
          schema:
            'https://us17.api.mailchimp.com/schema/3.0/Paths/Lists/Members/Collection.json',
        },
        {
          rel: 'merge-fields',
          href:
            'https://us17.api.mailchimp.com/3.0/lists/8636bff37b/merge-fields',
          method: 'GET',
          targetSchema:
            'https://us17.api.mailchimp.com/schema/3.0/Definitions/Lists/MergeFields/CollectionResponse.json',
          schema:
            'https://us17.api.mailchimp.com/schema/3.0/Paths/Lists/MergeFields/Collection.json',
        },
        {
          rel: 'segments',
          href: 'https://us17.api.mailchimp.com/3.0/lists/8636bff37b/segments',
          method: 'GET',
          targetSchema:
            'https://us17.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/CollectionResponse.json',
          schema:
            'https://us17.api.mailchimp.com/schema/3.0/Paths/Lists/Segments/Collection.json',
        },
        {
          rel: 'webhooks',
          href: 'https://us17.api.mailchimp.com/3.0/lists/8636bff37b/webhooks',
          method: 'GET',
          targetSchema:
            'https://us17.api.mailchimp.com/schema/3.0/Definitions/Lists/Webhooks/CollectionResponse.json',
          schema:
            'https://us17.api.mailchimp.com/schema/3.0/Paths/Lists/Webhooks/Collection.json',
        },
        {
          rel: 'signup-forms',
          href:
            'https://us17.api.mailchimp.com/3.0/lists/8636bff37b/signup-forms',
          method: 'GET',
          targetSchema:
            'https://us17.api.mailchimp.com/schema/3.0/Definitions/Lists/SignupForms/CollectionResponse.json',
          schema:
            'https://us17.api.mailchimp.com/schema/3.0/Paths/Lists/SignupForms/Collection.json',
        },
        {
          rel: 'locations',
          href: 'https://us17.api.mailchimp.com/3.0/lists/8636bff37b/locations',
          method: 'GET',
          targetSchema:
            'https://us17.api.mailchimp.com/schema/3.0/Definitions/Lists/Locations/CollectionResponse.json',
          schema:
            'https://us17.api.mailchimp.com/schema/3.0/Paths/Lists/Locations/Collection.json',
        },
      ],
    },
  ],
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

  private mailChimpUrl = `https://user1:${environment.mailchimpApiKey}@us17.api.mailchimp.com/3.0`
  private corsURL = 'https://cors-proxy.airgap.prod.gke.papers.tech/proxy?url='
  private listId = '8636bff37b'

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
