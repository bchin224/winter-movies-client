import React, { Component } from 'react'
// Import withRouter so we have access to the route props (match, history, location)
import { withRouter } from 'react-router-dom'

// Import our signUp and signIn functions that make axios http requests
import { signUp, signIn } from '../../api/auth'

// Import the pre-defined messages we have for our alerts
import messages from '../AutoDismissAlert/messages'

// Import a form and button from react-bootstrap
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignUp extends Component {
  constructor (props) {
    super(props)

    // keep track of the email, password, and passwordConfirmation in state
    // we'll use these in our axios http request to sign up
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  // update the state when an input changes
  handleChange = event => {
    // event.target is the Form.Control (input) that caused the change event
    // set the state with the key of 'name' to the Form.Control's new value
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  // make a signUp request whenever the form is submitted
  onSignUp = event => {
    // don't refresh the page
    event.preventDefault()

    // extract the props. msgAlert and setUser were passed down.
    // history comes from withRouter
    const { msgAlert, history, setUser } = this.props

    // make a signUp axios request. Pass this.state so it has the email, password and passwordConfirmation
    signUp(this.state)
      // makes a signIn request (to automatically sign us in after signing up)
      .then(() => signIn(this.state))
      // set the user state in App.js to the user we got from signing in
      .then(res => setUser(res.data.user))
      // call msgAlert to tell the user that they were able to sign up successfully
      .then(() => msgAlert({
        heading: 'Sign Up Success',
        message: messages.signUpSuccess,
        // the success variant makes this popup green
        variant: 'success'
      }))
      // history.push will send you to the home page. This is similar to a Redirect
      .then(() => history.push('/'))
      // if an error occurs
      .catch(error => {
        // reset the state to its initial values
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        // show an error message
        msgAlert({
          // error.message is the specific message from the error object
          heading: 'Sign Up Failed with error: ' + error.message,
          message: messages.signUpFailure,
          // this will be the red danger color from bootstrap
          variant: 'danger'
        })
      })
  }

  render () {
    // destructure (extract) the email, password, and passwordConfirmation state
    const { email, password, passwordConfirmation } = this.state

    return (
      // add a row to use the bootstrap grid (this is inside a container in App.js)
      <div className="row">
        {/* On a small screen, take up 10/12 columns, on a medium and large screen
        take up 8/12 columns.
        mt-5 adds margin to teh top of the div, and 5 adds a decent amount of margin.
        mx-auto adds margin to teh left and ridght sides automatically, which centers
        the div (since the elft and right margin are the same) */}
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Sign Up</h3>
          {/* Add a bootstrap for, similar to a normal form, but prettier */}
          <Form onSubmit={this.onSignUp}>
            {/* A Form.Group wraps a Form.Control (input), label and optional help text.
              The controlId is used for accessibility and should match the Form.Control's
              name */}
            <Form.Group controlId="email">
              {/* A label for our Form.Control, similar to a <label> element */}
              <Form.Label>Email address</Form.Label>
              {/* A Form.Control is like an html input, but this is the bootstrap term
                for one but is prettier. */}
              <Form.Control
              // Required, similar to an input's required attribute
                required
                type="email"
                // the name determines what state will be updated by this.handleChange
                name="email"
                // the value is the current value of the input (our current email state)
                value={email}
                placeholder="Enter email"
                // what function to call when this Form.Control (input) changes
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name="password"
                value={password}
                // similar to email, but we change the type, name, and placeholder text
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="passwordConfirmation">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                required
                name="passwordConfirmation"
                value={passwordConfirmation}
                // similar to email, but we change the type, name, and placeholder text
                type="password"
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            {/* Add a button to submit our form. Give it the secondary color. */}
            <Button
              variant="secondary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

// wrap SignUp with router, so we have access to the history prop
export default withRouter(SignUp)
