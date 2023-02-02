/* eslint-disable object-shorthand */
/* eslint-disable react/jsx-indent */
import React, { useState, useRef } from 'react';
import { Field, Form } from 'react-final-form';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { NavLink, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import PasswordField from '@/shared/components/form/Password';
import styled from 'styled-components';
import {
  FormGroup,
  FormGroupField,
  FormGroupIcon,
  FormGroupLabel,
} from '@/shared/components/form/FormElements';
import CustomLoading from '../../CustomLoading';

import { changeDataArrChuHang } from '../../../../redux/actions/arrChuHangAction';
import renderCheckBoxField from '../../form/CheckBox';
import MyField from './MyField';
import {
  AccountButton,
  AccountButtons,
  AccountForgotPassword,
  LoginForm,
} from '../AccountElements';
import { Changeloading } from '../../../../redux/actions/loadingAction';
import UserApi from '../../../../api/UserApi';
import NotificationError from '../../NotificationError';

const LogInForm = ({
  onSubmit,
  errorMessage,
  fieldUser,
  typeFieldUser,
  form,
}) => {
  const errorMsg = useSelector((state) => state.user.error);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [checkLogin, setCheckLogin] = useState(false);
  const [isrequied, setIsrequied] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const cookies = new Cookies();

  //?
  const refPassword = useRef();

  // ? state redux
  const loading = useSelector((state) => state.loading);

  const login = () => {
    const passwordRemember = document.getElementsByClassName(
      'input-without-border-radius'
    )[1].value;
    const dataLogin = {
      userName: userName,
      password: password || passwordRemember,
    };
    if (dataLogin.password && dataLogin.userName) {
      setIsrequied(false);
      dispatch(Changeloading({ loading: true }));
      fetch('https://gateway-api.nandhlogistics.vn/api/Users/loginTKS', {
        headers: {
          Accept: 'application/json ,',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(dataLogin),
      })
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((response) => {
          if (response.message.message_Code === 200) {
            cookies.set('token', response.data.token, { path: '/' });
            cookies.set('hoten', response.data.ho_Ten, { path: '/' });
            localStorage.setItem('hoten', response.data.ho_Ten);
            cookies.set('ma_dang_nhap', response.data.ma_Dang_Nhap, {
              path: '/',
            });
            localStorage.setItem('ma_dang_nhap', response.data.ma_Dang_Nhap);
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            // cookies.set('accessToken', data.accessToken, { path: '/' });
            // cookies.set('refreshToken', data.refreshToken, { path: '/' });
            cookies.set('userId', response.data.auto_ID, { path: '/' });
            dispatch(Changeloading({ loading: false }));
            history.push('/dashboard');
          }
        })
        .catch((err) => {
          dispatch(Changeloading({ loading: false }));
          if (err.status === 401) {
            dispatch(Changeloading({ loading: false }));
            setCheckLogin(true);
            setPassword('');
            history.push('/');
          }
        });
    } else {
      setIsrequied(true);
    }
  };

  return (
    <>
      <CustomLoading loading={loading.loading} />
      <Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <LoginForm onSubmit={handleSubmit}>
            <Alert
              variant="danger"
              show={!!errorMessage || !!errorMsg}
            >
              {errorMessage}
              {errorMsg}
            </Alert>
            <FormGroup>
              <FormGroupLabel>{fieldUser}</FormGroupLabel>
              <FormGroupField>
                <FormGroupIcon>
                  <AccountOutlineIcon />
                </FormGroupIcon>
                <MyField
                  name="username"
                  value={userName}
                  component="input"
                  type={typeFieldUser}
                  placeholder={fieldUser}
                  className="input-without-border-radius"
                  onChange={(val) => setUserName(val)}
                />
              </FormGroupField>
            </FormGroup>
            <FormGroup>
              <FormGroupLabel>Password</FormGroupLabel>
              <FormGroupField>
                <MyField
                  name="password"
                  value={password}
                  component={PasswordField}
                  placeholder="Password"
                  className="input-without-border-radius"
                  onChange={(val) => setPassword(val)}
                  keyIcon
                />
                {/* <AccountForgotPassword>
                  <NavLink to="/reset_password">Forgot a password?</NavLink>
                </AccountForgotPassword> */}
              </FormGroupField>
            </FormGroup>
            <FormGroup>
              {/* <FormGroupField>
                <Field
                  name="remember_me"
                  render={renderCheckBoxField}
                  label="Remember me"
                  type="checkbox"
                />
              </FormGroupField> */}
            </FormGroup>
            <FormGroup>
              {checkLogin ? (
                <NotificationError>
                  Tài khoản hoặc mật khẩu không đúng
                </NotificationError>
              ) : (
                ''
              )}
              {isrequied ? (
                <NotificationError>
                  Tài Khoản và mật khẩu không được để trống
                </NotificationError>
              ) : (
                ''
              )}
            </FormGroup>
            <AccountButtons>
              {form === 'modal_login' ? (
                <AccountButton
                  type="submit"
                  variant="primary"
                >
                  Sign In
                </AccountButton>
              ) : (
                <AccountButton
                  as={NavLink}
                  variant="primary"
                  to="/"
                  onClick={login}
                >
                  Sign In
                </AccountButton>
              )}
              {/* <AccountButton
              as={NavLink}
              variant="outline-primary"
              to="/register"
            >
              Create Account
            </AccountButton> */}
            </AccountButtons>
          </LoginForm>
        )}
      </Form>
    </>
  );
};

LogInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  fieldUser: PropTypes.string,
  typeFieldUser: PropTypes.string,
  form: PropTypes.string.isRequired,
};

LogInForm.defaultProps = {
  errorMessage: '',
  fieldUser: 'Username',
  typeFieldUser: 'text',
};

export default LogInForm;
