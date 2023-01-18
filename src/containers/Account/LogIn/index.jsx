import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import withAuthFirebase from '@/shared/components/account/auth/withAuthFirebase';
import LogInForm from '@/shared/components/account/loginForm/LogInForm';
import showResults from '@/utils/showResults';

import {
  AccountCard,
  AccountContent,
  AccountHead,
  AccountLogo,
  AccountTitle,
  AccountWrap,
} from '@/shared/components/account/AccountElements';

const LogIn = ({ changeIsOpenModalFireBase }) =>
  localStorage.getItem('accessToken') !== 'undefined' &&
  localStorage.getItem('accessToken') ? (
    <Redirect to="/dashboard" />
  ) : (
    <AccountWrap>
      <AccountContent>
        <AccountCard>
          <AccountHead>
            <AccountTitle>
              Welcome to
              <AccountLogo> NandHLogistics</AccountLogo>
            </AccountTitle>
          </AccountHead>
          <LogInForm
            onSubmit={showResults}
            form="log_in_form"
          />
        </AccountCard>
      </AccountContent>
    </AccountWrap>
  );

LogIn.propTypes = {
  changeIsOpenModalFireBase: PropTypes.func.isRequired,
};

export default withAuthFirebase(LogIn);
