import React from 'react';

//React-Bootstrap
//npm install react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

//React-Bootstrap
import './App.css';

//Views
import StepOne from './components/signup/StepOne';
import StepTwo from './components/signup/StepTwo';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      screen: 1, //Screen (integer) current screen location
      firstName: '',
      lastName: '',
      phoneNumber: '',
      countryCode: '',
      email: '',
      dob_dd: '', //date of birth: day
      dob_mm: '', //date of birth: month
      dob_yyyy: '', //date of birth: year
      dob_error: '', //date of birth: input error message

      //error (array, boolean) : firstName, lastName, phoneNumber, email, dob_dd, dob_mm, dob_yyyy, ageError
      //undefined signifies an input that has not been attempted by the user. 
      error: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
    }
    this.changeValue = this.changeValue.bind(this)
    this.next = this.next.bind(this)
    this.prev = this.prev.bind(this)
  }

  //Return the buttons for specific screens
  get showButtons() {
    let screen = this.state.screen;
    if(screen == 1) {
      return (
        <Button className="next first rounded-0 btn-dark" onClick={this.next}>Continue</Button>
      )
    }
    else if(screen == 2) {
      return (
        <React.Fragment>
          <Button className="prev rounded-0 btn-dark" onClick={this.prev}>Previous</Button>
          <Button className="next rounded-0 btn-dark" onClick={this.next}>Continue</Button>
        </React.Fragment>
      )
    }
    else if(screen == 3) {
      return (
        <React.Fragment>
          <Button className="prev rounded-0 btn-dark" onClick={this.prev}>Previous</Button>
          <Button className="next rounded-0 btn-dark" onClick={this.submit}>Sign Up!</Button>
        </React.Fragment>
      )
    }
  }

  //Tests if a value is numerical
  isNumerical (value) {
    if(isNaN(value)) {
      return false
    }
    else {
      return true
    }
  }

  //Tests if a value is empty
  isEmpty (value) {
    if(value == '') {
      return true
    }
    else {
      return false
    }
  }

  //Validates an email
  isEmail (value) {
    let emailFormat = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
    if(!value.match(emailFormat)) {
      return false
    }
    else {
      return true
    }
  }

  //Test if the day is a valid value
  isDay (day) {
    if (day <= 31 && day >= 1 && (day.length === 1 || 2) && !isNaN(day)) {
      return true
    }
    else {
      return false
    }
  }

  isMonth (month) {
    //Test if the month is a valid value
    if (month <= 12 && month >= 1 && (month.length === 1 || 2) && !isNaN(month)) {
      return true
    }
    else {
      return false
    }
  }

  isYear (year) {
    //Test if the year is a valid value
    if (year.length === 4 && !isNaN(year)) {
      return true
    }
    else {
      return false
    }
  }

  //Validates whether the user is 18 years of age
  isEighteen (day, month, year) {
    let date = new Date(year, month, day)
    let yearToday  = new Date()
    let years = yearToday.getFullYear()-date.getFullYear()
    let months = yearToday.getMonth() - date.getMonth() - 1
    let days = yearToday.getDay() - date.getDay() - 2
    if(years < 18 || (years === 18 && months < 0) || (years === 18 && months === 0) && days < 0) {
      this.setState({
        dob_error: "You must be at least 18 years old to sign up!"
      })
      return false
    }
    else {
      return true
    }
  }

  //Validates a phone number
  isPhoneNumber (phoneNumber) {
    return (!this.isNumerical(phoneNumber) || phoneNumber.length !== 10)
  }

  //Error and validation logic
  validate (name=undefined, value=undefined) {
    let screen = this.state.screen
    let error = this.state.error
    let phoneNumber = this.state.phoneNumber
    let firstName = this.state.firstName
    let lastName = this.state.lastName
    let email = this.state.email
    let day = this.state.dob_dd
    let month = this.state.dob_mm
    let year = this.state.dob_yyyy

    let isError = false

    let isDayValid = false
    let isMonthValid = false
    let isYearValid = false

    if(screen === 1 || screen === 3) {

      if(value === undefined) {
        error[0] = this.isEmpty(firstName)
      }
      else if (value !== undefined && name==="firstName") {
        error[0] = this.isEmpty(value)
      }

      if(value === undefined) {
        error[1] = this.isEmpty(lastName)
      }
      else if(value !== undefined && name==="lastName") {
        error[1] = this.isEmpty(value)
      }

      if(value === undefined) {
        error[2] = this.isPhoneNumber(phoneNumber)
      }
      else if(value !== undefined && name==="phoneNumber") {
        error[2] = this.isPhoneNumber(value)
      }

      for(var i=0; i<4; i++) {
        if(isError !== true) {isError = error[i]}
      }
    }

    if(screen === 2 || screen === 3) {

      if(value === undefined) {
        error[3] = !this.isEmail(email)
      }
      else if (value !== undefined && name==="email") {
        error[3] = !this.isEmail(value)
      }

      if(value === undefined) {
        if(day[0] === "0") { day.replace("0", "") }
        let isValid = this.isDay(day)
        error[4] = !isValid
        isDayValid = isValid
      }
      else if (value !== undefined && name==="dob_dd") {
        if(value[0] === "0") { value.replace("0", "") }
        let isValid = this.isDay(value)
        error[4] = !isValid
        isDayValid = isValid
      }

      if(value === undefined) {
        if(month[0] === "0") { month.replace("0", "") }
        let isValid = this.isMonth(month)
        error[5] = !isValid
        isMonthValid = isValid
      }
      else if (value !== undefined && name==="dob_mm") {
        if(value[0] === "0") { value.replace("0", "") }
        let isValid = this.isMonth(value)
        error[5] = !isValid
      }

      if(value === undefined) {
        let isValid = this.isYear(year)
        error[6] = !isValid
        isYearValid = isValid
      }
      else if (value !== undefined && name==="dob_yyyy") {
        let isValid = this.isYear(value)
        error[6] = !isValid
        isYearValid = isValid
      }

      if(isDayValid && isMonthValid && isYearValid) {
        error[7] = !this.isEighteen(day, month, year)
      }
      else {
        this.setState({
          dob_error: "Please enter a valid date of birth"
        })
      }

      for(var i=4; i<8; i++) {
        if(isError !== true) {isError = error[i]}
      }
    }

    this.setState({
      error: error
    })

    return isError
  }

  //Continues to the next screen
  next () {
    let isError = this.validate()
    if (isError !== true) { //Current screens input fields must be valid
      let screen = this.state.screen
      if(screen <= 2) {
        screen = screen +  1
      }
      this.setState({
        screen: screen
      })
    }
  }

  //Returns to the previous screen
  prev() {
    let screen = this.state.screen
    if(screen >= 2) {
      screen = screen -  1
    }
    this.setState({
      screen: screen
    })
  }

  //Updates the state to the value from a changed input field.
  changeValue = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
    this.validate(name, value) //Validate new value
  }

  //Form submitted and final validation check
  submit = (event) => {
    let value = this.validate()
    let screen = this.state.screen
    if(!value) {
      screen += 1
      this.setState({
        screen: screen
      })
    }
  }

  //Return a screens header
  get RenderTitle () {
    let screen = this.state.screen;
    if(screen == 1) {
        return (
            <h1 className="heading">Register today!</h1>
        )
    }
    else if(screen == 2) {
      return (
          <h1 className="heading">Keep going!</h1>
      )
    }
    else if(screen == 3) {
      return (
          <h1 className="heading">Confirm your details!</h1>
      )
    }
  }

  //Form completion
  get showCompletion() {
    let screen = this.state.screen;
    if(screen == 4) {
      return (
        <React.Fragment>
          <h1 className="headingCompletion">Thank you for signing up {this.state.firstName}!</h1>
          <Button className="next first rounded-0 mt-3">Continue to website</Button>
        </React.Fragment>
      )
    }
  }

  render() {
    return (
      <React.Fragment>
        <Form>
          
          {this.RenderTitle}

          <StepOne
            screen = {this.state.screen}
            firstName = {this.state.firstName}
            lastName = {this.state.lastName}
            phoneNumber = {this.state.phoneNumber}
            countryCode = {this.state.countryCode}
            error = {this.state.error}
            changeValue={this.changeValue}
          />
        
          <StepTwo
            screen = {this.state.screen}
            email = {this.state.email}
            dob_dd = {this.state.dob_dd}
            dob_mm = {this.state.dob_mm}
            dob_yyyy = {this.state.dob_yyyy}
            dob_error = {this.state.dob_error}
            error = {this.state.error}
            changeValue={this.changeValue}
          />

          {this.showButtons}

          {this.showCompletion}
        </Form>
      </React.Fragment>
    )
  }
}

export default App;
