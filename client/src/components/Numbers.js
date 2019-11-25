import React from 'react';
import { Vega } from 'react-vega';
import {Container,Row,Col} from 'react-bootstrap'
const signalListeners = { };//hover: handleHover

const dict={ 
    'MatchesDetail':require('../data/MatchesDetailNumbers.json')
}


function Display(p){
    return <Col md={2} style={{textAlign:'center'}}>
        <Row>
        <Col>{p.id}</Col>
        </Row>
        <Row>
            <Col style={{padding:0}} md={3}></Col>
            <Col style={{padding:0}} md={5}><h2 style={{textAlign:'right'}}>{p.data.Value.toFixed(1)}</h2></Col>
            <Col style={{padding:0}} md={2}>{(p.data.isAboveMean?"🟢":"🔴")}</Col>
            <Col style={{padding:0}} md={3}></Col>
        </Row>
        
    </Col>
}

export default (props)=>{    
    let file = dict[props.id]
    
    return (<div>
        <Row style={{marginTop:60}}>
            
        {Object.keys(file.data).map((k)=><Display id={k} data={file.data[k]}></Display>)}
        </Row>
    </div>)
}