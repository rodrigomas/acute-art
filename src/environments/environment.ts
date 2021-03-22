// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  acuteartContract: 'KT1DySdxvUjKqL7Hz44zMqKaXTUsdfnnVGxo',
  acuteartAuctionContract: 'KT1BWSNSyX37VHXJwYYdCcrE7vreW5jrHgxN',
  rpcUrl: 'https://testnet-tezos.giganode.io',
  appName: 'Acute Art',
  artworkBigmapUrl:
    'https://api.better-call.dev/v1/bigmap/edo2net/38379/keys?q=&offset=0&size=10',
  auctionBigmapUrl:
    'https://api.better-call.dev/v1/bigmap/edo2net/38376/keys?q=&offset=0&size=10',
  indexerUrl: 'https://tzcolors-indexer.prod.gke.papers.tech/api/v1/',
  backendUrl: 'https://acute-arts-marketplace-backend.dev.gke.papers.tech',
  backendApiKey: 'api:XmPS4fIKXm0N',
  mailchimpApiKey: 'b4779dfc471b55c2ea203c48a9fbd9d0-us17',
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
