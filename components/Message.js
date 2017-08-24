import React from 'react';
import {Modal,Button} from 'react-bootstrap';
class Message extends React.Component {
    constructor(props) {
        super(props);
        
    }
    
    componentDidMount() {
        const {store} = this.context;
        this.unsubscribe = store.subscribe(()=>this.forceUpdate());
    }
    
    componentWillUnMount() {
        this.unsubscribe();
    } 
    
    
    hide = () => {
        const {store} = this.context;
        store.dispatch({
            "type":"hide"
        })
    }
    
    render() {
        const {store} = this.context;
        const state = store.getState();
        return (
            <Modal
              show={state.message.show}
              onHide={this.hide}
              aria-labelledby="ModalHeader"
            >
              <Modal.Header closeButton>
                <Modal.Title id='ModalHeader'>New Message</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>{state.message.value}</p>
              </Modal.Body>
            </Modal>
        )
    }
 }
 
 Message.contextTypes = { store: React.PropTypes.object };
 
 export default Message;