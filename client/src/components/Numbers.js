import React from 'react';
import ReactDOM from 'react-dom';
import { Vega } from 'react-vega';
import {Container,Row,Col} from 'react-bootstrap'
const signalListeners = { };//hover: handleHover

const dict={ 
    'MatchesDetail':require('../data/MatchesDetailNumbers.json')
}


function Display(p){
    return <Col md={4}>
        <Row>
            <Col md={10}>{p.data.Value.toFixed(1)}</Col>
            <Col md={2}>{p.data.isAboveMean?"🟢":"🔴"}</Col>
        </Row>
        <Row>
        {p.id}
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