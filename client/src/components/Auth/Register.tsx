import { useMutation } from '@apollo/client';
import { FormEvent, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { REGISTER_USER } from '../../graphql/mutations';
import { RegisterData, RegisterVariables } from '../../types';

const Register = () => {
    const [RegisterUser, {data, loading, error}] = useMutation<RegisterData, RegisterVariables>(REGISTER_USER);

    const { errors, touched, handleSubmit, getFieldProps } = useFormik({
        initialValues:{
            email: '',
            password: '',
            name: '',
            surname: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Email address is not valid. Please check it out').max(50, 'Atmost 50 characters for email is accepted').required(),
            password: Yup.string().min(6, 'Atleast 6 characters for password is needed').required(),
            name: Yup.string().max(25, 'Name is limited to 25 characters').required('Name is required'),
            surname: Yup.string().max(25, 'Surname is limited to 25 characters').required('Surname is required'),
        }),
        onSubmit: values => {
            alert(JSON.stringify(values, undefined, 2));

            RegisterUser({
                variables: {
                    email: values.email,
                    password: values.password,
                    name: values.name,
                    surname: values.surname
                }
            });
        },
    });

    // const handleSubmit = (e: FormEvent) =>  e.preventDefault();

    useEffect(() => {
        console.log(data);

        return () => {
            
        };
    }, [data]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" {...getFieldProps('email')}/>
                    {errors.email && touched.email && <span>{errors.email}</span>}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" {...getFieldProps('password')}/>
                    {errors.password && touched.password && <span>{errors.password}</span>}
                </div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" {...getFieldProps('name')}/>
                    {errors.name && touched.name && <span>{errors.name}</span>}
                </div>
                <div>
                    <label htmlFor="surname">Surname:</label>
                    <input type="text" id="surname" {...getFieldProps('surname')}/>
                    {errors.surname && touched.surname && <span>{errors.surname}</span>}
                </div>
                <div>
                    <input type="submit" value="Register" />
                </div>
            </form>
            {data && JSON.stringify(data, undefined, 3)}
        </div>
    );
};

export default Register;
