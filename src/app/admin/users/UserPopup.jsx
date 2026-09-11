import { baseurl } from "@/app/component/urls";
import axios from "axios";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaKey, FaUser, FaCopy, FaCheck, FaTimes } from "react-icons/fa";

const UserPopup = ({ onClose ,getUser}) => {
  const [usercode, setUsercode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const generatePassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!";
    let pass = "";
    for (let i = 0; i < 12; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
    setError("");
    setShowPassword(true);
    setIsCopied(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      setError("Failed to copy password");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!usercode.trim()) {
      setError("Usercode is required");
      setIsLoading(false);
      return;
    }

    if (password && password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Submit data to API
     
      
      // Simulate API call
    //   await new Promise(resolve => setTimeout(resolve, 1000));

const response = await axios.post(`${baseurl}/user/create`,{usercode, password})
const data = await response.data;
if(data.success){

 setUsercode("");
      setPassword("");
      setShowPassword(false);
      setError("");
      onClose(false)
     getUser()
}

      
      // Clear form
     
      
    
      
    } catch (err) {
      setError("Failed to create user");
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (pass) => {
    if (!pass) return { strength: "", color: "" };
    if (pass.length < 6) return { strength: "Weak", color: "text-red-500" };
    if (pass.length < 10) return { strength: "Medium", color: "text-yellow-500" };
    return { strength: "Strong", color: "text-green-500" };
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="fixed h-screen w-full flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 hover:scale-[1.02]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <FaUser className="text-white" />
              Create New User
            </h2>
            <button
              onClick={()=>onClose(false)}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors duration-200"
            >
              <FaTimes size={18} />
            </button>
          </div>
          <p className="text-blue-100 text-sm mt-2">Create a new user account with secure credentials</p>
        </div>

        {/* Form */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
              <FaTimes className="flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Usercode Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FaUser className="text-blue-500" size={14} />
                Usercode
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={usercode}
                  onChange={(e) => setUsercode(e.target.value)}
                  className="w-full border-2 border-gray-200 px-4 py-3 pl-10 rounded-xl outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 hover:border-gray-300"
                  placeholder="Enter unique usercode"
                  required
                />
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Password Section */}
            {showPassword && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <FaKey className="text-green-500" size={14} />
                    Password
                  </label>
                  {password && (
                    <span className={`text-xs font-medium ${passwordStrength.color}`}>
                      {passwordStrength.strength}
                    </span>
                  )}
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-2 border-gray-200 px-4 py-3 pr-24 rounded-xl outline-none transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 hover:border-gray-300 font-mono"
                    placeholder="Password will be generated"
                  />
                  
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                    <button
                      type="button"
                      onClick={copyToClipboard}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      title="Copy password"
                    >
                      {isCopied ? <FaCheck className="text-green-500" /> : <FaCopy />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                
                {password && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Password strength</span>
                      <span>{password.length}/12 characters</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          password.length < 6 ? 'bg-red-500 w-1/3' : 
                          password.length < 10 ? 'bg-yellow-500 w-2/3' : 
                          'bg-green-500 w-full'
                        }`}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={generatePassword}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border-2 border-transparent hover:border-gray-600"
              >
                <FaKey className="text-white" />
                Generate Password
              </button>
              
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border-2 border-transparent hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <FaUser className="text-white" />
                    Create User
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Security Note */}
          <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-700 text-center">
              <strong>Security Tip:</strong> Always use strong, unique passwords and store them securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPopup;