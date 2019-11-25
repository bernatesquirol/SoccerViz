import React from 'react';
import ReactDOM from 'react-dom';
import { Vega } from 'react-vega';
//const requireDir = require('require-dir');

//const data = requireDir('../data');
const dict={ 
    'ClassificationDetail':require('../data/ClassificationDetailSpec.json'),
    'ClassificationMain':require('../data/ClassificationMainSpec.json'),
    'MatchesDetail':require('../data/MatchesDetailSpec.json'),
    'MatchesMain':require('../data/MatchesMainSpec.json'),
    'PlayersDetail':require('../data/PlayersDetailSpec.json'),
    'PlayersMain':require('../data/PlayersMainSpec.json')
}

const signalListeners = { };//hover: handleHover
export default (props)=>{
    let spec = dict[props.id]
    spec['config']['view']['width']=10
    spec['config']['view']['height']=10
    return <Vega spec={spec} signalListeners={signalListeners} />
}