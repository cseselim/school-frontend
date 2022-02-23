import React,{useState,useEffect} from "react";
import {Button,Row,Col,Modal,Form} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { Formik} from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { getAllVersion } from '../state/version/versionSlice';
import { getAllClasses } from '../state/classes/classesSlice';


function Question(){

    const dispatch = useDispatch();

    /* Conditionally rendering initial values based on CREATE or EDIT */
    let initialValues = {
        id : '',
        version_id: '',
        class_id:'',
    };
    
    /*============version list for dropdown option=============*/
    const versionList = useSelector((state) => state.version.value);
    const versions = versionList[0];

    const classesList = useSelector((state) => state.classes.value);
    const classes = classesList[0];

    useEffect(() => {
        dispatch(getAllVersion());
        dispatch(getAllClasses());
    },[dispatch])

    const validationSchema = Yup.object({
        version_id : Yup.string().required('version is required'),
        class_id : Yup.string().required('class is required'),
    })

    const onSubmit = async (values,onSubmitProps) => {
        
    }


    return(
        <>
          <div className="content_header">
                <Row className="Row">
                    <Col xs={6} md={6} className="my-auto">
                        <div className="page_title">
                            <h1><FontAwesomeIcon icon={faList}/>Subject List</h1>
                        </div>
                    </Col>
                </Row>
            </div>

            <div className="question_create">

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
                    {formik => (
                        <Form onSubmit={formik.handleSubmit}>

                        <Form.Group className="mb-3" controlId="formBasicVersion">
                            <select
                                className="form-control"
                                name="version_id"
                                {...formik.getFieldProps('version_id')}
                            >
                                <option value="" label="Select Version" />
                                {
                                    versions
                                    ?
                                    versions.map((version, i) =>
                                    <option value={version.id} key={i}>{version.name}</option>
                                    )
                                    :null
                                }
                            </select>
                            {formik.touched.version_id && formik.errors.version_id ? (
                            <div className="error" style={{color: "red"}}>{formik.errors.version_id}</div>
                        ) : null}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicVersion">
                            <select
                                className="form-control"
                                name="class_id"
                                {...formik.getFieldProps('class_id')}
                            >
                                <option value="" label="Select Class" />
                                {
                                    classes
                                    ?
                                    classes.map((classItem,i) =>
                                    <option value={classItem.id} key={i}>{classItem.name}</option>
                                    ):null
                                }
                            </select>
                            {formik.touched.class_id && formik.errors.class_id ? (
                            <div className="error" style={{color: "red"}}>{formik.errors.class_id}</div>
                        ) : null}
                        </Form.Group>

                        <Modal.Footer>
                            <Button type="submit" variant="primary">Save</Button>
                        </Modal.Footer>
                        </Form>
                    )}
                    </Formik>
            </div>
        </>
    );
}

export default Question;