import React from 'react';
import Api from './Api';
import sha1 from 'js-sha1';
import QueryForm from './QueryForm';
class Query extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'show_result':false,
            'firstName':'',
            'lastName':'',
            'currency':'',
            'price': ''
        }
    }
    
    
    handleSubmit = (form) => {
        var data = '';
        var set_state = (obj) => {
            this.setState({
                'show_result':true,
                'firstName':obj.firstName,
                'lastName':obj.lastName,
                'currency':obj.currency,
                'price': obj.price,
                'phone':obj.phone
            });
        }
        const {store} = this.context;
        for (var key in form) {
            data += form[key].state.value;
        }
        Api.query({"hash":sha1(data)}).then(function(data){
            var data = data.data;
            if(data.code == 'error') {
                store.dispatch({
                    'type':'show',
                    'code':data.code,
                    'message':data.message
                });
           } else {
                set_state(JSON.parse(data.message));
           }
        });
    }
    
    render() {
        return (
            <QueryForm onSubmit={this.handleSubmit} {...this.state} />
        )
        
    }
    
}

 Query.contextTypes = { store: React.PropTypes.object };

export default Query;