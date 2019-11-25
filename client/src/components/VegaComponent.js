import React from 'react';
import { Vega } from 'react-vega';
//const requireDir = require('require-dir');

//const data = requireDir('../data');
const dict={ 
    'ClassificationDetail2':require('../data/ClassificationDetail2Spec.json'),
    'ClassificationDetail':require('../data/ClassificationDetailSpec.json'),
    'ClassificationMain':require('../data/ClassificationMainSpec.json'),
    'ClassificationMain2':require('../data/ClassificationMain2Spec.json'),
    'MatchesDetail':require('../data/MatchesDetailSpec.json'),
    'MatchesMain':require('../data/MatchesMainSpec.json'),
    'PlayersDetail':require('../data/PlayersDetailSpec.json')
}

const signalListeners = { };//hover: handleHover
export default (props)=>{
    let spec = dict[props.id]
    return <Vega spec={spec} signalListeners={signalListeners} />
}