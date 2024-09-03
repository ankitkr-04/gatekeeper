import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Gatekeeper Dashboard",
};

export default function page() {
  return <SignUp />;
}
