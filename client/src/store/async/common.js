
import { takeLatest, put, call } from 'redux-saga/effects';
import { setBooking } from '../actions/booking';
import { GET_META_DATA, setCommon } from '../actions/common';
import { axiosInstance } from '../../fetch';
import { dayMonthFormat, bookingCheckout } from '../../utilies/constants';
import { errorHandler } from './errorHandler';

const getMetaData = function* () {
    try {
        // yield delay(3000)
        //const currentPhase = { start: new Date('2020-07-01T00:00:00.000'), end: new Date('2020-07-01T24:00:00.000') };
        const phase = yield call(() =>
            axiosInstance.get('/phase'));
        const currentPhase = {};
        currentPhase.start = phase.data[0].startDate.slice(0, -1);
        currentPhase.end = phase.data[0].endDate.slice(0, -1);
       
        const info = {
            title: 'معلومات مهمه',
            home: [
                'هذا الموقع مخصص لحجز الصلوات للشعب فقط, الشمامسة لهم نظام حجز مختلف',
                'يمكن حضور القداسات أيام السبت و الاُثنين و الثلاثاء و الاربعاء و الخميس بدون حجز',
                'يمكنك حجز موعد (مناسبه/قداس) لاكثر من شخص عن طريق ادخال الرقم القومي لكل منهم',
                'كل (مناسبه/قداس) له عدد محدد من الحضور حتي نضمن سلامه الشعب في ظل الظروف الحاليه',
                `كل شخص له الحق في (مناسبه/قداس) واحد فقط في فتره من ${dayMonthFormat(currentPhase.start)} وحتي ${dayMonthFormat(currentPhase.end)}`,
                'يمكنك تغيير الحجز أو الغاءه في حاله عدم امكانيه الذهاب في الموعد الذي تم حجزه',
                'من فضلك الغي الحجز في حاله عدم امكانيه الذهاب حتي تتيح الفرصه لشخص اخر',
                'عند دخول الكنيسه من فضلك اظهر رقم الحجز مع ما يثبت رقمك القومي (بطاقه أو شهاده ميلاد) حتي يسهل عمليه الدخول'
            ],
            members: [
                'يمكن حضور القداسات أيام السبت و الاُثنين و الثلاثاء و الاربعاء و الخميس بدون حجز',
                'هذا الموقع مخصص لحجز الصلوات للشعب فقط, الشمامسة لهم نظام حجز مختلف',
                'يمكنك حجز موعد (مناسبه/قداس) لاكثر من شخص عن طريق ادخال الرقم القومي لكل منهم'],
            events: [
                'يمكن حضور القداسات أيام السبت و الاُثنين و الثلاثاء و الاربعاء و الخميس بدون حجز',
                `كل شخص له الحق في (مناسبه/قداس) واحد فقط في فتره من ${dayMonthFormat(currentPhase.start)} وحتي ${dayMonthFormat(currentPhase.end)}`,
                'يمكنك تغيير الحجز أو الغاءه في حاله عدم امكانيه الذهاب في الموعد الذي تم حجزه',
            ],
            checkout: [bookingCheckout,
                '  سيتم اغلاق الكنيسة الكبرى بمجرد اكتمال العدد المسموح و من بعد ذلك سيتم استخدام الاماكن الاخرى : الكنيسة الصغرى و قاعة الكنيسة و قاعة أغابي  و جميع الاماكن ستكون مجهزة بشاشات عرض',
                'عند دخول الكنيسه من فضلك اظهر رقم الحجز مع ما يثبت رقمك القومي (بطاقه أو شهاده ميلاد) حتي يسهل عمليه الدخول'
            ]
        };
        yield put(setCommon('currentPhase', currentPhase));
        yield put(setCommon('info', { title: info.title, home: info.home }));
        yield put(setBooking('info', {
            members: info.members, events: info.events,
            checkout: info.checkout
        }));
    } catch (error) {
        yield* errorHandler()
    }

}


const watchers = [
    takeLatest(GET_META_DATA, getMetaData),
]
export default watchers;


