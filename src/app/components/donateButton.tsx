"use client";
import Script from "next/script";
import React, { useEffect } from "react";

function DonateButtonComponent() {
  useEffect(() => {
    // Query the DOM for the button element
    const buttonElement = document.querySelector("stripe-buy-button");

    // Ensure the buttonElement is an HTMLElement
    if (buttonElement instanceof HTMLElement) {
      // Update the styles of the button element
      //   buttonElement.style.color = "#1d2f5d";
      //   buttonElement.style.fontWeight = "bold";
      //   buttonElement.style.borderRadius = "4pt";
      //   buttonElement.style.borderWidth = "0.2em";
      //   buttonElement.style.borderColor = "#1d2f5d";
      //   buttonElement.style.backgroundColor = "white";
      //   buttonElement.style.fontSize = "20pt";
      //   buttonElement.style.width = "100%";
      //   buttonElement.style.height = "60px";
      //   buttonElement.style.border = "2px solid #1d2f5d";
      //   buttonElement.style.background = "#fff";
      //   buttonElement.style.boxSizing = "border-box";
    }
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <Script async src="https://js.stripe.com/v3/buy-button.js" />
      {/* @ts-ignore */}
      <stripe-buy-button
        buy-button-id={process.env.STRIPE_BUTTON_ID}
        publishable-key={process.env.STRIPE_PUBLIC_KEY}
      />
    </div>
  );
}

export default DonateButtonComponent;
