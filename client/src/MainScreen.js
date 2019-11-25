import React from 'react';
import logo from './logo.svg';
import './App.css';
import VegaComponent from './components/VegaComponent';
import {Container,Row,Col} from 'react-bootstrap'
import Grid from './components/Grid'
import pie from './images/pie.jpg'
export default ()=>(
    <Container>
        <Row>
            <Col sm={4}>
                <h2>Classification</h2>
                <p>We want to know how close the classification is for every soccer league</p>
                <VegaComponent id='ClassificationMain'></VegaComponent>
                <p className="our-desc"> Table Ranking Variability </p>
                <VegaComponent id='ClassificationMain2'></VegaComponent>
                <p className="our-desc"> Team Rating By League </p>
            </Col>
            <Col sm={4}>
                <h2>Matches</h2>
                <p>We want to know how interesting are the matches in each league</p>
                <VegaComponent id='MatchesMain'></VegaComponent>
                <p className="our-desc"> Goals & Shots By League </p>
                <Grid></Grid>
                <p className="our-desc"> Key Performance Indicators </p>
            </Col>
            <Col sm={4}>
                <h2>Players</h2>
                <p>We want to know where are the top 100 players</p>
                <img src={pie} style={{width:300}}></img>
                <p className="our-desc"> Top 100 Players Per League </p>
                <img src={pie2} style={{width:300}}></img>
                <p className="our-desc"> Player Performance By League </p>
            </Col>
        </Row>
    </Container>
)