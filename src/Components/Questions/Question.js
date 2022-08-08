import React,{useState,useEffect} from "react";
import {Button,Row,Col,Modal,Form} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import '../../assets/css/Questions/questions.css';
import { Formik,Field,FieldArray} from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { getAllVersion } from '../../state/version/versionSlice';
import { getAllClasses } from '../../state/classes/classesSlice';
import { createQuestion } from "../../state/question/questionSlice";


function Question(){

    const dispatch = useDispatch();

    /* Conditionally rendering initial values based on CREATE or EDIT */
    let initialValues = {
        id : '',
        user_id: '1',
        subject_id: '1',
        version_id: '',
        class_id:'',
        title: '',
        type: '',
        question_level_id: '',
        mark: '',
        options:['', '', '', ''],
        checked:[],
        question_explanation: '',
        is_temp: '0',
        is_img: '0',
        img_has:'1'
    };
    
    /*============version list for dropdown option=============*/
    const versionList = useSelector((state) => state.version.value);
    const versions = versionList[0];

    const classesList = useSelector((state) => state.classes.value);
    const classes = classesList[0];

    useEffect(() => {
        dispatch(getAllVersion());
        dispatch(getAllClasses());
    },[])

    const validationSchema = Yup.object({
        // version_id : Yup.string().required('version is required'),
        // class_id : Yup.string().required('class is required'),
        // title : Yup.string().required('Title is required'),
        // type : Yup.string().required('Question Type is required'),
        // question_level_id : Yup.string().required('Question level Id is required'),
        // mark : Yup.string().required('Mark is required'),
        // question_explanation: Yup.string().required('Question explanation is required'),
        // // checked: Yup.number().required('Required').nullable(),
        // options: Yup.array(
        //     Yup.object({
        //         options: Yup.string().required('Option is required'),
        //     })
        // )
    })

    const onSubmit = async (values,onSubmitProps) => {
        let checked = [];

        if(!values.id){
            for(let x in values.options) {
                if(x == values.checked){
                    checked.push('1');
                    values['correct_answer'] = (parseInt(x) + 1);
                }else{
                    checked.push('0');
                }
            }
            values['checked'] = checked;
            dispatch(createQuestion(values));
            onSubmitProps.resetForm();
            toast.success("Question create successfully");
        }else{
            for(let x in values.options) {
                if(x == values.checked){
                    checked.push('1');
                    values['correct_answer'] = (parseInt(x) + 1);
                }else{
                    checked.push('0');
                }
            }
            values['checked'] = checked;
            dispatch(createQuestion(values));
            toast.success("Question update successfully");
        }
    }

    return(
        <>
          <div className="content_header mb-4">
          <ToastContainer/>
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
                                            <div key={index} className="row mb-2">
                                                <div className="col-1 my-auto text-center">
                                                    <input className="rightAnswerRadio" name="checked" {...formik.getFieldProps('checked')} value={index}  id={`checked.${index}`} type="radio" />
                                                </div>
                                                <div className="col-8">
                                                    <Field className="form-control" name={`options.${index}`}  placeholder="Option"/>
                                                    {formik.touched.options && formik.errors.options ? (
                                                        <div className="error" style={{color: "red"}}>{formik.errors.options[index].options}</div>
                                                    ) : null}
                                                </div>
                                                {formik.values.options.length > 4 ?(
                                                <div className="col-3 my-auto">
                                                    <button className="optionRemoveButton" type="button"
                                                        onClick={() => FieldArrayProps.remove(index)}>
                                                        -
                                                    </button>
                                                </div>
                                                ):null
                                                }
                                            </div>
                                        ))
                                        ) : null
                                        }
                                        <button className="btn btn-primary mt-3" type="button" onClick={() => FieldArrayProps.push('')}>
                                            Add Option
                                        </button>
                                    </div>
                                )}
                                />
                            </div>
                        </div>

                        <Form.Group className="mb-3 mt-4" controlId="formBasicVersion">
                            <label htmlFor="priority">Question Title:</label>
                            <textarea className="form-control" id="question_explanation" name="question_explanation" rows="5" cols="30"
                                placeholder="Question explanation"
                                {...formik.getFieldProps('question_explanation')}
                            />
                            {formik.touched.question_explanation && formik.errors.question_explanation ? (
                            <div className="error" style={{color: "red"}}>{formik.errors.question_explanation}</div>
                        ) : null}
                        </Form.Group>

                        <Modal.Footer>
                            <Button type="submit" className="btn btn-success">Save</Button>
                        </Modal.Footer>
                        </Form>
                    )}
                    </Formik>
            </div>
        </>
    );
}

export default Question;