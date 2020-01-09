import { FirebaseWrapper } from '../firebase/firebase';

const GOT_ALL_EVENTS = 'GOT_ALL_EVENTS';
const GOT_SINGLE_EVENT = 'GOT_SINGLE_EVENT';
const ADDED_EVENT = 'ADDED_EVENT';
const DELETED_EVENT = 'DELETED_EVENT';
const UPDATED_EVENT = 'UPDATED_EVENT';

const gotAllEvents = events => {
    return { type: GOT_ALL_EVENTS, events };
};

const gotSingleEvent = event => {
    return { type: GOT_SINGLE_EVENT, event };
};

const addedEvent = event => {
    return { type: ADDED_EVENT, event };
};

const deletedEvent = eventId => {
    return { type: DELETED_EVENT, eventId };
};

const updatedEvent = event => {
    return { type: UPDATED_EVENT, event };
};

export const getAllEvents = () => async dispatch => {
    try {
        await FirebaseWrapper.GetInstance().GetAllEvents(async events =>
            dispatch(gotAllEvents(events))
        );
    } catch (error) {
        console.log('getAllEvents failed', error);
    }
};

export const getSingleEvent = event => async dispatch => {
    try {
        await FirebaseWrapper.GetInstance().GetSingleEvent(event, singleEvent =>
            dispatch(gotSingleEvent(singleEvent))
        );
    } catch (error) {
        console.log('getSingleEvent failed', error);
    }
};

export const addEvent = (
    event,
    city,
    startDate,
    endDate,
    group
) => async dispatch => {
    try {
        await FirebaseWrapper.GetInstance().AddEvent(
            event,
            city,
            startDate,
            endDate,
            group,
            newEvent => dispatch(addedEvent(newEvent))
        );
    } catch (error) {
        console.log('addEvent failed', error);
    }
};

export const deleteEvent = event => async dispatch => {
    try {
        await FirebaseWrapper.GetInstance().DelEvent(event, eventId =>
            dispatch(deletedEvent(eventId))
        );
    } catch (error) {
        console.log('deleteEvent failed', error);
    }
};

export const updateEventDate = (
    event,
    startDate,
    endDate
) => async dispatch => {
    try {
        await FirebaseWrapper.GetInstance().UpdateEventDate(
            event,
            startDate,
            endDate,
            eventAfterUpdate => dispatch(updatedEvent(eventAfterUpdate))
        );
    } catch (error) {
        console.log('updateEventDate failed', error);
    }
};

export const updateEventWithSite = (event, siteLink) => async dispatch => {
    try {
        await FirebaseWrapper.GetInstance().AddEventSite(
            event,
            siteLink,
            eventAfterUpdate => dispatch(updatedEvent(eventAfterUpdate))
        );
    } catch (error) {
        console.log('updateEventWithSite failed', error);
    }
};

export const updateEventWithSheet = (event, spreadsheet) => async dispatch => {
    try {
        await FirebaseWrapper.GetInstance().AddEventSheet(
            event,
            spreadsheet,
            eventAfterUpdate => dispatch(updatedEvent(eventAfterUpdate))
        );
    } catch (error) {
        console.log('updateEventWithSheet failed', error);
    }
};

const eventState = {
    eventList: [],
    singleEvent: {}
};

export default (state = eventState, action) => {
    switch (action.type) {
        case GOT_ALL_EVENTS:
            return { ...state, eventList: action.events };
        case GOT_SINGLE_EVENT:
            return { ...state, singleEvent: action.event };
        case ADDED_EVENT:
            return { ...state, eventList: [...state.events, action.event] };
        case DELETED_EVENT:
            return {
                ...state,
                eventList: state.events.filter(event => {
                    return event.id !== action.eventId;
                })
            };
        case UPDATED_EVENT:
            return {
                ...state,
                eventList: state.events.map(event => {
                    return event.id === action.event.id ? action.event : event;
                })
            };
        default:
            return state;
    }
};
