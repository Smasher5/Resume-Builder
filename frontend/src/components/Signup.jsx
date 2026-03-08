import React from 'react'
import { authStyles as styles } from '../assets/dummystyle'
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/helper';
import { Input } from '../components/Input'
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPaths'

const Signup = ({ setcurrentPage }) => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
    e.preventDefault()
    if(!fullName){
        setError('Please enter FullName')
        return
    }
    if(!validateEmail(email)) {
        setError('Please enter a valid email address')
        return
    }
    if(!password){
        setError('Please enter password')
        return
    }
    setError('')
    try {
        const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
            name: fullName,
            email,
            password,
        })
        const {token} = response.data
        if(token){
            localStorage.setItem('token', token)
            updateUser(response.data)
            navigate('/dashboard')
        }
    } catch (error) {
        setError(error.response?.data?.message || 'Something went wrong. Please try again')
    }
 }


  return (
    <div className={styles.signupContainer}>
        <div className={styles.headerWrapper}>
            <h3 className={styles.signupTitle}>Create Account</h3>
            <p className={styles.signupSubtitle}>Join thousands of professionals today</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignUp} className={styles.signupForm}>
            <Input value={fullName} onChange={({ target }) => setFullName(target.value)}
            label='Full Name'
            placeholder='John Doe'
            type='text'
            />

            <Input value={email} onChange={({ target }) => setEmail(target.value)}
            label='Email'
            placeholder='email@example.com'
            type='email'
            />

            <Input value={password} onChange={({ target }) => setPassword(target.value)}
            label='Password'
            placeholder='Min 8 character'
            type='password'
            />

            {error && <div className={styles.errorMessage}>{error}</div>}
            <button type='submit' className={styles.signupSubmit}>
                Create Account
            </button>

            {/* Footer */}
            <p>
                 Already have an account? {' '}
                 <button onClick={() => setcurrentPage('login')} type='button' className={styles.signupSwitchButton}>SignIn</button>
            </p>
        </form>
    </div>
  )
}

export default Signup