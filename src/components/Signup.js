import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const SignUp = () => {
  // const [email, setEmail] = useState('');
  // const [name, setName] = useState('');
  // const [password, setPassword] = useState('');
  const [registerStatus, setRegisterStatus] = useState('');

  /**
   * The approach below, the component's state remains in sync with the
   * input fields, allowing for controlled component behavior where the
   * state drives the form's UI and vice versa.
   */

  const [data, setData] = React.useState({
    fullname: '',
    email: '',
    country: '',
    state: '',
    phone: '',
    password: '',
    confirm_password: ''
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value });
  };

  const register = async (e) => {
    e.preventDefault();

    const userData = {
      fullname: data.fullname,
      email: data.email,
      country: data.country,
      state: data.state,
      phone: data.phone,
      password: data.password,
      confirm_password: data.confirm_password
    };

    try {
      const response = await axios.post(
        'https://ladx-backend-ts.onrender.com/api/v1/signup',
        userData
      );

      if (response.data.message) {
        setRegisterStatus(response.data.message);
      } else {
        setRegisterStatus('Account Created Successfully');
      }
    } catch (err) {
      if (err.response) {
        console.error(err.response.data);
      } else if (err.request) {
        // The request was made but no response was received
        console.error(err.request);
      } else {
        console.error('Error message:', err.message);
      }
    }
  };

  let img_sign = [
    'https://as2.ftcdn.net/v2/jpg/03/39/70/91/1000_F_339709132_H9HSSTtTmayePcbARkTSB2qoZTubJ6bR.jpg'
  ];
  return (
    <div className="container" style={{ paddingTop: 60 }}>
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={register}>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal me-3">Create Your Account</p>
              </div>
              <p>
                <h1
                  style={{
                    color: 'green',
                    fontSize: '20px',
                    textAlign: 'center',
                    marginTop: '20px'
                  }}>
                  {registerStatus}
                </h1>
              </p>

              <div className="form-outline mb-4">
                <input
                  onChange={handleChange}
                  type="text"
                  id="fullname"
                  name="fullname"
                  className="form-control form-control-lg"
                  placeholder="Enter your Fullname"
                  required
                />

                <label htmlFor="fullname">Fullname</label>
              </div>

              <div className="form-outline mb-4">
                <input
                  onChange={handleChange}
                  type="email"
                  id="email"
                  name="email"
                  className="form-control form-control-lg"
                  placeholder="Enter your Email Address"
                  required
                />

                <label htmlFor="email" className="form-label">
                  Email address
                </label>
              </div>

              <div className="form-outline mb-4">
                <input
                  onChange={handleChange}
                  type="text"
                  id="country"
                  name="country"
                  className="form-control form-control-lg"
                  placeholder="Enter your country name"
                  required
                />

                <label htmlFor="country" className="form-label">
                  Country
                </label>
              </div>

              <div className="form-outline mb-4">
                <input
                  onChange={handleChange}
                  type="text"
                  id="state"
                  name="state"
                  className="form-control form-control-lg"
                  placeholder="Enter your state"
                  required
                />

                <label htmlFor="state" className="form-label">
                  State
                </label>
              </div>

              <div className="form-outline mb-4">
                <input
                  onChange={handleChange}
                  type="number"
                  id="phone"
                  name="phone"
                  className="form-control form-control-lg"
                  placeholder="Enter your phone number"
                  required
                />

                <label htmlFor="email" className="form-label">
                  Phone
                </label>
              </div>

              <div className="form-outline mb-3">
                <input
                  onChange={handleChange}
                  type="password"
                  id="password"
                  name="password"
                  className="form-control form-control-lg"
                  placeholder="Enter your Password"
                  required
                />

                <label htmlFor="password" className="form-label">
                  Password
                </label>
              </div>

              <div className="form-outline mb-3">
                <input
                  onChange={handleChange}
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  className="form-control form-control-lg"
                  placeholder="Enter your password again"
                  required
                />

                <label htmlFor="confirm_password" className="form-label">
                  Confirm Password
                </label>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    id="remember"
                  />
                  <label className="form-check-label" htmlFor="remember">
                    Remember Me
                  </label>
                </div>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-dark">
                  Sign Up
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Already Have An Account?
                  <Link to="/login" className="link-secondary p-2">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4">
            <img src={img_sign[0]} alt="logo" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};
