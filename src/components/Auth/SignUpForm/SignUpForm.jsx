import { Component } from 'react'
import { signUp } from '../../../../utilities/user-services'

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    })
  }

  handleSubmit = async (evt) => {
    evt.preventDefault()
    try {
      const formData = {...this.state}
      
      delete formData.error
      delete formData.confirm

      const user = await signUp(formData)
      this.props.setUser(user)
    } catch (error) {
      this.setState({ error: 'Sign Up Failed - Try Again' })
    }
  }

  render() {
    const disable = this.state.password !== this.state.confirm
    return (
      <div className="form-container">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label className="loginForm">Name</label>
            <input className="loginForm" type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            <label className="loginForm">Email</label>
            <input className="loginForm" type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            <label className="loginForm">Password</label>
            <input className="loginForm" type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            <label className="loginForm">Confirm Password</label>
            <input className="loginForm" type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            <button type="submit" disabled={disable}>SIGN UP</button>
          </form>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    )
  }
}