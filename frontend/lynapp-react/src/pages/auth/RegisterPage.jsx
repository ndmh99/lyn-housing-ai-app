import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { validateInput, validatePasswordMatch } from '../../tools/InputValidation';
import './styles/RegisterPage.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Perform validation
    const emailError = validateInput(email, 'email');
    const passwordError = validateInput(password, 'password');
    const confirmPasswordError = validatePasswordMatch(password, confirmPassword);

    if (emailError || passwordError || confirmPasswordError) {
      setErrors({
        email: emailError,
        password: passwordError,
        confirmPassword: passwordError ? null : confirmPasswordError,
      });
      return;
    }

    try {
      setErrors({});
      setLoading(true);
      await signup(email, password);
      navigate('/dashboard');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrors({ email: 'This email is already registered.' });
      } else {
        setErrors({ form: 'Failed to create an account. Please try again.' });
      }
    }
    setLoading(false);
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          <h2>Create Account</h2>
          <p>Join LYN AI and start investing smarter</p>
          
          {errors.form && <p className="error-message">{errors.form}</p>}

          <form onSubmit={handleSubmit} className="register-form" noValidate>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: null, form: null })); }}
                required
                placeholder="your@email.com"
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: null, confirmPassword: null })); }}
                required
                placeholder="Create a strong password"
                className={errors.password ? 'input-error' : ''}
              />
              {errors.password && <p className="error-text">{errors.password}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setErrors(prev => ({ ...prev, confirmPassword: null })); }}
                required
                placeholder="Re-enter your password"
                className={errors.confirmPassword ? 'input-error' : ''}
              />
              {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
            </div>
            
            <button disabled={loading} type="submit" className="register-btn">
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          
          <div className="register-footer">
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
