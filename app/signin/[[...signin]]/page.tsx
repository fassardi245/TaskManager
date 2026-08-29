"use client";
import React from "react";
import { SignIn } from "@clerk/nextjs";

export default function signin() {
  return (
    <div className="flex items-center justify-center h-full">
      < SignIn path="/signin" />
    </div>
  );
}