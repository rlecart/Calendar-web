import * as React from 'react';

import '../style/Login.css';

import styled from 'styled-components'
import { Navigate, useNavigate } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';

import RenderIf from '../components/RenderIf';
import axios from 'axios';
import { API } from '../api';

const Background = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row-reverse;
    background: #120E13;
`
const RightPanel = styled.div`
    display: flex;
    width: 47%;
    padding: 6.25rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
    background: #0E0A10;
    border-left: 1px solid #F18D5E;

    @media (max-width: 1400px) {
      width: 60%;
    }
    @media (max-width: 1200px) {
      width: 80%;
    }
    @media (max-width: 992px) {
      width: 95%;
    }
`
const TitleAndDescription = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
    align-self: stretch;
`
const Title = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-self: stretch;
`
const TitleText = styled.h1`
    color: #F0E8DA;
    font-family: Inter;
    font-size: 2.125rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.27625rem;
    margin: 0;
`
const Description = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-self: stretch;
`
const DescriptionText = styled.p`
    margin: 0;
    color: rgba(240, 232, 218, 0.60);
    font-family: Inter;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.075rem;
`
const CloudSpan = styled.span`
    color: #F18D5E;
    font-family: Inter;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.075rem;
`
const EmojiSpan = styled.span`
    color: #F18D5E;
`
const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    align-self: stretch;
`
const SignUpAndForgotPassword = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
`
const SignUpWrapper = styled.button`
    border: 0;
    background: transparent;
    padding: 0;
`
const SignUpText = styled.p`
    color: #F18D5E;
    font-family: Inter;
    font-size: 1rem;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.05rem;
    margin: 0;
`
const ForgotPassword = styled.button`
    border: 0;
    background: transparent;
    padding: 0;
`
const ForgotPasswordText = styled.p`
    color: #F18D5E;
    font-family: Inter;
    font-size: 1rem;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.05rem;
    margin: 0;
`
const LoginInputs = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.25rem;
    align-self: stretch;
`
const LoginInputsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
    align-self: stretch;
`
const LoginInput = styled.input`
    display: flex;
    padding: 0.9375rem 1.25rem;
    align-items: center;
    gap: 0.625rem;
    flex: 1 0 0;

    border-radius: 0.625rem;
    background: #F0E8DA;
    border: 0;

    color: rgba(6, 2, 9, 1);
    
    &::placeholder {
      margin: 0;
      color: rgba(6, 2, 9, 0.50);
      font-family: Inter;
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 0.05rem;
    }
`
const LoginButton = styled.button`
    display: flex;
    height: 2.8125rem;
    padding: 0.9375rem 1.25rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    align-self: stretch;

    border-radius: 0.625rem;
    background: #B66B38;
    border: 0;

    &:hover {
      background: #F18D5E;
    }
`
const LoginButtonText = styled.p`
    margin: 0;
    color: #F0E8DA;
    font-family: Inter;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.05625rem;
`

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const [error, setError] = React.useState<string>('');

  const handleSubmit = async () => {
    setError('');

    try {
      const loginRes = await axios.post(`${API}/user/login`, {
        username: username,
        password: password,
      }, { withCredentials: true });
      if (loginRes.status !== 200)
        throw (loginRes);

      localStorage.setItem('authentificated', 'true');

      navigate('/');
    } catch (err) {
      console.log('err', err)
      if (err.response.status === 404)
        setError('Identifiant ou mot de passe incorrect.');
      else if (err.response.status !== 200)
        setError('Une erreur est survenue.');
    }
  }

  const isAuthenticated = localStorage.getItem('authentificated') !== null;

  if (isAuthenticated)
    return <Navigate to="/" />

  return (
    <React.Fragment>
      <Background>
        <RightPanel>
          <TitleAndDescription>
            <Title>
              <TitleText>
                Calendar Planer
              </TitleText>
            </Title>

            <Description>
              <DescriptionText>
                Connectez-vous pour accéder a votre calendrier synchronisé <CloudSpan>dans le cloud</CloudSpan> <EmojiSpan>🔥</EmojiSpan>
              </DescriptionText>
            </Description>
          </TitleAndDescription>

          <RenderIf isTrue={error !== ''}>
            <Alert
              className='w-100'
              variant='danger'
              data-bs-theme="dark"
            >
              {error}
            </Alert>
          </RenderIf>
          <LoginForm>
            <SignUpAndForgotPassword>
              <SignUpWrapper onClick={() => navigate('/signup')}>
                <SignUpText>
                  Pas encore inscrit ?
                </SignUpText>
              </SignUpWrapper>

              <ForgotPassword onClick={() => { }}>
                <ForgotPasswordText>
                  Mot de passe oublié ?
                </ForgotPasswordText>
              </ForgotPassword>
            </SignUpAndForgotPassword>

            <LoginInputsWrapper>
              <LoginInputs>
                <LoginInput
                  placeholder='Identifiant'
                  onChange={(newUsername: React.ChangeEvent<HTMLInputElement>) => setUsername(newUsername.target.value)}
                  value={username}
                  type='text'
                />
                <LoginInput
                  placeholder='Mot de passe'
                  onChange={(newPassword: React.ChangeEvent<HTMLInputElement>) => setPassword(newPassword.target.value)}
                  value={password}
                  type='password'
                />
              </LoginInputs>

              <LoginButton onClick={handleSubmit}>
                <LoginButtonText>
                  Se connecter
                </LoginButtonText>
              </LoginButton>
            </LoginInputsWrapper>

          </LoginForm>
        </RightPanel>
      </Background>
    </React.Fragment>
  );
};

export default Login;