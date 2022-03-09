import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import moment, { Moment } from 'moment'
import { DateRangePicker, FocusedInputShape, isInclusivelyBeforeDay } from 'react-dates'
import { authVar } from '../../graphql/cache'
import { AddBookingVariables, Nest } from '../../types'
import { ADD_BOOKING } from '../../graphql/mutations'

interface NestBookingFormInterface {
    loading: boolean;
    nestData?: Nest
};

const NestBookingForm: React.FC<NestBookingFormInterface> = ({loading, nestData}) => {
    const [calendarFocused, setCalendarFocused] = useState<FocusedInputShape | null>(null);
    const [checkIn, setChechIn] = useState<Moment|null>(null);
    const [checkOut, setCheckOut] = useState<Moment|null>(null);

    const [bookNest, {data: nestBookingData, loading: nestBookinLoading, error: bookingError }] = useMutation<{},AddBookingVariables>(ADD_BOOKING);

    const handleRangePickerChange = (val: { startDate: Moment | null; endDate: Moment | null; }) => {
        // console.log(`Start: ${val.startDate}, End: ${val.endDate}`);
        setChechIn(val.startDate);
        setCheckOut(val.endDate);
    };

    const handleBooking = () => {
        const { token } = authVar();
        
        if(checkIn && nestData && token && typeof token === 'string'){
            bookNest({
                variables: {
                    token,
                    nest: nestData._id,
                    checkIn: (checkIn.unix()*1000).toString(),
                    checkOut: checkOut ? (checkOut.unix()*1000).toString(): undefined
                }
            });
        }
    };

    useEffect(() => {
        // console.log(nestBookingData);
    }, [nestBookingData]);

    const rangePickerOrientation = window.matchMedia("(max-width: 700px)").matches ? 'vertical' : 'horizontal'

    return <>
        {loading ? 
            (<div className="card rounded sticky-md-top border-primary mt-4" aria-hidden="true">
                <div className="card-body">
                    <h5 className="card-title placeholder-glow rounded"> 
                    <span className="placeholder rounded col-6"></span> 
                    </h5>
                    <p className="card-text placeholder-glow">
                    <span className="placeholder rounded col-8"></span> 
                    <span className="placeholder rounded col-10"></span> 
                    <span className="placeholder rounded col-7"></span> 
                    <span className="placeholder rounded col-6"></span> 
                    </p>
                    <a href="#" tabIndex={-1} className="btn btn-primary disabled placeholder col-6"></a>
                </div>
            </div>) : ( 
            <div className="card rounded sticky-md-top border-primary" style={{maxWidth: '100%', top: '1.25em', marginTop: '1.75em'}}>
                <div className="card-body">
                    <h4 className="dispaly-3 text-center">&euro; {nestData?.price} <span className="text-muted"> / monthly</span></h4>
                    <h3 className="text-center">Check Availablity</h3>

                    <h5 className="card-title">Card title</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>

                    
                    <DateRangePicker
                        startDateId="settlement_date_start"
                        endDateId="settlement_date_end"
                        startDate={checkIn}
                        endDate={checkOut}
                        onDatesChange={handleRangePickerChange}
                        focusedInput={calendarFocused}
                        onFocusChange={(focusInput) => setCalendarFocused(focusInput)}
                        numberOfMonths={2}
                        isOutsideRange={(day) => isInclusivelyBeforeDay(day, moment())}
                        showClearDates={true}
                        startDatePlaceholderText="Check in"
                        endDatePlaceholderText="Check out"
                        orientation={rangePickerOrientation}
                        hideKeyboardShortcutsPanel={true}
                    />
                    
                    <p>You can book for the time span you wish</p>
                    <button className="btn btn-primary d-block mx-auto w-100" onClick={handleBooking}>Book</button>
                    {/* <a href="#" className="card-link">Another link</a> */}
                </div>
            </div>)
        }
    </>;
};

export default NestBookingForm;