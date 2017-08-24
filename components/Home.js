import React from 'react';
import Api from './Api';
import PaymentForm from './PaymentForm';
var client = require('braintree-web/client');
class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    
    
    
    handleSubmit = (form) => {
        var data = {};
        const {store} = this.context;
        store.dispatch({
            'type':'show_loading'
        });
        for (var key in form) {
            data[key] = form[key].state.value;
        }
        Api.gen_braintree_token().then(function(response) {
            const CLIENT_AUTHORIZATION = response.data;
            client.create({
                authorization: CLIENT_AUTHORIZATION
            }, function (err, client) {
                client.request({
                    endpoint: 'payment_methods/credit_cards',
                    method: 'post',
                    data: {
                        creditCard: {
                            number: data.cardNumber,
                            expirationDate: data.expiryMonth+'/'+data.expiryYear,
                            cvv: data.cvv
                        }
                    }
                }, function (err, response) {
                    if(err) {
                        console.log(err);
                        // store.dispatch({
                            // 'type':'show',
                            // 'code':'error',
                            // 'message':err.code
                        // });
                        data['nonce'] = '';
                    } else {
                        data['nonce'] = response.creditCards[0].nonce;
                    }
                    Api.pay(data).then(function(data){
                        // store.dispatch({
                            // 'type':'hide_loading'
                        // });
                        store.dispatch({
                            'type':'show',
                            'code':data.data.code,
                            'message':data.data.message
                        });
                        Object.keys(form).forEach((name) => {
                            form[name].setState({
                                value:''
                            });
                        });
                    });
                });
            });
        });
        
        
        
    }
    
    render() {
        return (
            <PaymentForm onSubmit={this.handleSubmit}/>
        )
        
    }
    
}

 Home.contextTypes = { store: React.PropTypes.object };

export default Home;