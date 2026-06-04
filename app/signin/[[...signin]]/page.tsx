"use client";
import React from "react";
import { SignIn } from "@clerk/nextjs";

export default function signin() {
  return (
    <div>
      < SignIn path="/signin" />
    </div>
  );
}