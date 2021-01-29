import { Component } from 'react'
// require withRouter so we will have access to the history prop
import { withRouter } from 'react-router-dom'

// import the signOut axios call to sign us out from api
import { signOut } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

class SignOut extends Component {
  // anytime the /sign-out route renders the SignOut component, this will run
  componentDidMount () {
    // extract our props
    const { msgAlert, history, clearUser, user } = this.props

    // call our signOut axios call
    // pass it the user, so we have access to the user's token when making our request
    signOut(user)
      // whether the signOut request succeeded or failed
      // tell the user we signed out successfully
      .finally(() => msgAlert({
        heading: 'Signed Out Successfully',
        message: messages.signOutSuccess,
        variant: 'success'
      }))
      // send the user to teh home page
      .finally(() => history.push('/'))
      // reset the user, so that someone else can sign in
      .finally(() => clearUser())
  }

  // add a render method that returns a falsy value
  // since it returns a falsy value, we will never see the SignOut component
  render () {
    return ''
  }
}

export default withRouter(SignOut)
