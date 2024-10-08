import React, { useContext } from 'react';
import { StyleModeContext } from '../../context/StyleModeProvider';
// import RSC from "react-scrollbars-custom";
import { useForm } from 'react-hook-form';

import PageTitle from '../../components/PageTitle';
import ContactItem from '../../components/ContactItem';
import UseEmail from '../../services/UseEmail';
import { useState } from 'react';

const Contact = ({ data }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [emailData, setEmailData] = useState({
        Name: "",
        Email: "",
        Subject: "",
        Message: "",
    });
    const {
        loading,
        submitted,
        error,
        sendEmail
    } = UseEmail("https://public.herotofu.com/v1/4aefb090-f71c-11ec-bc36-e1ea9ccadd33");

    const { response } = useContext(StyleModeContext);

    const sendExample = () => {
        sendEmail(emailData);
    };
    const changeValue = (e, prefix) => {
        setEmailData({ ...emailData, [prefix]: e.target.value });
    }
    return (
        <section className={`contact section${response ? ' open' : ""} active`}>
            {/* <RSC style={{ padding: 30 }}> */}
            <div className="container">
                <div className="row">
                    <PageTitle title={data.title} />
                </div>
                <div className="row">
                    {
                        data.info.map((val, idx) => <ContactItem data={val} key={`info-${idx}`} />)
                    }
                </div>
                <div className='row'>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d160.75007242326578!2d-97.32043317697078!3d49.86122287840999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52ea0bf2c15435a1%3A0x85c24914eebf154a!2s110%20Westgrove%20Way%2C%20Winnipeg%2C%20MB%20R3R%201R7%2C%20Canada!5e0!3m2!1sen!2s!4v1720110464788!5m2!1sen!2s"

                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title='Google Map'>
                    </iframe>
                </div>
                <div className="row" style={{ marginTop: "30px" }}>
                    <div className="contact-form padd-15">
                        <div className="row">
                            <div className={`form-item col-6 padd-15`}>
                                <div className="form-group">
                                    <input {...register('Name', { required: true })} type="text" name="Name" className={`form-control ${errors.Name && "error"}`} placeholder="Name*" onChange={(e) => changeValue(e, "Name")} />
                                    {errors.Name && <p>Name is required.</p>}
                                </div>
                            </div>

                            <div className={`form-item col-6 padd-15`}>
                                <div className="form-group">
                                    <input {...register('Email', { required: true })} type="text" name="Email" className={`form-control ${errors.Email && "error"}`} placeholder="Email*" onChange={(e) => changeValue(e, "Email")} />
                                    {errors.Email && <p>Email is required.</p>}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className={`form-item col-12 padd-15`}>
                                <div className="form-group">
                                    <input {...register('Subject', { required: true })} type="text" name="Subject" className={`form-control ${errors.Subject && "error"}`} placeholder="Subject*" onChange={(e) => changeValue(e, "Subject")} />
                                    {errors.Subject && <p>Subject is required.</p>}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className={`form-item col-12 padd-15`}>
                                <div className="form-group">
                                    <textarea {...register('Message', { required: true })} className={`form-control ${errors.Message && "error"}`} name="Message" placeholder="Message*" onChange={(e) => changeValue(e, "Message")}></textarea>
                                    {errors.Message && <p>Message is required.</p>}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 padd-15">
                                <button className="btn" onClick={handleSubmit(sendExample)}>Send Message</button>
                                <span>
                                    {submitted && 'Done, email was sent!'}
                                    {error ? `Unexpected error: ${error}` : null}
                                    {loading && 'Email is being sent now...'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </RSC> */}
        </section>
    );
}

export default Contact;