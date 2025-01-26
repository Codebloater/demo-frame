import React, { useEffect, useState } from "react";
import sdk from "@farcaster/frame-sdk";

function Demo() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      sdk.actions.ready();
    }

    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
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
    </div>
  );
}

export default Demo;
