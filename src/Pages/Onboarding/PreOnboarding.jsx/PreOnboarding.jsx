import React, { useState } from "react";
import Layout from "../Layout";
import InputBox from "../../../components/InputBox";
import { useNavigate, useNavigation } from "react-router-dom";

const PreOnboarding = () => {
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);

  const nav = useNavigate();

  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return; // only allow numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <Layout>
      <div className="w-full h-full flex flex-col gap-8 justify-center items-center">
        <p className="mt-16 poppins-semibold-italic text-2xl text-center w-full">
          Mobile <span className="text-orange-400">Number</span>,
          <br />
        </p>
        <div className="p-4 w-full bg-gray-100 rounded-xl">
          <InputBox placeholder={"+91 XXXXX XXXXX"} name={"fullname"} />
        </div>
        <button
          className="px-4 w-full bg-black rounded-xl text-white py-3"
          onClick={() => setShowOtpModal(true)}
        >
          Verify
        </button>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-11/12 max-w-md">
            <h2 className="text-xl font-semibold text-center mb-4">
              Enter OTP
            </h2>
            <div className="flex justify-between gap-3 mb-6">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, idx)}
                  className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg"
                />
              ))}
            </div>
            <button
              className="w-full bg-black text-white py-2 rounded-xl"
              onClick={() => {
                const enteredOtp = otp.join("");
                if (enteredOtp.length === 4) {
                  console.log("Entered OTP:", enteredOtp);
                  setShowOtpModal(false);
                  nav("/onboarding");
                } else {
                  alert("Please enter 4 digit OTP");
                }
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default PreOnboarding;
