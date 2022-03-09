import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useLocation, useParams } from 'react-router-dom';
import NestBookingForm from './NestBookingForm';
import { GetNestData, NestQueryTVariables } from '../../types';
import { GET_NEST } from '../../graphql/queries';
import img from '../../assets/nest.jpg';
import washing from '../../assets/washing-80.png';
import airConditioner from '../../assets/air-conditioner-50.png';
import couch from '../../assets/couch-64.png';
import dryer from '../../assets/dryer-60.png';
import dishwasher from '../../assets/dishwasher-60.png';
import heating from '../../assets/heating-50.png';
import garage from '../../assets/garage-80.png';
import rooms from '../../assets/floor-plan-80.png';
import './styles/react-dates.custom.scss';

const Nest: React.FC = () => {
    const location = useLocation();
    const params: {id: string} = useParams();

    const { data, error, loading } = useQuery<GetNestData, NestQueryTVariables>(GET_NEST, {
        variables: {
            id: params.id
        }
    });

    useEffect(() => {
        if(data?.nest){
            document.title = `${data.nest.title} | Nestify, Find your dream nest!`;
        }

        return () => {
            
        }
    }, [data, error, loading]);

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

                    <div className="row mt-5">
                        <h3 className="mt-4">Facilities</h3>
                        <div className="col-xs-6 col-sm-4">
                            <img src={rooms} alt="" />
                            {data?.nest.rooms} Rooms
                        </div>
                        <div className="col-xs-6 col-sm-4">
                            <img src={garage} alt="" className="text-muted"/>
                            {data?.nest.parking} Parkings
                        </div>
                    </div>

                    <div className="row mt-5">
                        <h3 className="mt-4">Amenities</h3>
                        {data?.nest.furnished && <div className="col-xs-6 col-sm-4 mt-3"><img src={couch} alt="" />Furnished</div>}
                        {data?.nest.dishwasher && <div className="col-xs-6 col-sm-4 mt-3"><img src={dishwasher} alt="" />Dishwasher</div>}
                        {data?.nest.heating && <div className="col-xs-6 col-sm-4 mt-3"><img src={heating} alt="" />Heating</div>}
                        {data?.nest.airConditioning && <div className="col-xs-6 col-sm-4 mt-3"><img src={airConditioner} alt="" />Air Conditioner</div>}
                        {data?.nest.dryer && <div className="col-xs-6 col-sm-4 mt-3"><img src={dryer} alt="" />Dryer</div>}
                        {data?.nest.washingMachine && <div className="col-xs-6 col-sm-4 mt-3"><img src={washing} alt="" />Washing Machine</div>}
                    </div>

                    <div className="row mt-5">
                        <h3>Map</h3>
                        <div className="col"></div>
                    </div>

                    <pre>
                        {data && JSON.stringify(data, undefined, 3)}
                    </pre>

                </div>
                <div className="col col-md-4 mt-5">
                    <NestBookingForm loading={loading} nestData={data?.nest}/>
                </div>
            </div>
        </div>
    );
};

export default Nest;