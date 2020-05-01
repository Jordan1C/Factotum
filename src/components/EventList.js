import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllEvents } from '../reducers/events';
import Event from './Event';

// class EventList extends Component {
//     constructor(props) {
//         super(props);
//     }

//     componentDidMount() {
//         this.props.getAllEvents();
//     }

//     render() {
//         const { events } = this.props;
//         return (

//         );
//     }
// }

// const mapStateToProps = state => ({
//     events: state.event.eventList
// });

// const mapDispatchToProps = dispatch => ({
//     getAllEvents: () => dispatch(getAllEvents())
// });

// export default connect(mapStateToProps, mapDispatchToProps)(EventList);

export default function EventList(props) {
    const { events } = props;
    useEffect(() => {
        props.getAllEvents();
    }, [event]);
    return (
        <div>
            <h1>2020 Circuit/Festival Calendar</h1>
            {events.map((event, index) => {
                return (
                    <div className="category" key={index}>
                        <Event event={event} />
                    </div>
                );
            })}
        </div>
    );
}
