import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function StudentLogin() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  const handleProceed = (e) => {
  e.preventDefault();

  if (!phone.trim()) {
    toast.error("Phone number is required", { position: "top-center" });
    return;
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone)) {
    toast.error("Enter a valid 10-digit phone number", { position: "top-center" });
    return;
  }

  // Save phone number locally before navigation
  localStorage.setItem("userPhone", phone);

  toast.success("Redirecting...", { position: "top-center", autoClose: 600 });

  setTimeout(() => {
  localStorage.setItem("userPhone", phone);
  navigate("/upload-docs");
}, 700);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-[#001b48] to-[#ff4f00]">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md transition-transform duration-300 hover:scale-105">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-24 h-24 object-contain"
          />
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-[#430000]">
          Welcome to Servocci Counsellors
        </h2>

        {/* Phone Number Input */}
        <div className="mb-8">
          <label htmlFor="phone" className="block mb-2 font-semibold text-gray-700 text-sm sm:text-base">
            Phone Number <span className="text-red-600">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your 10-digit phone number"
            maxLength={10}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <form onSubmit={handleProceed} className="flex flex-col gap-6">
          {/* Proceed Button Only */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#ff4f00] to-[#ff7f1a] hover:from-[#e63f00] hover:to-[#e66a00] text-white font-bold rounded-full shadow-lg transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">Proceed</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition duration-300 rounded-full"></div>
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}

export default StudentLogin;
