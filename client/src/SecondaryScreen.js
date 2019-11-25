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
                    <h2>League competition</h2>
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
  const dict = {
    'es':'spanish',
    'de':'german',
    'it':'italian',
    'gb':'english',
    'fr':'french'
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
        <hr/>
        <p>How competitive is {this.props.country?dict[this.props.country]:null} league</p>
        </Col>
        <Col xs={4}>
        <hr/>
        <p>How interesting are the matches in {this.props.country?dict[this.props.country]:null} league</p>
        </Col>
        <Col xs={4}>
        <hr/>
        <p>How attractive is {this.props.country?dict[this.props.country]:null} league to players</p>
        </Col>
        </Row>
        <Row>
        <Col md={12}>
        {this.state.tab==0?
        <>
        <VegaComponent id='ClassificationDetail'></VegaComponent>
        <p className="our-desc"> Frequency of position after each round </p>
        <VegaComponent id='ClassificationDetail2'></VegaComponent>
        <p className="our-desc"> FIFA 2019 ratings by team </p>
            {/*<p className="our-desc"> Team FIFA Ratings </p>*/}
        </>
        :
        (this.state.tab==1?
        <>
        <Numbers id='MatchesDetail'></Numbers>
            <p className="our-desc"> Match statistics per 90 min (green/red marker represents above/below average across leagues) </p>
        <VegaComponent id='MatchesDetail'></VegaComponent>
            <p className="our-desc"> Key match entertainment indicators compared to average </p>
        </>
        :
        <><VegaComponent id='PlayersDetail'/>
            <p className="our-desc"> Player nationalities </p>
        </>
        )}
        </Col>
        </Row>
    </Container>
    }
}
export default SecondScreen