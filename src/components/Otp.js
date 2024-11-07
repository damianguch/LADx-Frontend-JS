import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OtpInput = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to handle OTP input change
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input after current
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  // Send OTP to backend for confirmation
  const verifyOtp = async () => {
    const enteredOtp = otp.join('');
    try {
      const res = await axios.post(
        'https://ladx-backend-ts.onrender.com/api/v1/verify-otp',
        { otp: enteredOtp }
      );

      if (res.data.success) {
        navigate('/'); // Redirects to the dashboard on successful OTP
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setError('Error verifying OTP. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h2 className="text-2xl font-semibold mb-6">Enter OTP</h2>
      <p className="mb-4 text-gray-600">
        Enter the 6-digit code sent to your email.
      </p>

      <div className="flex space-x-2">
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            style={{
              width: '80px',
              height: '70px',
              marginRight: '15px',
              textAlign: 'center'
            }}
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onFocus={(e) => e.target.select()}
          />
        ))}
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <button onClick={verifyOtp} className="btn btn-dark mt-3">
        Confirm OTP
      </button>
    </div>
  );
};

export default OtpInput;
