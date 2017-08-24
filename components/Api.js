const axios = require('axios');
const domain = 'http://www.begflag.com/api/';
const queryString = require('query-string');
var Api = {
    pay: function(data) {
        return axios.post(domain+'pay',queryString.stringify(data));
    },
    
    query: function(data) {
        return axios.post(domain+'query',queryString.stringify(data));
    },
    
    gen_braintree_token: function() {
        return axios.get(domain+'pay/gen_token');
    }
    
}

export default Api;