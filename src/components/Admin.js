import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import useThunkReducer from 'react-hook-thunk-reducer';
import {
    getSingleEvent,
    deleteEvent,
    updateEventDate,
    updateEventWithSite,
    updateEventWithSheet,
    eventState,
    eventReducer
} from '../reducers/events';

const Admin = props => {
    const [date, setDate] = useState({
        startDate: '',
        endDate: ''
    });
    const [siteUrl, setSiteUrl] = useState('');
    return <h1>Placeholder</h1>;
};

export default Admin;
