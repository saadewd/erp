import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'



// Load the user
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: 'USER_LOADED',
            // payload: res.data
        })


    } catch (error) {

        if (error) dispatch({
            type: 'AUTH_ERROR',
        })


    }
}


// Registering the user

export const register = ({ cnic, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = { cnic, email, password };
    try {
        const res = await axios.post('/api/users', body)
        dispatch({
            type: 'REGISTER_SUCCESS',
            payload: res.data
        });
        dispatch(loadUser())
      

    } catch (err) {
        console.log(err.message)
        dispatch({
            type: 'REGISTER_FAIL'
        });

    }

}



// Login the user

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });
    try {
        const res = await axios.post('/api/auth/', body, config)
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: res.data
        });

        // dispatch(loadUser())

    } catch (err) {
        const errors = err.response.data.errors;
        console.error(errors);

        dispatch({
            type: 'LOGIN_FAIL'
        });

    }
};


export const logout = () => dispatch => {
    dispatch({
        type: 'CLEAR_PROFILE'
    });

    dispatch({
        type: 'LOG_OUT'
    })

}