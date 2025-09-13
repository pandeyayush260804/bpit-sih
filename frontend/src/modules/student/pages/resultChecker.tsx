import React, { useState } from "react";

const CheckResult = () => {
  const [roll, setRoll] = useState("");
  const [url, setUrl] = useState("");

  const showResult = () => {
    if (roll.trim()) {
      setUrl(`https://www.ipuranklist.com/student/${roll}`);
    }
  };

  const pageStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    minHeight: "100vh",
    background: "#f0f2f5",
    padding: "40px 20px",
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif",
  };

  const cardStyle: React.CSSProperties = {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "100%",
    maxWidth: "1100px",
  };

  const iframeContainerStyle: React.CSSProperties = {
    position: "relative",
    marginTop: "30px",
    width: "100%",
    height: "650px",
    overflow: "hidden",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={{ color: "#333", marginBottom: "20px" }}>Student Result Finder</h1>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Enter Roll No."
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            style={{
              padding: "12px 15px",
              fontSize: "16px",
              marginRight: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              width: "250px",
            }}
          />
          <button
            onClick={showResult}
            style={{
              padding: "12px 25px",
              fontSize: "16px",
              cursor: "pointer",
              border: "none",
              background: "#007bff",
              color: "white",
              borderRadius: "8px",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
          >
            Get Result
          </button>
        </div>

        {url && (
          <div style={iframeContainerStyle}>
            <iframe
              src={url}
              style={{ width: "100%", height: "100%", border: "none" }}
              sandbox="allow-same-origin allow-scripts"
              title="Student Result"
            />

            {/* Optional white borders */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "60px", background: "white" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "2%", background: "white" }} />
            <div style={{ position: "absolute", top: 0, right: 0, width: "2%", height: "100%", background: "white" }} />
            <div style={{ position: "absolute", top: 0, left: 0, width: "2%", height: "100%", background: "white" }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckResult;
