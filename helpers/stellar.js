const axios = require('axios')
const StellarSdk = require('stellar-sdk');
const server = new StellarSdk.Server('https://horizon.stellar.org');
StellarSdk.Network.usePublicNetwork();

module.exports = {
    getAsset: (assetCode, assetIssuer) => {
        return new Promise(async(resolve, reject) => {
            let data = await axios("https://horizon.stellar.org/assets?asset_code=" + assetCode + "&asset_issuer=" + assetIssuer)
            return resolve(data.data._embedded.records[0])
        })
    },
}