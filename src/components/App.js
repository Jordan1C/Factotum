import React from 'react';
import styled from 'styled-components';
import { firebaseConfig } from '../firebase/config';
import { FirebaseWrapper } from '../firebase/firebase';

const Title = styled.h1`
    color: black;
    font-size: 2.5rem;
    font-weight: 700;
`;

const App = () => {
    FirebaseWrapper.GetInstance().Initialize(firebaseConfig);
    return <Title>Factotum</Title>;
};

export default App;
