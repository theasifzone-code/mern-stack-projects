import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { FaKey, FaTrash, FaCopy, FaLock, FaSyncAlt, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

// Reusable Button Component
const ActionButton = ({ onClick, disabled, className, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-3 
      font-semibold rounded-xl shadow-md transition-all duration-200
      transform hover:scale-[1.02] active:scale-[0.98] 
      focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 
      ${className}`}
  >
    {children}
  </button>
);

//  API Key Management Component
const ApiKeyManagement = () => {
  const [generatedKey, setGeneratedKey] = useState(null);
  const [hasActiveKey, setHasActiveKey] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [processing, setProcessing] = useState(false);

  /** Check Key Status on Mount */
  const checkKeyStatus = async () => {
    setCheckingStatus(true);
    try {
      const res = await axiosInstance.get("/apikeys/status");
      setHasActiveKey(res.data?.data?.isActive || false);
    } catch {
      setHasActiveKey(false);
    } finally {
      setCheckingStatus(false);
    }
  };

  useEffect(() => {
    checkKeyStatus();
  }, []);

  // Copy Key 
  const handleCopy = () => {
    if (generatedKey) {
      navigator.clipboard.writeText(generatedKey);
      toast.success("API Key copied to clipboard ", { autoClose: 3000 });
    }
  };

  // Generate New Key 
  const handleGenerate = async () => {
    if (
      hasActiveKey &&
      !window.confirm(
        "You already have an active key. Generating a new one will revoke the old one permanently. Continue?"
      )
    )
      return;

    setProcessing(true);
    setGeneratedKey(null);

    try {
      const res = await axiosInstance.post("/apikeys/generate");
      const newKey = res.data?.data?.apiKey;

      setGeneratedKey(newKey);
      setHasActiveKey(true);
      toast.success("New API key generated! Copy it NOW — it won’t be shown again.", {
        autoClose: false,
        closeOnClick: false,
      });
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to generate key.";
      toast.error(msg);
    } finally {
      setProcessing(false);
    }
  };

  // Revoke Existing Key 
  const handleRevoke = async () => {
    if (!hasActiveKey) return toast.warn("No active key found to revoke.");
    if (!window.confirm("Are you sure you want to revoke your API key?")) return;

    setProcessing(true);
    try {
      await axiosInstance.delete("/apikeys/revoke");
      setHasActiveKey(false);
      setGeneratedKey(null);
      toast.info("API key revoked successfully.", { autoClose: 2500 });
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to revoke key.";
      toast.error(msg);
    } finally {
      setProcessing(false);
    }
  };

  // Loader UI 
  if (checkingStatus) {
    return (
      <div className="text-center mt-20 text-xl font-semibold text-indigo-600 flex justify-center items-center">
        Checking Key Status... <FaSyncAlt className="ml-3 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-5 sm:px-8">
      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 flex items-center border-b pb-4">
        <FaKey className="text-indigo-600 mr-3 hidden small:block" /> API Key Management
      </h1>

      {/* Status Box */}
      <div
        className={`p-5 rounded-xl mb-6 shadow-md transition-all duration-300 ${
          hasActiveKey
            ? "bg-indigo-50 border-l-4 border-indigo-600"
            : "bg-red-50 border-l-4 border-red-600"
        }`}
      >
        <p
          className={`font-semibold text-lg ${
            hasActiveKey ? "text-indigo-800" : "text-red-800"
          }`}
        >
          Current Status:{" "}
          <span className="font-bold">
            {hasActiveKey ? "Active Key Found" : "No Active Key"}
          </span>
        </p>
        <p className="text-sm mt-2 text-gray-600">
          {hasActiveKey
            ? "You currently have an API key. You can revoke it or generate a new one."
            : "You need to generate an API key to use the public API."}
        </p>
      </div>

      {/* Generated Key Display */}
      {generatedKey && (
        <div className="relative flex items-center p-4 mb-8 bg-yellow-50 border-2 border-yellow-400 rounded-xl shadow-inner">
          <FaLock className="text-yellow-700 mr-3 flex-shrink-0" size={22} />
          <code className="font-mono text-sm sm:text-base text-yellow-900 break-all mr-3 select-text flex-1">
            {generatedKey}
          </code>
          <button
            onClick={handleCopy}
            className="text-yellow-800 hover:text-yellow-600 p-2 rounded-full hover:bg-yellow-200 transition"
            title="Copy Key"
          >
            <FaCopy size={18} />
          </button>
          <button
            onClick={() => setGeneratedKey(null)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            title="Dismiss"
          >
            <FaTimes size={16} />
          </button>
        </div>
      )}

      {/* Main Actions */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-100 space-y-6">
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          API Keys allow secure access to your tasks from external apps. Keep them private and never
          share them publicly.
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Generate Key */}
          <ActionButton
            onClick={handleGenerate}
            disabled={processing}
            className="bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-300"
          >
            {processing ? (
              <>
                <FaSyncAlt className="animate-spin mr-2" /> Processing...
              </>
            ) : (
              <>
                <FaKey className="mr-2 hidden small:block" />
                {hasActiveKey ? "Generate New Key (Revoke Old)" : "Generate API Key"}
              </>
            )}
          </ActionButton>

          {/* Revoke Key */}
          {hasActiveKey && (
            <ActionButton
              onClick={handleRevoke}
              disabled={processing}
              className="bg-red-500 text-white hover:bg-red-600 focus:ring-red-300"
            >
              <FaTrash className="mr-2 hidden small:block" /> Revoke Current Key
            </ActionButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiKeyManagement;
