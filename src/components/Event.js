import React from 'react';
import { Link } from 'react-router-dom';

const Event = props => {
    const {
        eventName,
        hostCity,
        startDate,
        endDate,
        group,
        eventSite,
        eventSheet
    } = props.event;
    return (
        <div>
            <ul>
                <li>
                    <Link to={`/events/${eventName}`}>{eventName}</Link>
                </li>
                <li>{hostCity}</li>
                <li>
                    {startDate} - {endDate}
                </li>
                <li>{group}</li>
            </ul>
        </div>
    );
};

export default Event;
