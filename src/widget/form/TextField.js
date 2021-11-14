import React from "react";
import {Form} from "react-bootstrap";
import { Formik,Field,ErrorMessage } from 'formik';

export default function TextField(props){
    return (
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label></Form.Label>
            <label htmlFor={props.name} className="form-label">{props.label}:</label>
            <Field className="form-control" name={props.name} type={props.type} placeholder={props.placeholder} />
            {/* {formik.errors.version ? <div>{formik.errors.version}</div> : null} */}
            <ErrorMessage name={props.name} />
        </Form.Group>
    )
}