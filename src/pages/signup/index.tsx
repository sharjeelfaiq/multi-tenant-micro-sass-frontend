import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { useRegister } from '@refinedev/core';

export const SignUp = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { mutate: signup } = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign Up:', formData);

    signup(formData);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.palette.grey[100],
      padding: theme.spacing(2),
    }}>
      <div style={{ width: '100%', maxWidth: '448px' }}>
        <div style={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[8],
          padding: theme.spacing(4),
        }}>
          <div style={{ textAlign: 'center', marginBottom: theme.spacing(4) }}>
            <h1 style={{
              fontSize: theme.typography.h4.fontSize,
              fontWeight: theme.typography.fontWeightBold,
              color: theme.palette.text.primary,
              marginBottom: theme.spacing(1),
              margin: 0,
            }}>
              Create Account
            </h1>
            <p style={{
              color: theme.palette.text.secondary,
              fontSize: theme.typography.body2.fontSize,
              margin: 0,
            }}>
              Sign up to get started
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing(2.5) }}>
            <div>
              <label htmlFor="email" style={{
                display: 'block',
                fontSize: theme.typography.body2.fontSize,
                fontWeight: theme.typography.fontWeightMedium,
                color: theme.palette.text.primary,
                marginBottom: theme.spacing(1),
              }}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: theme.spacing(1.5),
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: theme.shape.borderRadius,
                  outline: 'none',
                  fontSize: theme.typography.body1.fontSize,
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => e.target.style.borderColor = theme.palette.primary.main}
                onBlur={(e) => e.target.style.borderColor = theme.palette.divider}
              />
            </div>

            <div>
              <label htmlFor="password" style={{
                display: 'block',
                fontSize: theme.typography.body2.fontSize,
                fontWeight: theme.typography.fontWeightMedium,
                color: theme.palette.text.primary,
                marginBottom: theme.spacing(1),
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: theme.spacing(1.5),
                    paddingRight: theme.spacing(6),
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: theme.shape.borderRadius,
                    outline: 'none',
                    fontSize: theme.typography.body1.fontSize,
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => e.target.style.borderColor = theme.palette.primary.main}
                  onBlur={(e) => e.target.style.borderColor = theme.palette.divider}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: theme.spacing(1.5),
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: theme.palette.action.active,
                    padding: theme.spacing(0.5),
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="role" style={{
                display: 'block',
                fontSize: theme.typography.body2.fontSize,
                fontWeight: theme.typography.fontWeightMedium,
                color: theme.palette.text.primary,
                marginBottom: theme.spacing(1),
              }}>
                Role
              </label>
              <select
                id="role"
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: theme.spacing(1.5),
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: theme.shape.borderRadius,
                  outline: 'none',
                  fontSize: theme.typography.body1.fontSize,
                  backgroundColor: theme.palette.background.paper,
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => e.target.style.borderColor = theme.palette.primary.main}
                onBlur={(e) => e.target.style.borderColor = theme.palette.divider}
              >
                <option value="">Select a role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              style={{
                width: '100%',
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                fontWeight: theme.typography.fontWeightBold,
                padding: theme.spacing(1.5),
                borderRadius: theme.shape.borderRadius,
                border: 'none',
                cursor: 'pointer',
                fontSize: theme.typography.body1.fontSize,
                marginTop: theme.spacing(1),
                transition: 'all 0.2s',
              }}
            >
              Sign Up
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: theme.spacing(3) }}>
            <p style={{
              fontSize: theme.typography.body2.fontSize,
              color: theme.palette.text.secondary,
              margin: 0,
            }}>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                style={{
                  color: theme.palette.primary.main,
                  fontWeight: theme.typography.fontWeightBold,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  fontSize: theme.typography.body2.fontSize,
                }}
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}