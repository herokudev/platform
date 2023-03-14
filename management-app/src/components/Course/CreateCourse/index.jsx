import React, { useState, useEffect } from 'react';
import Styles from './CreateCourse.module.css';
import axios from 'axios';

const CreateCourse = () => {
    const [options, setOptions] = useState([]);
    const [error, setError] = useState('');
    const [send, setSend] = useState(false);
    const [data, setData] = useState({
        name: '',
        type: '',
        slack_name: '',
        google_calendar_name: '',
        zoom_url: '',
        zoom_code: ''
    });
    const handlechange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setError('');
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setSend(true);
        console.log(data);
    };
    const getCourseType = async () => {
        try {
            const token = window.localStorage.getItem('mgmt_tk');
            if (token) {
                const response = await axios.get('/api/management/course-type/', {
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: token
                    }
                });
                if (response.data.successful) {
                    setOptions(response.data.list);
                }
            }
        } catch (error) {}
    };
    useEffect(() => {
        getCourseType();
        // eslint-disable-next-line
    }, []);
    return (
        <form onSubmit={handleSubmit} className={Styles[`form`]}>
            <div className={Styles[`form-input`]}>
                <label htmlFor="course_name">Name*</label>
                <input
                    onChange={handlechange}
                    id="course_name"
                    name="name"
                    type="text"
                    value={data.name}
                    placeholder="Name bootcamp..."
                />
            </div>
            <div className={Styles[`form-input`]}>
                <label htmlFor="course_type">Course template*</label>
                <select onChange={handlechange} id="course_type" name="type" value={data.type}>
                    <option value="" disabled hidden>
                        course template...
                    </option>
                    {options.map((item) => {
                        return (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className={Styles[`form-input`]}>
                <label htmlFor="course_slack_name">Slack Name*</label>
                <input
                    onChange={handlechange}
                    id="course_slack_name"
                    name="slack_name"
                    type="text"
                    value={data.slack_name}
                    placeholder="channel slack..."
                />
            </div>
            <div className={Styles[`form-input`]}>
                <label htmlFor="course_google_calendar_name">Name google calendar*</label>
                <input
                    onChange={handlechange}
                    id="course_google_calendar_name"
                    name="google_calendar_name"
                    type="text"
                    value={data.google_calendar_name}
                    placeholder="name google calendar..."
                />
            </div>
            <div className={Styles[`form-input`]}>
                <label htmlFor="course_zoom_url">Zoom Link</label>
                <input
                    onChange={handlechange}
                    id="course_zoom_url"
                    name="zoom_url"
                    type="text"
                    value={data.zoom_url}
                    placeholder="zoom link..."
                />
            </div>
            <div className={Styles[`form-input`]}>
                <label htmlFor="course_zoom_code">Zoom Code</label>
                <input
                    onChange={handlechange}
                    id="course_zoom_code"
                    name="zoom_code"
                    type="text"
                    value={data.zoom_code}
                    placeholder="zoom code..."
                />
            </div>
            {error && <p className={Styles[`form-error`]}>{error}</p>}
            <button
                disabled={
                    !data.name ||
                    !data.type ||
                    !data.slack_name ||
                    !data.google_calendar_name ||
                    send
                }
                type="submit"
            >
                {!send ? 'CREATE COURSE' : 'processing...'}
            </button>
        </form>
    );
};

export default CreateCourse;
