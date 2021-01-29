// import our apiUrl (similar to browswer template)
import apiUrl from '../apiConfig'
// import axios so we can make http requests
import axios from 'axios'

// the signUp function accepts the credentials (email, password, and passwordConfirmation)
// we use named exports to export each function individually instead of a default export
export const signUp = credentials => {
  // makes an axios request and returns the promise so we can use .then on it
  return axios({
    // method and url are the same from the jquery ajax token auth lesson
    method: 'POST',
    url: apiUrl + '/sign-up',
    data: {
      credentials: {
        // since credentials is 'this.state', credentials is like 'this.state.email'
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.passwordConfirmation
      }
    }
  })
}

export const signIn = credentials => {
  return axios({
    // like signUp, but the url changes
    url: apiUrl + '/sign-in',
    method: 'POST',
    data: {
      // like signUp, but no passwordConfirmation
      credentials: {
        email: credentials.email,
        password: credentials.password
      }
    }
  })
}

// the signOut axios request needs a user to get access to its token
export const signOut = user => {
  return axios({
    // this sign out request has the same url and method from the jquery-ajax-token-auth lesson
    url: apiUrl + '/sign-out',
    method: 'DELETE',
    // add an authorization header
    headers: {
      // we need the user so we have access to their token
      'Authorization': `Token token=${user.token}`
    }
  })
}

// accept the old and new password and the user (for their token)
export const changePassword = (passwords, user) => {
  return axios({
    // the same url & method from the jquery ajax token auth lesson
    url: apiUrl + '/change-password',
    method: 'PATCH',
    // add an authorization header using the user's token, like we did in signOut
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      // send the passwords along in our change password request
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword
      }
    }
  })
}
