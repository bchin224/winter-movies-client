import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import MovieForm from '../MovieForm/MovieForm'
import { movieCreate } from '../../api/movies'

class MovieCreate extends Component {
  constructor (props) {
    super(props)

    // initially our movies title and director will be empty until they are filled in
    this.state = {
      movie: {
        title: '',
        director: ''
      },
      // createdId will be null until we successfully create a movie
      createdId: null
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    const { user, msgAlert } = this.props
    const { movie } = this.state

    // create a movie, pass it the movie data and the user for its token
    movieCreate(movie, user)
      // .then(res => this.setState({ createdId: res.data.movie._id }))
      .then(res => {
        this.setState({ createdId: res.data.movie._id })
        // pass the response to the next .then so we can show the title
        return res
      })
      .then(res => msgAlert({
        heading: 'Created Movie Succesfully',
        message: `Movie has been created successfully. Now viewing the ${res.data.movie.title}.`,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Create Movie',
          message: 'Could not create movie with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  // when an input changes, update the state that corresponds with the input's name
  handleChange = event => {
    event.persist()
    // in react, an event is actually a SyntheticEvent
    // to ensure the properties are not set to null after handleChange is finished
    // we must call event.persist
    this.setState((state) => {
      // return our state change
      return {
        // set the movie state to what it used to be (... state.movie)
        // but replace the property with 'name' to its current 'value'
        // ex. name could be 'title' or 'director'
        movie: { ...state.movie, [event.target.name]: event.target.value }
      }
    })
  }

  render () {
    // destructure our movie and createdId state
    const { movie, createdId } = this.state

    // if the movie has been created and we set its id
    if (createdId) {
      // redirect to the movies show page
      return <Redirect to={`/movies/${createdId}`} />
    }

    return (
      <div>
        <h3>Create Movie</h3>
        <MovieForm
          movie={movie}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default MovieCreate
