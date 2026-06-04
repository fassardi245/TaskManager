"use client";
import { SignUp } from "@clerk/nextjs";
import React from "react";

export default function signup() {
  return (
    <div>
      <SignUp path="/signup" />
    </div>
  );
}