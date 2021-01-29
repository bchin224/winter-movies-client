import React, { Fragment } from 'react'
// import the nav and navbar components from react bootstrap
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

// add some bootstrap links that will only be shown when the user is signed in (authenticated)
const authenticatedOptions = (
  <Fragment>
    {/* Boostrap Nav.Links are different than react router links. Note that they
    have an 'href' prop instead of a 'to' prop */}
    <Nav.Link href="#movies">Movies</Nav.Link>
    <Nav.Link href="#create-movie">Create  Movie</Nav.Link>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

// These links will be shown when the user is not signed in (unauthenticated)
const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

// Show this link at all times
const alwaysOptions = (
  <Fragment>
    <Nav.Link href="#/">Home</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  // bg=primary uses our primary color as our navbar's background
  // variant=dark means that our background is dark so the links should be white
  // expand=md when the screensize is medium, show the links in the bar instead of
  // the hamburger menu
  <Navbar bg="primary" variant="dark" expand="md">
    {/* Navbar.brand styles the name of your application.
      href="#" means clicking on apps name, redirect to home page */}
    <Navbar.Brand href="#">
      🎬 React Movies Database 🎬
    </Navbar.Brand>
    {/* The navbar.Toggle is the button that will show our nav links on smaller screens
      the aria-controls should match teh Navbar.collapse component */}
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    {/* The Navbar.Collapse contains the links that will only show up when the hamburger
      menu is clicked on */}
    <Navbar.Collapse id="basic-navbar-nav">
      {/* The Nav component contains our navigation Links
        ml=auto means margin-left should be set automatically (which takes up the remaining space
        ml=auto is what forces the links to the right side of the screen) */}
      <Nav className="ml-auto">
        {/* If we have a user: render a span that says Welcome and their email.
          navbar-text uses the same styling as nav.links
          mr-2 adds margin on right of this span */}
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        {/* Always render the alwaysOptions links */}
        { alwaysOptions }
        {/* If we have a user, show authenticated options, otherwise show unauthenticated */}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
