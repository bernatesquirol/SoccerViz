import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Vega } from 'react-vega';
import MainScreen from './MainScreen'
import SecondaryScreen from './SecondaryScreen'
import {Button, Row, Col, Jumbotron, Container, Image} from 'react-bootstrap'
const countries = ['es','de','it','gb','fr']
const flags = {
  'es':require('./images/sp.jpg'),
  'de':require('./images/de.jpg'),
  'it':require('./images/it.jpg'),
  'gb':require('./images/gb.jpg'),
  'fr':require('./images/fr.jpg')
}

class App extends React.Component {
  state={country: countries[0], tab:0}
  handleChangeCountry=(key)=>{
    this.setState({country:key})
  }
  render = (props)=>{
    return (
      <div className="App" style={{height:window.innerHeight}}>
        <Jumbotron fluid style={{paddingTop:10,paddingBottom:10}}>
        {this.state.tab==2?<>
          <h1>How exciting is...</h1>
          <Image rounded src={flags[this.state.country]} style={{width: 75}}></Image>
        </>:
        (this.state.tab==1?<>
        <h1>Choose a country</h1>
        <p>See detailed information for each country</p>
        
        </>
        :
        <>
        <h1>What's the most exciting league?</h1>
        <p>We want to know which league is the most exciting in three areas: Classification, Matches and Players</p>
        </>)}
        </Jumbotron>
        
        <p></p>
            {this.state.tab==0?
              <>
              <MainScreen></MainScreen>
              <SecondaryScreen></SecondaryScreen>
              <Button variant="primary"  onClick={()=>this.setState({tab:1})}>See the details</Button>
              </>
              :null
            }
            {this.state.tab==1?
              <>
              <Row style={{paddingTop: window.innerHeight*0.25}}>
                <Col></Col>
                {countries.map((c)=>
                <Col className='flagSelector' onClick={()=>this.setState({tab:2, country:c})}>
                  <Image   
                  rounded                
                  src={flags[c]} style={{
                     width:window.innerWidth*0.5/countries.length,
                     //dothis
                    }}></Image>
                    
                </Col>
                )}
                <Col></Col>
              </Row>
              </>
              :null
            }
            {this.state.tab==2?
              <>
                <SecondaryScreen country={this.state.country}></SecondaryScreen>
                <Button variant="primary" onClick={()=>this.setState({tab:0})}>Go back</Button>
              </>
              :null
            }  

      </div>
    );
  }
}

export default App;
