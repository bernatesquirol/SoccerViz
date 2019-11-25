import React from 'react';
import logo from './logo.svg';
import './App.css';
import VegaComponent from './components/VegaComponent';
import {Container,Row,Col} from 'react-bootstrap'

export default ()=>(
    <Container>
        <Row>
            <Col sm={4}><VegaComponent id='ClassificationMain'></VegaComponent></Col>
            <Col sm={4}><VegaComponent id='MatchesMain'></VegaComponent></Col>
            <Col sm={4}><VegaComponent id='PlayersMain'></VegaComponent></Col>
        </Row>
    </Container>
)