import React from 'react';
import logo from './logo.svg';
import './App.css';
import VegaComponent from './components/VegaComponent';
import {Container,Row,Col} from 'react-bootstrap'
import Grid from './components/Grid'
import pie from './images/pie.jpg'
import pie2 from './images/pie2.jpg'
export default ()=>(
    <Container>
        <Row>
            <Col sm={4}>
                <h2>League competition</h2>
                <p>Which league is the most competitive</p>
                <hr/>
                <VegaComponent id='ClassificationMain'></VegaComponent>
                <p className="our-desc"> Frequency that league positions change over a season (left). Teams grouped according to closeness of points (right).</p>
                <VegaComponent id='ClassificationMain2'></VegaComponent>
                <p className="our-desc"> Distribution of team ratings by league </p>
            </Col>
            <Col sm={4}>
                <h2>Matches</h2>
                <p>Which league has the most interesting matches</p>
                <hr/>
                <VegaComponent id='MatchesMain'></VegaComponent>
                <p className="our-desc"> Total goals & shots by league </p>
                <Grid></Grid>
                <p className="our-desc"> Key match entertainment indicators </p>
            </Col>
            <Col sm={4}>
                <h2>Players</h2>
                <p>Which league attracts the best players</p><hr/>
                <img src={pie} style={{width:300}}></img>
                <p className="our-desc"> Distribution of top 100 players across leagues </p>
                <img src={pie2} style={{width:300}}></img>
                <p className="our-desc"> Distribution of player performance by league </p>
            </Col>
        </Row>
    </Container>
)