import "bootstrap/dist/css/bootstrap.css";
import navBarStyles from "../public/styles/navbar.module.css";
import { useState, useEffect } from "react";
import { Router, useRouter } from "next/router";

export default function DeviceSettings() {
  console.log("deviceSettings");
  return (
    <div className={`${navBarStyles.navbar}`}>
        <div><img src="../public/" alt="BigCo Inc. logo"/></div>
    </div>
  ) 
}
