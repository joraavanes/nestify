import React, { FormEvent, useState } from 'react';
import { Form, Formik, FormikProps, useField, useFormik } from 'formik';
import * as Yup from 'yup';
import { Nest } from '../../types';

interface NestFormProps {
    handleNestMutation: (a: Nest) => void;
    nest?: Nest;
};

interface HtmlInputProps{
    label?: string;
    type?: string;
    name: string;
    id: string;
};

const TextInput = (props: HtmlInputProps) => {
    const [field, meta] = useField({...props});

    return (
        <>
            {props.label && <label htmlFor={props.name}>{props.label}</label>}
            <input {...field} {...props}/>
            {meta.error && meta.touched && <span>{meta.error}</span>}
        </>
    );
};

const Checkbox = ({ label, ...props }: HtmlInputProps) => {
    const [field, meta, helpers] = useField({...props, type: 'checkbox'});
    
    return (
        <>
            <label>
                {label}
                <input type="checkbox" {...field} {...props} />
            </label>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};
  
const NestForm: React.FC<NestFormProps> = ({handleNestMutation, nest}) => {

    return(
        <Formik
            initialValues={{
                id: nest ? nest._id : '',
                title: nest ? nest.title : '',
                type: nest ? nest.type : '',
                size: nest ? nest.size : 0,
                furnished: nest ? nest.furnished : false,
                dishwasher: nest ? nest.dishwasher : false,
                washingMachine: nest ? nest.washingMachine : false,
                dryer: nest ? nest.dryer : false,
                airConditioning: nest ? nest.airConditioning : false,
                heating: nest ? nest.heating : false,
                parking: nest ? nest.parking : 0,
                rooms: nest ? nest.rooms : 0,
                longitude: nest ? nest.longitude : 0,
                latitude: nest ? nest.latitude : 0,
                price: nest ? nest.price : 0,
                userId: nest ? nest.userId : '',
            }}
            validationSchema= {Yup.object({
                id: Yup.string(),
                title: Yup.string().required('Please enter the title'),
                type: Yup.string().required('Please enter the property type'),
                size: Yup.number().required('Please enter the property type'),
                furnished: Yup.boolean(),
                dishwasher: Yup.boolean(),
                washingMachine: Yup.boolean(),
                dryer: Yup.boolean(),
                airConditioning: Yup.boolean(),
                heating: Yup.boolean(),
                parking: Yup.number(),
                rooms: Yup.number().required('Please enter the number of rooms'),
                price: Yup.number().required('Please enter the monthly rent'),
                userId: Yup.string(),
            })}
            onSubmit={(values) => {
                handleNestMutation({
                    _id: values.id,
                    ...values
                });
            }}
        >
            <Form>
                <TextInput type="hidden" name="id" id="id"/>

                <div>
                    <TextInput type="text" name="title" id="title" label="Title"/>
                </div>
                <div>
                    <TextInput type="text" name="type" id="type" label="Type"/>
                </div>
                <div>
                    <TextInput type="number" name="size" id="size" label="Size"/>
                </div>
                <div>
                    <Checkbox name="furnished" id="furnished" label="Furnished"/>
                </div>
                <div>
                    <Checkbox name="dishwasher" id="dishwasher" label="Dishwasher"/>
                </div>
                <div>
                    <Checkbox name="washingMachine" id="washingMachine" label="WashingMachine"/>
                </div>
                <div>
                    <Checkbox name="dryer" id="dryer" label="Dryer"/>
                </div>
                <div>
                    <Checkbox name="airConditioning" id="airConditioning" label="AirConditioning"/>
                </div>
                <div>
                    <Checkbox name="heating" id="heating" label="Heating"/>
                </div>
                <div>
                    <TextInput type="number" name="parking" id="parking" label="Parking"/>
                </div>
                <div>
                    <TextInput type="number" name="rooms" id="rooms" label="Rooms"/>
                </div>
                <div>
                    <TextInput type="number" name="longitude" id="longitude" label="Longitude"/>
                </div>
                <div>
                    <TextInput type="number" name="latitude" id="latitude" label="Latitude"/>
                </div>
                <div>
                    <TextInput type="number" name="price" id="price" label="Price"/>
                </div>
                <div>
                    <TextInput type="string" name="userId" id="userId" label="User Id"/>
                </div>
                <div>
                    <input type="submit" value="Add the nest"/>
                </div>
            </Form>
        </Formik>
    );
};

export default NestForm;
