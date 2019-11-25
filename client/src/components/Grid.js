import React from 'react';
import { Vega } from 'react-vega';
import {Table,Row,Col} from 'react-bootstrap'
const signalListeners = { };//hover: handleHover

const dict={ 
    'MatchesDetail':require('../data/MatchesDetailNumbers.json')
}

const flags = {
    'es':require('../images/sp.jpg'),
    'de':require('../images/de.jpg'),
    'it':require('../images/it.jpg'),
    'gb':require('../images/gb.jpg'),
    'fr':require('../images/fr.jpg')
}

const rowHeader = (p)=>{
    return <thead><tr>
        <th ></th>
        <th >Best</th>
        <th >Worst</th>
    </tr></thead>
}
const rowTable = (p)=>{
    return <tr>
        <td >{p.title}</td>
        <td ><img style={{width:60}} src={flags[p.best]}/></td>
        <td ><img style={{width:60}} src={flags[p.worst]}/></td>
    </tr>
}

const data=[
    {title:'Goaless draws',best:'gb',worst:'fr'},
    {title:'Lead Changes',best:'fr',worst:'es'},
    {title:'Last minute goals',best:'it',worst:'de'}
]
export default (props)=>{
    return <Table responsive>
        {rowHeader()}
        <tbody>{data.map((d)=>rowTable(d))}</tbody>
        </Table>
}
