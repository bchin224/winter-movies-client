import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
// import withRouter so we have access to the match route prop
import { withRouter, Redirect, Link } from 'react-router-dom'
import { movieShow, movieDelete } from '../../api/movies'

class MovieShow extends Component {
  constructor (props) {
    super(props)

    // initially our movie state will be null until it is fetched from api
    this.state = {
      movie: null,
      deleted: false
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
        message: 'The movie is now displayed.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Showing Movie Failed',
          message: 'Failed to show movie: ' + error.message,
          variant: 'danger'
        })
      })
  }

  handleDelete = event => {
    const { user, match, msgAlert } = this.props

    // make a delete axios request
    movieDelete(match.params.id, user)
    // set the deleted variable to true, to redirect the movies page in render
      .then(() => this.setState({ deleted: true }))
      .then(() => msgAlert({
        heading: 'Movie Successfully Deleted',
        message: 'The movie has been deleted from the database',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed To Delete',
          message: 'Failed with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { movie, deleted } = this.state

    // if we don't have a movie yet
    if (!movie) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    // if the movie is deleted
    if (deleted) {
      // redirect to movies index page
      return <Redirect to='/movies'/>
    }

    return (
      <div>
        <h3>{movie.title}</h3>
        <h4>Director: {movie.director}</h4>
        <button onClick={this.handleDelete}>Delete Movie</button>
        <button>
          <Link to={`/movies/${movie._id}/edit`}>Update Movie</Link>
        </button>
      </div>
    )
  }
}

export default withRouter(MovieShow)
