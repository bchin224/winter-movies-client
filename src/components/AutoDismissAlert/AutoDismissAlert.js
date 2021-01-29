import React from 'react'
// importing the react bootstrap alert
import Alert from 'react-bootstrap/Alert'

// import the stylesheet for this alert
import './AutoDismissAlert.scss'

class AutoDismissAlert extends React.Component {
  // adds a constructor to initialize state and keep track of the timeoutId
  constructor (props) {
    super(props)

    // by default, we want to show the AutoDismissAlert
    this.state = {
      show: true
    }

    // the timeoutId is used to cancel our setTimeout call
    this.timeoutId = null
  }

  // this function will happen after our component is mounted (first shown on screen)
  componentDidMount () {
    // after 5 seconds (5000 milliseconds) call the this.handleClose function
    // setTimeout returns a timeoutId so we can cancel the timeout
    this.timeoutId = setTimeout(this.handleClose, 5000)
  }

  // this function will run when our component is removed from the DOM (or screen)
  componentWillUnmount () {
    // calling clearTimeout will cancel the timer
    // we don't want this.handleClose to be run if the component has been removed
    // because this.handleClose tries to modify the component's state
    clearTimeout(this.timeoutId)
  }

  // handleClose sets the show state to false, so we don't see the AutoDismissAlert anymore
  handleClose = () => this.setState({ show: false })

  render () {
    // destructure all of the props given to auto dismiss alert
    const { variant, heading, message, deleteAlert, id } = this.props

    // Delete this alert after the fade animation time (300 ms by default)
    if (!this.state.show) {
      setTimeout(() => {
        deleteAlert(id)
      }, 300)
    }

    return (
      // show our bootstrap alert
      <Alert
        // dismissable prop adds an x so that we can dismiss the alert
        dismissible
        // if true, will show the alert, otherwise the alert will be hidden
        show={this.state.show}
        // the variant is the color to use for this alert (primary, danger, success)
        variant={variant}
        // the onClose prop will be run whenever someone clicks the close button.
        // we want to set the show state to false when that occurs
        onClose={this.handleClose}
      >
        <div className="container">
          <Alert.Heading>
            {heading}
          </Alert.Heading>
          <p className="alert-body">{message}</p>
        </div>
      </Alert>
    )
  }
}

export default AutoDismissAlert
