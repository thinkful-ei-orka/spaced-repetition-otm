import React, { Component } from 'react'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
import '../../components/RegistrationForm/RegistrationForm.css'


class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => { },
    },
  }

  handleRegistrationSuccess = () => {
    const { history } = this.props
    history.push('/login')
  }

  render() {
    return (
      <>
        <h1>
          SpeakFast
        </h1>
        <section className="sign-up-wrapper">
          <p>Practice learning a language with the spaced repetition revision technique.</p>
          <h2>Sign up</h2>
          <RegistrationForm
            onRegistrationSuccess={this.handleRegistrationSuccess}
          />
        </section>
      </>
    );
  }
}

export default RegistrationRoute
