import React, { useState } from 'react'
import OtpInput from "otp-input-react";
import "react-phone-input-2/lib/style.css";
import { CgSpinner } from "react-icons/cg";
import PhoneInput from "react-phone-input-2";
import { toast, Toaster } from "react-hot-toast";
import { auth } from "../../Friebase/firebase.config";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, otpLogin } from '../../Redux/Features/User/userSlice';
import { MDBBtn, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import axios from 'axios';

function OTP() {
    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [err, setErr] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                "recaptcha-container",
                {
                    size: "invisible",
                    callback: (response) => {
                        onSignup();
                    },
                    "expired-callback": () => { },
                },
                auth
            );
        }
    }

    const onSignup = async () => {
        setLoading(true);
        onCaptchVerify();

        const appVerifier = window.recaptchaVerifier;

        const formatPh = "+" + ph;
        try {
            await axios.get("http://localhost:5000/user/isPh", { params: { mobile: formatPh } })
            signInWithPhoneNumber(auth, formatPh, appVerifier)
                .then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;
                    console.log(confirmationResult);
                    setLoading(false);
                    setShowOTP(true);
                    toast.success("OTP sended successfully!");
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        } catch (error) {
            toast.error("Check your mobile number..!")
            setLoading(false)
        }
    }

    function onOTPVerify() {
        setLoading(true);
        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                const data = res.user.phoneNumber
                dispatch(otpLogin({ data, navigate }))
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Invalid OTP");
                setLoading(false);
            });
    }
    return (
        <div className='d-flex align-items-center justify-content-center vh-100 bg-secondary p-4'>
            <MDBCard className='p-3'>
                <MDBCardBody className='d-flex flex-column align-items-center'>
                    <Toaster toastOptions={{ duration: 4000 }} />
                    <div id="recaptcha-container"></div>
                    <div className=" p-5">
                        <h1 className="text-center mb-3">
                            Welcome to <br /> RED WINGS
                        </h1>
                        {showOTP ? (
                            <>
                                <div className="d-flex mb-3">
                                    <BsFillShieldLockFill size={20} className='ms-auto my-auto' /> <label htmlFor="otp" className="font-bold bg-white me-auto p-1 rounded-full text-center" >  Enter your OTP   </label>
                                </div>
                                <OtpInput value={otp} onChange={setOtp} OTPLength={6} otpType="number" disabled={false} autoFocus className="opt-container"></OtpInput>
                                <div className="d-flex justify-content-center mt-3">
                                    <MDBBtn style={{ backgroundColor: "#054d60" }} onClick={onOTPVerify} className="mx-auto">
                                        {loading && (
                                            <CgSpinner size={20} className="animate-spin" />
                                        )}
                                        <span>Verify OTP</span>
                                    </MDBBtn>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="d-flex mb-3">
                                    <BsTelephoneFill size={20} className='ms-auto my-auto' /><label htmlFor="" className="font-bold bg-white me-auto p-1 rounded-full text-center">Verify your phone number</label>
                                </div>
                                <PhoneInput country={"in"} value={ph} onChange={setPh} />
                                <div className="d-flex justify-content-center mt-3">
                                    <MDBBtn style={{ backgroundColor: "#054d60" }} onClick={onSignup} className="mx-auto">
                                        {loading && (
                                            <CgSpinner size={20} className="animate-spin" />
                                        )}
                                        <span>Send code via SMS</span>
                                    </MDBBtn >
                                </div>
                            </>
                        )}
                    </div>
                </MDBCardBody>
            </MDBCard>
        </div>
    )
}

export default OTP
