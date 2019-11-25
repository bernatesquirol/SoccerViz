import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Vega } from 'react-vega';
import {Container,Row,Col} from 'react-bootstrap'
import VegaComponent from './components/VegaComponent';
import Numbers from './components/Numbers'
import {Nav} from 'react-bootstrap'
function NavDropdownExample(props) {
    const handleSelect = eventKey => alert(`selected ${eventKey}`);
  
    return (
      <Nav style={{width:'100%'}} variant="pills" activeKey={props.currentKey} onSelect={props.handleSelect}>
          <Row style={{width:'100%'}}> 
              <Col xs={4}>
                <Nav.Item>
                <Nav.Link eventKey="0">
                    <h2>Classification</h2>
                </Nav.Link>
                </Nav.Item>
            </Col>
            <Col xs={4}>
                <Nav.Item>
                <Nav.Link eventKey="1" >
                    <h2>Matches</h2>
                </Nav.Link>
                </Nav.Item>
            </Col>
            <Col xs={4}>
                <Nav.Item>
                <Nav.Link eventKey="2">
                    <h2>Players</h2>
                </Nav.Link>
                </Nav.Item>
            </Col>
        </Row>
      </Nav>
    );
  }
class SecondScreen extends React.Component{
    state = {tab:0}
    render(){
    return <Container>
        <Row md={12}>
        <NavDropdownExample currentKey={this.state.tab} handleSelect={(eventKey)=>this.setState({tab:eventKey})}></NavDropdownExample>
        </Row>
        <Row>
        <Col xs={4}>
        <p>We want to know how interesting are the matches in each league</p>
        </Col>
        <Col xs={4}>
            <p>Average matches stats</p>
        </Col>
        <Col xs={4}>
            <p>Computing the attraction of players to the league</p>
        </Col>
        </Row>
        <Row>
        <Col md={12}>
        {this.state.tab==0?
        <>
        <VegaComponent id='ClassificationDetail'></VegaComponent>
        </>
        :
        (this.state.tab==1?
        <>
        <Numbers id='MatchesDetail'></Numbers>
        <VegaComponent id='MatchesDetail'></VegaComponent>
        </>
        :
        <><VegaComponent id='PlayersDetail'/></>
        )}
        </Col>
        </Row>
    </Container>
    }
}
export default SecondScreen