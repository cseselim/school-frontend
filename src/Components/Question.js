import React,{useState,useEffect} from "react";
import {Button,Row,Col,Modal,Form} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { Formik,Field,FieldArray} from 'formik';
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
        title: '',
        type: '',
        question_level_id: '',
        mark: '',
        options:['Country A', 'Country B'],
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
        title : Yup.string().required('Title is required'),
        type : Yup.string().required('Question Type is required'),
        question_level_id : Yup.string().required('Question level Id is required'),
        mark : Yup.string().required('Mark is required'),
    })

    console.log(initialValues.options);
    const onSubmit = async (values,onSubmitProps) => {
        alert(values.options);
    }

    return(
        <>
          <div className="content_header mb-4">
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

                        <div className="row">
                            <div className="col">
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
                            </div>
                            <div className="col">
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
                            </div>
                        </div>
                        <Form.Group className="mb-3" controlId="formBasicVersion">
                            <label htmlFor="priority">Question Title:</label>
                            <textarea className="form-control" id="title" name="title" rows="5" cols="30"
                                placeholder="Question Title"
                                {...formik.getFieldProps('title')}
                            />
                            {formik.touched.title && formik.errors.title ? (
                            <div className="error" style={{color: "red"}}>{formik.errors.title}</div>
                        ) : null}
                        </Form.Group>

                        <div className="row">
                            <div className="col">
                                <Form.Group controlId="upload" className="mb-3">
                                    <label htmlFor="priority">Subject Thumbnail:</label><br></br>
                                    <input id="image_urls"type="file"
                                    // onChange={(event) => {
                                    //     const files = event.target.files[0];
                                    //     fileUpload(files);
                                    //   }}
                                    multiple />
                                    <input id="img_has"name="img_has" type="hidden"
                                        // value={formik.values.image_url = subjectImage}
                                    />
                                    {/* <img style={{width: "116px",display: "block",marginTop: "12px"}} src={subjectImage} /> */}
                                    {formik.errors.image_url ? (
                                    <div className="error" style={{color: "red"}}>{formik.errors.image_url}</div>
                                ) : null}
                                </Form.Group>
                            </div>
                            <div className="col">
                                <Form.Group className="mb-3" controlId="formBasicVersion">
                                    <label htmlFor="priority">Question Mark:</label>
                                    <input type="number" className="form-control" id="mark" name="mark"
                                        placeholder="Question Title"
                                        {...formik.getFieldProps('mark')}
                                    />
                                    {formik.touched.mark && formik.errors.mark ? (
                                    <div className="error" style={{color: "red"}}>{formik.errors.mark}</div>
                                    ) : null}
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Form.Group controlId="formBasicVersion">
                                <select
                                    className="form-control"
                                    name="type"
                                    {...formik.getFieldProps('type')}
                                >
                                    <option value="" label="Select Question Type" />
                                    <option value="1" label="MCQ" />
                                    <option value="2" label="True/False" />
                                </select>
                                {formik.touched.type && formik.errors.type ? (
                                <div className="error" style={{color: "red"}}>{formik.errors.type}</div>
                                ) : null}
                                </Form.Group>
                            </div>
                            <div className="col">
                                <Form.Group className="mb-3" controlId="formBasicVersion">
                                    <select
                                            className="form-control"
                                            name="question_level_id"
                                            {...formik.getFieldProps('question_level_id')}
                                        >
                                            <option value="" label="Select Question Level" />
                                            <option value="1" label="1" />
                                            <option value="2" label="2" />
                                        </select>
                                        {formik.touched.question_level_id && formik.errors.question_level_id ? (
                                        <div className="error" style={{color: "red"}}>{formik.errors.question_level_id}</div>
                                    ) : null}
                                </Form.Group>
                            </div>
                        </div>                        
                        <div className="row">
                            <div className="col-md-6">
                                <FieldArray name="options"
                                render={FieldArrayProps => (
                                    <div>
                                        {formik.values.options && formik.values.options.length > 0 ? (
                                        formik.values.options.map((option, index) => (
                                            <div key={index}>
                                            <Field name={`options.${index}`} />
                                            <button
                                                type="button"
                                                onClick={() => FieldArrayProps.remove(index)}
                                            >
                                                -
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => FieldArrayProps.insert(index, '')}
                                            >
                                                +
                                            </button>
                                            </div>
                                        ))
                                        ) : (
                                        <button type="button" onClick={() => FieldArrayProps.push('')}>
                                            Add a friend
                                        </button>
                                        )}
                                        <div>
                                        </div>
                                    </div>
                                )}
                                />
                            </div>
                        </div>

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