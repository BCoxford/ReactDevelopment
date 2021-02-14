//View displayed requiring the user to enter their email address and date of birth

import React from 'react';
import {Form, Col} from "react-bootstrap";

class StepTwo extends React.Component {

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

    //Update red input response
    RedTest(prop) {
        //isError (boolean) is there an error?
        if(prop !== undefined) {
            return !prop
        }
        else {
            return true
        }
    }

    render () {
        if(this.props.screen === 2 || this.props.screen === 3) {
            return (
                <React.Fragment>

                    {/*Email Input Field*/}
                    <Form.Group className="align-items-center">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            isValid={this.GreenTest(this.props.error[3])} 
                            isInvalid={this.props.error[3]} 
                            required name="email" type="email" placeholder="Enter Email" 
                            value={this.props.email} 
                            onChange={this.props.changeValue}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid email!
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/*Date of Birth Input Fields*/}
                    <Form.Group className="align-items-center">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Row className="verticalCenter">
                            <Col>
                                <Form.Control 
                                    className="greenTick" 
                                    required 
                                    isValid={this.GreenTest(this.props.error[4]) || this.GreenTest(this.props.error[7])} 
                                    isInvalid={!(this.RedTest(this.props.error[4]) && this.RedTest(this.props.error[7]))} 
                                    name="dob_dd" type="text" placeholder="dd" 
                                    value={this.props.dob_dd} 
                                    onChange={this.props.changeValue}
                                />
                            </Col>
                            <Form.Label>/</Form.Label>
                            <Col>
                                <Form.Control 
                                    className="greenTick" 
                                    isValid={this.GreenTest(this.props.error[5]) || this.GreenTest(this.props.error[7])} 
                                    isInvalid={!(this.RedTest(this.props.error[5]) && this.RedTest(this.props.error[7]))} 
                                    required name="dob_mm" type="text" placeholder="mm" 
                                    value={this.props.dob_mm} 
                                    onChange={this.props.changeValue}/>
                            </Col>
                            <Form.Label>/</Form.Label>
                            <Col>
                                <Form.Control 
                                    className="greenTick" 
                                    isValid={this.GreenTest(this.props.error[6]) || this.GreenTest(this.props.error[7])} 
                                    isInvalid={!(this.RedTest(this.props.error[6]) && this.RedTest(this.props.error[7]))} 
                                    required name="dob_yyyy" type="text" placeholder="yyyy" 
                                    value={this.props.dob_yyyy} 
                                    onChange={this.props.changeValue}
                                />
                            </Col>
                        </Form.Row>

                        {/*Date of birth error label*/}
                        {this.props.error[4] || this.props.error[5] || this.props.error[6] || this.props.error[7] ? <Form.Label className="errorMessage">{this.props.dob_error}</Form.Label> : null}
                    </Form.Group>

                </React.Fragment>
            )
        }
        else {
            return null
        }
    }
}

export default StepTwo;