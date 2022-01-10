import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useLocation, useParams } from 'react-router-dom';
import { GetNestData, NestQueryTVariables } from '../../types';
import { GET_NEST } from '../../graphql/queries';
import moment, { Moment } from 'moment';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController, FocusedInputShape, isInclusivelyAfterDay, isInclusivelyBeforeDay } from 'react-dates';
import img from '../../assets/nest.jpg';
import washing from '../../assets/washing-80.png';
import airConditioner from '../../assets/air-conditioner-50.png';
import couch from '../../assets/couch-64.png';
import dryer from '../../assets/dryer-100.png';
import dishwasher from '../../assets/dishwasher-60.png';
import heating from '../../assets/heating-50.png';
import './styles/react-dates.custom.scss';

const Nest: React.FC = () => {
    const location = useLocation();
    const params: {id: string} = useParams();
    const [calendarFocused, setCalendarFocused] = useState<FocusedInputShape | null>(null);
    const [checkIn, setChechIn] = useState<Moment|null>(null);
    const [checkOut, setCheckOut] = useState<Moment|null>(null);

    const { data, error, loading } = useQuery<GetNestData, NestQueryTVariables>(GET_NEST, {
        variables: {
            id: params.id
        }
    });

    console.log(location);
    console.log(params);

    useEffect(() => {
        console.log(data, error, loading);

        if(data?.nest){
            document.title = `${data.nest.title} | Nestify, Find your dream nest!`;
        }

        return () => {
            
        }
    }, [data, error, loading]);

    const handleRangePickerChange = (val: { startDate: Moment | null; endDate: Moment | null; }) => {
        console.log(`Start: ${val.startDate}, End: ${val.endDate}`);
        setChechIn(val.startDate);
        setCheckOut(val.endDate);
    };

    const rangePickerOrientation = window.matchMedia("(max-width: 700px)").matches ? 'vertical' : 'horizontal'

    return (
        <div className="container">
            <div className="row">
                <div className="col col-md-8">
                    {/* {loading && <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>} */}
                    
                    {loading ? <p className="placeholder-glow">
                            <span className="placeholder rounded col-12 mt-3 mb-3" style={{height: '30px'}}></span>
                        </p> : 
                        <h2 className="mt-3 mb-4 d-block">{data?.nest.title}</h2>
                    }

                    {loading ? 
                        <p className="placeholder-glow">
                            <span className="placeholder col-12 rounded" style={{height: '400px'}}></span>
                        </p> :
                        <img src={img} alt="" className="img-fluid rounded" />
                    }

                    <div className="row mt-5 mb-3">
                        <h3>Facilities</h3>
                        <div className="col-xs-6 col-sm-4">{data?.nest.rooms} Rooms</div>
                        <div className="col-xs-6 col-sm-4">{data?.nest.parking} Parkings</div>
                    </div>

                    <div className="row mt-5 mb-3">
                        <h3>Amenities</h3>
                        <div className="col-xs-6 col-sm-4"><img src={couch} alt="" /></div>
                        <div className="col-xs-6 col-sm-4"><img src={dishwasher} alt="" /></div>
                        <div className="col-xs-6 col-sm-4"><img src={heating} alt="" /></div>
                        <div className="col-xs-6 col-sm-4"><img src={airConditioner} alt="" /></div>
                        <div className="col-xs-6 col-sm-4"><img src={dryer} alt="" /></div>
                        <div className="col-xs-6 col-sm-4"><img src={washing} alt="" /></div>
                    </div>

                    <div className="row">
                        <h3>Map</h3>
                        <div className="col"></div>
                    </div>

                    <pre>
                        {data && JSON.stringify(data, undefined, 3)}
                    </pre>

                </div>
                <div className="col col-md-4 mt-5">
                    {loading ? 
                        <div className="card rounded sticky-md-top border-primary mt-4" aria-hidden="true">
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
                        </div> : 
                    <div className="card rounded sticky-md-top border-primary" style={{maxWidth: '100%', top: '1.25em', marginTop: '1.75em'}}>
                        <div className="card-body">
                            <h4 className="dispaly-3 text-center">&euro; {data?.nest.price} <span className="text-muted"> / monthly</span></h4>
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
                            
                            <hr />
                            <a href="#" className="card-link">Card link</a>
                            <a href="#" className="card-link">Another link</a>
                        </div>
                    </div>
}
                </div>
            </div>
        </div>
    );
};

export default Nest;