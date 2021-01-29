import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { movieIndex } from '../../api/movies'
class MovieIndex extends Component {
  constructor (props) {
    super(props)
    // keep track of the movies in our application
    // initially they will be null until we have fetched them from the api
    this.state = {
      movies: null
    }
  }
  // after we render the MovieIndex component for the first time
  componentDidMount () {
    const { msgAlert, user } = this.props
    // make a request to get all of our movies
    movieIndex(user)
      // set the movies state, to the movies we got back in the response's data
      .then(res => this.setState({ movies: res.data.movies }))
      // dummy data until we create actual movies
      // .then(res => this.setState({ movies: [{ _id: 1, title: 'jaws' }, { _id: 2, title: 'The Phantom Menace' }] }))
      .then(() => msgAlert({
        heading: 'Loaded Movies Successfully',
        message: 'All movies retrieved. Click on one to go to its page.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Load Movies!',
          message: 'Could not load movies with error: ' + error.message,
          variant: 'danger'
        })
      })
  }
  render () {
    // destructure our movies state
    const { movies } = this.state
    // if we haven't fetched any movies yet from the API
    if (!movies) {
      // A Spinner is just a nice loading message we get from react bootstrap
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }
    const moviesJsx = movies.map(movie => (
      <Link to={`/movies/${movie._id}`} key={movie._id}>
        <li>
          {movie.title}
        </li>
      </Link>
    ))
    return (
      <div>
        <h3>Movies</h3>
        <ul>
          {moviesJsx}
        </ul>
      </div>
    )
  }
}
export default MovieIndex
