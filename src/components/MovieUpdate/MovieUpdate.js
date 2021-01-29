import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { Redirect, withRouter } from 'react-router-dom'

import { movieShow, movieUpdate } from '../../api/movies'

import MovieForm from '../MovieForm/MovieForm'

class MovieUpdate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      movie: null,
      updated: false
    }
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props

    // make a request for a single movie
    movieShow(match.params.id, user)
      // set the movie state to the movie we got back in response data
      .then(res => this.setState({ movie: res.data.movie }))
      .then(() => msgAlert({
        heading: 'Showing Movie Successfully',
        message: 'You can now edit this movie.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Showing Movie Failed',
          message: 'Failed to display movie: ' + error.message,
          variant: 'danger'
        })
      })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { user, match, msgAlert } = this.props
    const { movie } = this.state

    movieUpdate(match.params.id, movie, user)
      .then(res => this.setState({ updated: true }))
      .then(() => {
        msgAlert({
          heading: 'Updated Movie Successfully',
          message: 'Movie has been updated',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Updating Movie Failed',
          message: 'Movie was not updated due to error: ' + err.message,
          variant: 'danger'
        })
      })
  }

  // same handleChange from MovieCreate
  handleChange = event => {
    event.persist()
    this.setState((state) => {
      return {
        movie: { ...state.movie, [event.target.name]: event.target.value }
      }
    })
  }

  render () {
    const { movie, updated } = this.state

    // if we don't have a movie yet
    if (!movie) {
      // show spinner loading
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }
    // if the movie is updated
    if (updated) {
      // redirect to the movies index page
      return <Redirect to ={`/movies/${this.props.match.params.id}`} />
    }

    return (
      <div>
        <h3>Edit Movie</h3>
        <MovieForm
          movie={movie}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default withRouter(MovieUpdate)
