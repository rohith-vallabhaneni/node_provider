const verifier = require('pact').Verifier
const path = require('path')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const expect = chai.expect
chai.use(chaiAsPromised)
const {
  server 
} = require('../provider.js')

const PORT = process.env.DRP_CF_HTTP_PORT || 8082

server.listen(PORT, () => {

})
// Verify that the provider meets all consumer expectations
describe('Pact Verification', () => {
  it('should validate the expectations of Matching Service', function () { // lexical binding required here
    this.timeout(10000)

    let opts = {
      provider: 'platform_cdc_nodeProvider',
      providerBaseUrl: 'http://localhost:'+PORT,
      // Fetch pacts from broker
       pactBrokerUrl: 'http://proxy-k8s-001-test0-platform-gb-lon1.metroscales.io:30052',
      // Fetch from broker with given tags
      // tags: ['dev', 'prod'],
      // Local pacts
      // pactUrls: [path.resolve(process.cwd(), '../consumer/pacts/node_pact_consumer-node_pact_provider.json')],
      // pactBrokerUsername: 'UserName',
      // pactBrokerPassword: 'Password',
      publishVerificationResult: true,
      providerVersion: "1.0.0"
    }

    return verifier.verifyProvider(opts)
      .then(output => {
        console.log('Pact Verification Complete!')
        console.log(output)
      })
  })
})
