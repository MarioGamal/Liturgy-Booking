import { takeLatest, put, select, call } from 'redux-saga/effects';
import { GET_MEMBER, DELETE_MEMBER, setMember, UPDATE_MEMBER } from '../actions/members';
import { setCommon } from '../actions/common';
import { validateField } from '../../utilies/memberForm';
import { members, membersValues, isAdminStore } from './selectors';
import { axiosInstance } from '../../fetch';
import { errorHandler } from './errorHandler';

const getMember = function* (action) {
    const { id } = action.payload;
    try {
        yield put(setMember(`loading`, true));
        let member = yield call(() =>
            axiosInstance.get('/churchmember', { params: { "nationalId": id } }));

        member = member.data;
        member.id = member.nationalId || '';
        delete member.nationalId;
        member.name = member.fullName || '';
        delete member.fullName;
        member.booking = {
            id: member.lastBooking?.bookingId,
            date: member.lastBooking?.date.slice(0, -1),
            description: member.lastBooking?.description
        };
        if (member.lastEveningPrayer) {
            member.lastEveningPrayer.date = member.lastEveningPrayer.date.slice(0, -1)
            member.lastEveningPrayer.id = member.lastEveningPrayer.bookingId;
            delete member.lastEveningPrayer.bookingId;
        }
        delete member.lastBooking;
        yield put(setMember(`loading`, false));
        const memberForm = {
            name: validateField('name', member.name),
            mobile: validateField('mobile', member.mobile)
        }
        yield put(setMember(`member.validationMsgs`, {
            name: memberForm.name.validationMsg,
            mobile: memberForm.mobile.validationMsg,
        }));
        yield put(setMember(`member.values`, {
            ...member,
            name: memberForm.name.value,
            mobile: memberForm.mobile.value
        }));
    } catch (error) {
        yield put(setMember(`loading`, false));
        if (error?.response?.status === 404) {
            yield put(setMember(`member.validationMsgs`, {}));
            yield put(setMember(`member.values`, {}));
        } else
            yield* errorHandler()
    }

}
const updateMember = function* (action) {
    try {
        let { member } = action.payload
        member.nationalId = member.id;
        delete member.id
        member.fullName = member.name
        delete member.name
        const members = [member];
        yield put(setCommon(`loadingPage`, true));
        const membersResponse = yield call(() =>
            axiosInstance.put('/churchmember/', { data: members }));
      
        member = membersResponse.data[0]
        member.id = member.nationalId || '';
        delete member.nationalId;
        member.name = member.fullName || '';
        delete member.fullName;
        member.booking = {
            id: member.lastBooking?.bookingId,
            date: member.lastBooking?.date.slice(0, -1),
            description: member.lastBooking?.description
        };
        delete member.lastBooking;
        const memberForm = {
            name: validateField('name', member.name),
            mobile: validateField('mobile', member.mobile)
        }
        yield put(setMember(`member.validationMsgs`, {
            name: memberForm.name.validationMsg,
            mobile: memberForm.mobile.validationMsg
        }));
        yield put(setMember(`member.values`, {
            ...member,
            name: memberForm.name.value,
            mobile: memberForm.mobile.value
        }));
        yield put(setCommon(`loadingPage`, false));
    } catch (error) {
        yield put(setCommon(`loading`, false));
        yield* errorHandler()
    }

}

const deleteMember = function* (action) {
    try {
        let { id } = action.payload
        yield put(setCommon(`loadingPage`, true));
        const response = yield call(() =>
            axiosInstance.delete('/churchmember/' + id));
        yield put(setMember(`member.validationMsgs`, {}));
        yield put(setMember(`member.values`, {}));
        yield put(setCommon(`loadingPage`, false));
    } catch{
        yield put(setCommon(`loadingPage`, false));
        yield* errorHandler()
    }
}

const watchers = [
    takeLatest(GET_MEMBER, getMember),
    takeLatest(UPDATE_MEMBER, updateMember),
    takeLatest(DELETE_MEMBER, deleteMember),
]
export default watchers;


