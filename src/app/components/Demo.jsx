import React, { useEffect, useState } from "react";
import sdk from "@farcaster/frame-sdk";

function Demo() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [joke, setJoke] = useState(""); // State to store the joke
  const [error, setError] = useState(""); // State to store any error message

  useEffect(() => {
    let jokeInterval;

    // Function to fetch a joke from the server
    async function fetchJoke() {
      try {
        const response = await fetch(
          "https://c735-2402-a00-165-569-c68-9d9c-b4d2-eb9d.ngrok-free.app/joke"
        );
        const data = await response.json();
        if (data.success) {
          setJoke(data.joke);
          setError(""); // Clear any previous error
        } else {
          throw new Error(data.error || "Failed to fetch joke.");
        }
      } catch (err) {
        setError("Unable to fetch joke. Please try again later.");
      }
    }

    // Function to mark the SDK as ready
    async function loadSDK() {
      sdk.actions.ready();
    }

    // Load SDK and fetch jokes every 5 seconds
    if (!isSDKLoaded) {
      setIsSDKLoaded(true);
      loadSDK();
      fetchJoke(); // Fetch the first joke immediately
      jokeInterval = setInterval(fetchJoke, 5000); // Fetch a new joke every 5 seconds
    }

    // Cleanup interval on component unmount
    return () => clearInterval(jokeInterval);
  }, [isSDKLoaded]);

  return (
    <div style={{ width: "300px", margin: "0 auto", padding: "16px" }}>
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "16px"
        }}
      >
        Frames v2 Demo
      </h1>
      {error ? (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      ) : (
        <p style={{ fontSize: "16px", textAlign: "center" }}>{joke}</p>
      )}
    </div>
  );
}

export default Demo;
