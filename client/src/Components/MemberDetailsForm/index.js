import React from 'react';
import Input from '../Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobile, faUser, faBuilding, faRoad, faLayerGroup, faHouseUser, faIndent, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { inputText, bookingNum, eventDateFormat, address, chooseRegion } from '../../utilies/constants';
import sty from './index.module.scss';
import Dropdown from '../Dropdown';

const MemberDetailsForm = ({ id, values, validationMsgs, regions, edit,
    activeItems, isDeaconItems, isAdminEdit, changeHandle,ceremony }) => {
    return (
        <>
            <ul className="list-group list-group-flush">

                <li className={`${sty.listGroupItem} list-group-item pr-0 pl-0`}>
                    {
                        isAdminEdit &&
                        <>
                            <Input validationMsg={validationMsgs?.id} rtl
                                value={values?.id || ''} placeholder={inputText.id}
                                onChange={(e) => changeHandle(id, 'id', e.target.value)}
                                classes='mb-2'>
                                <FontAwesomeIcon icon={faIdCard} />
                            </Input>
                            <Dropdown classes='mb-2'
                                value={values.active}
                                onChange={(e) => changeHandle(id, 'active', e.target.value)}
                                items={activeItems} rtl />
                        </>

                    }
                    {edit || isAdminEdit ? <>
                        <Input validationMsg={validationMsgs?.name} rtl
                            value={values?.name || ''} placeholder={inputText.name}
                            onChange={(e) => changeHandle(id, 'name', e.target.value)}
                            classes='mb-2'>
                            <FontAwesomeIcon icon={faUser} />
                        </Input>

                        <Input validationMsg={validationMsgs?.mobile}
                            value={values.mobile || ''} placeholder={inputText.mobilePlaceholder}
                            onChange={(e) => changeHandle(id, 'mobile', e.target.value)}
                            classes='mb-2'>
                            <FontAwesomeIcon icon={faMobile} />
                        </Input>
                        {/*<Dropdown classes='mb-2' validationMsg={validationMsgs?.isDeacon}
                            value={values.isDeacon} defaultValue={isDeaconItems[0].value}
                            onChange={(e) => changeHandle(id, 'isDeacon', e.target.value)}
                            items={isDeaconItems} rtl />
                        <h5>
                            {address}
                        </h5>*/}

                    </> : <>
                            <p className="card-text ">
                                {values.name} < FontAwesomeIcon icon={faUser} /></p>
                            <p className="card-text ">
                                {values.mobile} <FontAwesomeIcon icon={faMobile} />
                            </p>
                        </>
                    }
                </li>
                {!edit && values.booking?.id &&
                    <li className={`${sty.listGroupItem} list-group-item pr-0 pl-0`}>
                        <p className="card-text">{ceremony} {eventDateFormat(values.booking.date)} </p>
                        <p className="card-text"> {values.booking.description} </p>

                        <p className="card-text">{values.booking.id} : {bookingNum} </p>

                    </li>}

            </ul>
        </>
    )
}

export default MemberDetailsForm;