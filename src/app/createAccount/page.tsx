"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import connectDB from "../../helpers/db";
import logo from "../images/GO-See-HLogo.fw_.png";
import styles from "./createAccount.module.css";
import { IUser } from "@database/userSchema";
import { useRouter } from "next/navigation";
import { PatternFormat } from "react-number-format";
import Link from "next/link";

const CreateAccount = () => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const lastInputRef = useRef<HTMLInputElement>(null);
  const birthInputRef = useRef<HTMLInputElement>(null);
  const userSelectRef = useRef<HTMLSelectElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const repeatPasswordInputRef = useRef<HTMLInputElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const signupButtonRef = useRef<HTMLButtonElement>(null);
  const loginButtonRef = useRef<HTMLButtonElement>(null);

  // states for fields
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { push } = useRouter();

  const [account, setAccount] = useState({
    first: "",
    last: "",
    phone: "",
    email: "",
    user: "",
    password: "",
    username: "",
  });

  const handleAccountChange = (e: React.FormEvent<HTMLFormElement>) => {
    const event = e.target as HTMLInputElement;
    setAccount({ ...account, [event.id]: event.value });
  };

  const handleSelectKeyPress = (e: React.KeyboardEvent<HTMLSelectElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      switch (e.currentTarget.id) {
        case "user":
          emailInputRef?.current?.focus();
          break;
        // Add cases for other select options if needed
        default:
          break;
      }
    }
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      switch (e.currentTarget.id) {
        case "first":
          lastInputRef?.current?.focus();
          break;
        case "last":
          birthInputRef?.current?.focus();
          break;
        case "birth":
          userSelectRef?.current?.focus();
          break;
        case "user":
          emailInputRef?.current?.focus();
          break;
        case "email":
          phoneInputRef?.current?.focus();
          break;
        case "phone":
          passwordInputRef?.current?.focus();
          break;
        case "password":
          repeatPasswordInputRef?.current?.focus();
          break;
        case "repeatPassword":
          checkboxRef?.current?.focus();
          break;
        case "myCheckbox":
          signupButtonRef?.current?.focus();
          break;
        case "signup":
          loginButtonRef?.current?.focus();
          break;
        case "login":
          firstInputRef?.current?.focus(); // Loop back to the first input field
          break;
        default:
          break;
      }
    }
  };

  const handleButtonKeyPress = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      switch (e.currentTarget.id) {
        case "signup":
          loginButtonRef?.current?.focus();
          break;
        case "login":
          firstInputRef?.current?.focus(); // Loop back to the first input field
          break;
        default:
          break;
      }
    }
  };

  const handleCreateAccount = () => {
    // If successful, redirect to a different page
    console.log("hi");
    push("/");
  };

  // check the current states
  const handleStates = () => {
    return;
  };

  const handlePasswordChange = (e: any) => {
    console.log(e.target.value)
    setPassword(e.target.value);
  };

  const handleRepeatPasswordChange = (e: any) => {
    console.log(e.target.value);
    setRepeatPassword(e.target.value);
  };

  const handleEmailChange = (e: any) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handleAccountTypeChange = (e: any) => {
    console.log(e.target.value);
    setUserType(e.target.value);
  };

  const handlePhoneNumberChange = (e: any) => {
    console.log(e.target.value);
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("in handle");
    const newUser: IUser = {
      username: "place_holder",
      password: account.password,
      userType: account.user,
      firstName: account.first,
      lastName: account.last,
      phoneNum: account.phone,
      email: account.email,
    };

    newUser.username = newUser.firstName + " " + newUser.lastName;

    try {
      console.log("newUser", newUser);
      console.log("fetching");

      const response = await fetch("/api/registration/", {
        // Updated API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      console.log(response);

      if (response.ok) {
        console.log("Account created successfully!");
        handleCreateAccount();
      } else {
        console.error("Failed to create account");
      }
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return (
    <div className={styles.createAccount}>
      <br></br>
      <h1 className={styles.title}>Sign in and join the Go See community!</h1>
      <div className={styles.container}>
        <form
          className={styles.createForm}
          onChange={handleAccountChange}
          onSubmit={handleSubmit}
        >
          <h2 className={styles.heading}>Step 1: Personal Info:</h2>
          <div className={styles.inputs}>
            <input
              className={styles.input}
              type="text"
              id="first"
              placeholder="First Name"
              required
              ref={firstInputRef}
              onKeyDown={handleInputKeyPress}
            />
            <input
              className={styles.input}
              type="text"
              id="last"
              placeholder="Last Name"
              required
              ref={lastInputRef}
              onKeyDown={handleInputKeyPress}
            />
            <PatternFormat
              className={styles.input}
              type="text"
              format="##/##/####"
              id="birth"
              mask="_"
              required
              onKeyDown={handleInputKeyPress}
              placeholder="Date of Birth"
            />
            <select
              className={styles.input}
              id="user"
              ref={userSelectRef}
              onKeyDown={handleSelectKeyPress}
              value={userType}
              onChange={handleAccountTypeChange}
            >
              <option value="select" disabled selected>
                Select One
              </option>
              <option value="Member">Member</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Partner/Donor">Partner/Donor</option>
            </select>
          </div>
          <br></br>
          <h2 className={styles.heading}>Step 2: Account Info:</h2>
          <div className={styles.inputs}>
            <input
              className={styles.input}
              type="email"
              id="email"
              placeholder="Email"
              required
              ref={emailInputRef}
              onKeyDown={handleInputKeyPress}
              onChange={handleEmailChange}
            />
            <PatternFormat
              className={styles.input}
              type="tel"
              format="+1 (###) ###-####"
              id="phone"
              mask="_"
              required
              onKeyDown={handleInputKeyPress}
              placeholder="Phone Number"
              onChange={handlePhoneNumberChange}
            />
            <input
              className={styles.input}
              type="password"
              id="password"
              placeholder="Password"
              required
              ref={passwordInputRef}
              onKeyDown={handleInputKeyPress}
              onChange={handlePasswordChange}
            />
            <input
              className={styles.input}
              type="password"
              id="repeatPassword"
              placeholder="Repeat Password"
              required
              ref={repeatPasswordInputRef}
              onKeyDown={handleInputKeyPress}
              onChange={handleRepeatPasswordChange}
            />
          </div>
          <br></br>
          <div className={styles.buttons}>
            <button
              className={styles.signup}
              id="signup"
              type="submit"
              ref={signupButtonRef}
            >
              SIGN UP
            </button>
            <br></br>
            <div className={styles.break}></div>
            <p className={styles.accounttext}>Already have an account?</p>
            <button
              className={styles.login}
              id="login"
              ref={loginButtonRef}
              onKeyDown={handleButtonKeyPress}
            >
              <Link href="/login">LOG IN</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateAccount;
