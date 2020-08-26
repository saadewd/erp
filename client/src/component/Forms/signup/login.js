import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../../_actions/auth';
import { Input, Space, Icon } from 'antd';
import { UserOutlined, EyeTwoTone, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons';
import { Button } from 'antd'

import './login.css'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { email, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        // console.log(email, password)
        login(email, password)

    }

    // Redirect if logged in 

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }
    return (
        <div className='loginFormMainDiv animated zoomIn'>
            <form  onSubmit={e => onSubmit(e)}>
                <h1 style={{
                    fontSize: '30px',
                }}>Welcome, Login In</h1>
                <div className='loginFormInputDiv'>
                    <Input size="large" placeholder="Enter Your Username" className='loginFormInputField'
                        name='email' value={email} onChange={e => onChange(e)}
                        prefix={<UserOutlined />} />
                    <br />

                    <Input.Password
                        placeholder="Enter Your Password" size='large'
                        prefix={<LockOutlined />} name='password' value={password} onChange={e => onChange(e)}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />

                    <br />
                    <Button className='loginFormSubmitBtn' size='large' onClick={onSubmit}
                        style={{
                            backgroundColor: '#002D62',
                            color: 'white',
                            fontSize: '20px',
                            height: '5%',
                            border: '1px solid #061353',
                            borderRadius: '100px'

                        }}
                    >Log In</Button>
                </div>


            </form>
        </div>

        // <form className="sign_up_main_div" id='login-form' >
        //     <Fragment>
        //         <div maxWidth="sm">

        //             <div component="div" style={{ boxShadow: "grey 1px 5px 5px 2px", backgroundColor: 'white', height: 'auto' }} >


        //                 <div className="top_border">

        //                     <span className="text"> Student Sign Up</span>


        //                 </div>

        //                 <div className="logo_text_div">

        //                     <div className="img_div">


        //                     </div>
        //                     <div className="text_div">
        //                         <span className="text_span">
        //                             Presidential Initiative for <br />  Artificial Intelligence and Computing.
        //                     </span>
        //                     </div>

        //                 </div>

        //                 <div className="form_main_div">


        //                     <div className="cnic">
        //                         Email
        //                     </div>
        //                     <div>


        //                         <input className="cnic_input" type="text" id="ename" name="email" placeholder="Enter email address"
        //                             value={email}
        //                             onChange={e => onChange(e)} />


        //                     </div>
        //                     <div className="cnic">
        //                         Password
        //                     </div>
        //                     <div>


        //                     <input

        //                         id="outlined-password-input"
        //                         label="Password"name="password"
        //                         type="password"
        //                         autoComplete="current-password"
        //                         variant="outlined"  value={password}
        //                         onChange={e => onChange(e)}
        //                         minLength='6'
        //                     />


        //                     </div>

        //                     <div className="already">

        //                         <div className='al'><span className="already-text">
        //                             Not a member?
        //                         </span>
        //                             <span >
        //                                 <Link to='signup' className='link'>
        //                                     <a href="" className="signin_text">Sign Up </a></Link>
        //                             </span></div>
        //                         <span >
        //                             <a href="" className="how">Forget Password?</a>
        //                         </span>

        //                         <div className="button_div">
        //                             <button className="button">Login</button>
        //                         </div>

        //                     </div>

        //                 </div>

        //             </div>



        //         </div>
        //     </Fragment>
        // </form>
    );
}
Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,

}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);