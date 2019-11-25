import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Vega } from 'react-vega';
import {Container,Row,Col} from 'react-bootstrap'
import VegaComponent from './components/VegaComponent';
import Numbers from './components/Numbers'
export default ()=>(
    <Container>
        <Row md={12}>
            {/* Classification */}
            <Col sm={4}><VegaComponent id='ClassificationDetail'></VegaComponent></Col>
            {/* Matches */}
            <Col sm={4}>
                <VegaComponent id='MatchesDetail'></VegaComponent>
                <Numbers id='MatchesDetail'></Numbers>
            </Col>
            {/* Players */}
            <Col sm={4}><VegaComponent id='PlayersDetail'></VegaComponent></Col>
        </Row>
    </Container>
)