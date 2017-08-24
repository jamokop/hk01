import React from 'react';
import {FormGroup,FormControl,ControlLabel,Grid,Row,Col,Button} from 'react-bootstrap';
import './rules';
import Validation  from 'react-validation';
import {Link,Redirect} from 'react-router-dom';
class QueryForm extends React.Component {
    constructor(props) {
        super(props);
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        var error = this.form.validateAll();
        if (Object.keys(error).length > 0) {
            return false;
        } else {
            this.props.onSubmit(this.form.components);
        }
        
        
        
    }
    
    render() {
        const props = this.props;
        if(props.show_result) {
            const location = {
                pathname:'/query/result',
                state:{
                    'show_result':true,
                    'firstName':props.firstName,
                    'lastName':props.lastName,
                    'currency':props.currency,
                    'price': props.price,
                    'phone': props.phone
                }
            }; 
            return (<Redirect to={location} />);
        }
        
        return (
            <Grid>
                <Validation.components.Form ref={(c) => {this.form = c}} onSubmit={this.handleSubmit}>
                    <div className="page-header">
                        <h2>Payment Enquiry</h2>
                    </div>
                    <Row className="show-grid">
                        <Col xs={12} sm={6} md={6} lg={6}>
                            <ControlLabel>Customer Name</ControlLabel>
                            <FormGroup className="flex-form">
                              <Validation.components.Input className="form-control" placeholder="first name" errorClassName="is-invalid-input" type="text" value="" name="firstName" validations={['required']}/>
                              &nbsp;&nbsp;&nbsp;
                              <Validation.components.Input className="form-control" placeholder="last name" errorClassName="is-invalid-input" type="text" value="" name="lastName" validations={['required']}/>
                            </FormGroup>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6}>
                            <FormGroup >
                              <ControlLabel>Payment Reference Code</ControlLabel>
                              <Validation.components.Input className="form-control" errorClassName="is-invalid-input" type="text" value="" name="payment_ref_code" validations={['required']}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button bsStyle="default" bsSize="large" className="subbtn" type="submit">Submit</Button>  
                </Validation.components.Form>
            </Grid>
        )
        
    };
    
}
export default QueryForm;