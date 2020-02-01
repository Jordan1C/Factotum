import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import useThunkReducer from 'react-hook-thunk-reducer';
import { addEvent, eventState, eventReducer } from '../reducers/events';

// class AddEvent extends Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             eventName: "",
//             city: "",
//             startDate: "",
//             endDate: "",
//             group: ""
//         }
//         this.handleChange = this.handleChange.bind(this)

//     }
// }

const AddEvent = props => {
    const [eventName, setEventName] = useState('');
    const handleNameChange = e => {
        setEventName({ ...eventName, [e.target.name]: [e.target.value] });
    };

    const [hostCity, setHostCity] = useState('');
    const handleCityChange = e => {
        setHostCity({ ...hostCity, [e.target.name]: [e.target.value] });
    };
    const [date, setDate] = useState({
        startDate: '',
        endDate: ''
    });
    const [group, setGroup] = useState('');

    const [state, dispatch] = useThunkReducer(eventReducer, eventState);

    const handleSubmit = e => {
        e.preventDefault;
        dispatch(
            addEvent(eventName, city, date.startDate, date.endDate, group)
        );
    };

    return <h1>Placeholder</h1>;
};

export default AddEvents;
