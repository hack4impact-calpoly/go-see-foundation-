"use client";
import React, { useState } from "react";
import styles from "./emailPage.module.css";
import { IUser } from "@database/userSchema";
import emailjs from "@emailjs/browser";
import BackButton from "../../components/backButton";

export default function AdminPage() {
  const [selectedOption, setSelectedOption] = useState("");
  const [individualEmail, setIndividualEmail] = useState("");
  const [emailText, setEmailText] = useState("");

  const handleSelectChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedOption(e.target.value);
  };

  const getUsers = async () => {
    try {
      const userList = await fetch(`/api/users?userType=${selectedOption}`);
      if (!userList.ok) {
        throw new Error("Failed to fetch user list");
      }
      const userListData = await userList.json();
      return userListData;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const sendEmails = async () => {
    if (selectedOption === "Individual") {
      const params = {
        to_email: individualEmail,
        message: emailText,
      };
      emailjs
        .send("service_cppo4i7", "template_izma6p8", params, {
          publicKey: "GKeCNmE1q3H0bTjJE",
        })
        .then((response) => {
          console.log("Email sent successfully!", response);
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });
    } else {
      const userList = await getUsers();
      userList.map((user: IUser) => {
        console.log(user.email);
        const params = {
          to_email: user.email,
          message: emailText,
        };

        emailjs
          .send("service_cppo4i7", "template_izma6p8", params, {
            publicKey: "GKeCNmE1q3H0bTjJE",
          })
          .then((response) => {
            console.log("Email sent successfully!", response);
          })
          .catch((error) => {
            console.error("Error sending email:", error);
          });
      });
    }

    setEmailText("");
    setIndividualEmail("");
  };

  const handleIndividualEmailChange = (e: any) => {
    const value = e.target.value;
    setIndividualEmail(value);
  };

  const handleEmailTextChange = (e: any) => {
    const value = e.target.value;
    setEmailText(value);
  };

  return (
    <div>
      <BackButton />
      <div className={styles.emailArea}>
        <div className={styles.emailForm}>
          <label htmlFor="dropdown" className={styles.group}>
            Select Group:
          </label>
          <select
            id="dropdown"
            value={selectedOption}
            onChange={handleSelectChange}
            className={styles.selectStyle}
          >
            <option value="">Select...</option>
            <option value="Member">Member</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Partner/Donor">Partner/Donor</option>
            <option value="Individual">Individual</option>
          </select>
          {selectedOption === "Individual" && (
            <input
              className={styles.to_input}
              placeholder="Enter Email"
              type="text"
              onChange={handleIndividualEmailChange}
              value={individualEmail}
            />
          )}
          <textarea
            className={styles.messageArea}
            placeholder="Enter email text here!"
            onChange={handleEmailTextChange}
            value={emailText}
          />
          <button className={styles.formButtons} onClick={sendEmails}>
            Send Email!
          </button>
        </div>
      </div>
    </div>
  );
}
