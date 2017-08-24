import React from 'react';
import {FormGroup,FormControl,ControlLabel,Grid,Row,Col,Button} from 'react-bootstrap';
import './rules';
import Validation  from 'react-validation';

class PaymentForm extends React.Component {
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
        return (
            <Grid>
                <Validation.components.Form ref={(c) => {this.form = c}} onSubmit={this.handleSubmit}>
                    <div className="page-header">
                        <h2>Order Section</h2>
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
                              <ControlLabel>Customer Phone Number</ControlLabel>
                              <Validation.components.Input className="form-control" errorClassName="is-invalid-input" type="text" value="" name="phone" validations={['required','number']}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={12} sm={6} md={6} lg={6}>
                            <FormGroup >
                              <ControlLabel>Currency</ControlLabel>
                              <Validation.components.Select className="form-control" name="currency" value="HKD" validations={[]}>
                                <option value="HKD">HKD</option>
                                <option value="USD">USD</option>
                                <option value="AUD">AUD</option>
                                <option value="EUR">EUR</option>
                                <option value="JPY">JPY</option>
                                <option value="CNY">CNY</option>
                              </Validation.components.Select>
                            </FormGroup>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6}>
                            <FormGroup >
                              <ControlLabel>Price</ControlLabel>
                              <Validation.components.Input className="form-control" errorClassName="is-invalid-input" type="text" value="" name="price" validations={['required','number']}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <div className="page-header">
                        <h2>Payment Section</h2>
                    </div>
                    <Row className="show-grid">
                        <Col xs={12} sm={6} md={6} lg={6}>
                            <FormGroup >
                              <ControlLabel>Credit card holder name</ControlLabel>
                              <Validation.components.Input className="form-control" errorClassName="is-invalid-input" type="text" value="" name="holderName" validations={['required']}/>
                            </FormGroup>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6}>
                            <FormGroup >
                              <ControlLabel>Credit card number</ControlLabel>
                              <Validation.components.Input className="form-control" errorClassName="is-invalid-input" type="text" value="" name="cardNumber" validations={['required','creditCard']}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={12} sm={6} md={6} lg={6}>
                            <ControlLabel>Credit card expiration</ControlLabel>
                            <FormGroup className="flex-form">
                                <Validation.components.Input className="form-control" placeholder="mm" errorClassName="is-invalid-input" type="text"  value="" name="expiryMonth" validations={['required','expiryMonth']}/>
                                <span className="slash"> / </span> 
                                <Validation.components.Input className="form-control" placeholder="yyyy" errorClassName="is-invalid-input" type="text"  value="" name="expiryYear" validations={['required','expiryYear']}/>
                            </FormGroup>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6}>
                            <FormGroup >
                              <ControlLabel>Credit card CVV</ControlLabel>
                              <Validation.components.Input className="form-control" errorClassName="is-invalid-input" type="text" value="" name="cvv" validations={['required','cvv']}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button bsStyle="default" bsSize="large" className="subbtn" type="submit">Submit</Button>
                    
                </Validation.components.Form>
            </Grid>
        )
        
    };
    
}
export default PaymentForm;