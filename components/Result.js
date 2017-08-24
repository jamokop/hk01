import React from 'react';
import {FormGroup,FormControl,ControlLabel,Grid,Row,Col,Button} from 'react-bootstrap';
import {Link,Redirect} from 'react-router-dom';
class Result extends React.Component {
    render() {
        const {location} = this.props
        const props = location.state;
        if(props && props.show_result) {
            return (
                <Grid>
                    <form>
                        <div className="page-header">
                            <h2>Payment Info</h2>
                        </div>
                        <Row className="show-grid">
                            <Col xs={12} sm={6} md={6} lg={6}>
                                <ControlLabel>Customer Name</ControlLabel>
                                <FormGroup className="flex-form">
                                  <FormControl type="text" readOnly value={props.firstName}/>
                                  &nbsp;&nbsp;&nbsp;
                                  <FormControl type="text" readOnly value={props.lastName}/>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={6} md={6} lg={6}>
                                <FormGroup >
                                  <ControlLabel>Customer Phone Number</ControlLabel>
                                  <FormControl type="text" readOnly value={props.phone}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col xs={12} sm={6} md={6} lg={6}>
                                <FormGroup >
                                  <ControlLabel>Currency</ControlLabel>
                                  <FormControl type="text" readOnly value={props.currency}/>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={6} md={6} lg={6}>
                                <FormGroup >
                                  <ControlLabel>Price</ControlLabel>
                                  <FormControl type="text" readOnly value={props.price}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Link to="/query" className="btn btn-default backbtn">Back</Link>
                    </form>
                </Grid>
            );
        } else {
            return (<Redirect to="/query"/>);
        }

        
    };
    
}
export default Result;