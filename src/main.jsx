import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { inject } from "@vercel/analytics";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./index.css";
import App from "./App.jsx";

inject();

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
if (!googleClientId) {
  // eslint-disable-next-line no-console
  console.log(
    "VITE_GOOGLE_CLIENT_ID is not set. Google OAuth will not work.........",
  );
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <BrowserRouter>
        <App />
        <SpeedInsights />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
);
