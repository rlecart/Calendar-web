import * as React from 'react';

import '../style/Login.css';

import styled from 'styled-components'
import { Navigate, useNavigate } from 'react-router-dom';

const Background = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row-reverse;
    background: #2C2E31;
`
const RightPanel = styled.div`
    display: flex;
    width: 42%;
    padding: 6.25rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
    background: #2C2E31;
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
    color: #D3D3D3;
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
    color: rgba(211, 211, 211, 0.60);
    font-family: Inter;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.075rem;
`
const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
    align-self: stretch;
`
const LoginInputs = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
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
    background: #37393C;
    border: 0;

    color: #FFF;
    
    &::placeholder {
      margin: 0;
      color: rgba(211, 211, 211, 0.30);
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
    background: #3E526F;
    border: 0;

`
const LoginButtonText = styled.p`
    margin: 0;
    color: #FFF;
    font-family: Inter;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.05625rem;
`

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState<String>('');
  const [password, setPassword] = React.useState<String>('');

  const handleSubmit = () => {
    navigate('/');
  }

  const isAuthenticated = false;

  if (isAuthenticated)
    return <Navigate to="/" />

  return (
    <React.Fragment>
      <Background className='w-100 h-100vh d-flex flex-row-reverse bg-grey'>
        <RightPanel>
          <TitleAndDescription>
            <Title>
              <TitleText>
                Calendar Planer
              </TitleText>
            </Title>

            <Description>
              <DescriptionText>
                Connectez-vous pour accéder a votre calendrier synchronisé dans le cloud.
              </DescriptionText>
            </Description>
          </TitleAndDescription>

          <LoginForm>
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
          </LoginForm>
        </RightPanel>
      </Background>
    </React.Fragment>
  );
};

export default Login;