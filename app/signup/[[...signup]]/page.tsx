"use client";
import { SignUp } from "@clerk/nextjs";
import React from "react";

export default function signup() {
  return (
    <div className="flex items-center justify-center h-full">
      <SignUp path="/signup" />
    </div>
  );
}