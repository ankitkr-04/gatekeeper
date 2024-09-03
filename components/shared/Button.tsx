"use client";
import { Button } from "@material-tailwind/react";

interface DefaultButtonProps {
  label: string;
}

const DefaultButton = ({ label }: DefaultButtonProps) => {
  return <Button type="button">{label}</Button>;
};

export default DefaultButton;
