//View displayed requiring the user to enter their name and phone number

import React from 'react';
import {Form, Col} from "react-bootstrap";

class StepOne extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countryCodes: ["+44", "+2", "+1"] //Country Phone Codes (array: strings)
        }
    }

    //Update green input response
    GreenTest(isError) {
        //isError (boolean) is there an error?
        if(isError !== undefined) {
            return !isError
        }
        else {
            return false
        }
    }

    render () {
        if(this.props.screen === 1  || this.props.screen === 3) {
            return (
                <React.Fragment>

                    {/*First Name Input Field*/}
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                            className="greenTick" 
                            isValid={this.GreenTest(this.props.error[0])} 
                            isInvalid={this.props.error[0]} 
                            required 
                            name="firstName" 
                            type="text" 
                            placeholder="Enter First Name" 
                            value={this.props.firstName} 
                            onChange={this.props.changeValue}
                        />
                        <Form.Control.Feedback type="invalid">
                            Your forgot to enter your first name!
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/*Last Name Input Field*/}
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                            className="greenTick" 
                            isValid={this.GreenTest(this.props.error[1])} 
                            isInvalid={this.props.error[1]} 
                            required 
                            name="lastName" 
                            type="text" 
                            placeholder="Enter Last Name" 
                            value={this.props.lastName} 
                            onChange={this.props.changeValue}
                        />
                        <Form.Control.Feedback type="invalid">Your forgot to enter your last name!</Form.Control.Feedback>
                    </Form.Group>

                    {/*Phone Number Input Field*/}
                    <Form.Group className="align-items-center">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Row>
                            <Col xs={5}>
                                <Form.Control 
                                    className="greenTickDropDown" 
                                    isValid={this.GreenTest(this.props.error[2])}
                                    as="select" required name="countryCode" 
                                    type="text" 
                                    value={this.props.countryCode} 
                                    onChange={this.props.changeValue}>
                                    {this.state.countryCodes.map((i) => <option key={i}>{i}</option>)}  
                                </Form.Control>
                            </Col>
                            <Col xs={7}>
                                <Form.Control 
                                    className="greenTick" 
                                    isValid={this.GreenTest(this.props.error[2])} 
                                    isInvalid={this.props.error[2]} 
                                    required 
                                    name="phoneNumber" 
                                    type="tel" placeholder="1234567890" 
                                    value={this.props.phoneNumber} 
                                    onChange={this.props.changeValue}
                                />
                            </Col>
                        </Form.Row>

                        {/*Phone number error label*/}
                        {this.props.error[2] ? <Form.Label className="errorMessage">Please enter a valid phone number!</Form.Label> : null}
                    </Form.Group>

                </React.Fragment>
            )
        }
        else {
            return null
        }
    }
}

export default StepOne;