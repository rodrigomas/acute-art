// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  acuteartContract: 'KT1XUNEnrWeE8PCZiVSZ2yD3npQSsEBSKzVA',
  acuteartAuctionContract: 'KT1A8nzH719JHKxnzBRFgzQZ2pmkat24JPwc',
  rpcUrl: 'https://testnet-tezos.giganode.io',
  appName: 'Acute Art',
  artworkBigmapUrl:
    'https://api.better-call.dev/v1/bigmap/edo2net/35438/keys?q=&offset=0&size=10',
  auctionBigmapUrl:
    'https://api.better-call.dev/v1/bigmap/edo2net/35435/keys?q=&offset=0&size=10',
  indexerUrl: 'https://tzcolors-indexer.prod.gke.papers.tech/api/v1/',
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
