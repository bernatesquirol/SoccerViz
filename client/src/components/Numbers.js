import React from 'react';
import ReactDOM from 'react-dom';
import { Vega } from 'react-vega';
import {Container,Row,Col} from 'react-bootstrap'
const signalListeners = { };//hover: handleHover

const dict={ 
    'MatchesDetail':require('../data/MatchesDetailNumbers.json')
}


function Display(p){
    return <Col md={4} style={{textAlign:'center'}}>
        <Row>
        <Col>{p.id}</Col>
        </Row>
        <Row>
            <Col style={{padding:0}} md={2}></Col>
            <Col style={{padding:0}} md={6}><h2 style={{textAlign:'right'}}>{p.data.Value.toFixed(1)}</h2></Col>
            <Col style={{padding:0}} md={2}>{(p.data.isAboveMean?"🟢":"🔴")}</Col>
            <Col style={{padding:0}} md={2}></Col>
        </Row>
        
    </Col>
}

export default (props)=>{    
    let file = dict[props.id]
    
    return (<div>
        <h2>{file.title}</h2>
        <Row>
        {Object.keys(file.data).map((k)=><Display id={k} data={file.data[k]}></Display>)}
        </Row>
    </div>)
}