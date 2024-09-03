import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Gatekeeper Dashboard",
};

export default function page() {
  return <SignIn />;
}
