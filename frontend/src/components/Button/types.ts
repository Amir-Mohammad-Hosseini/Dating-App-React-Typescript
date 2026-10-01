import type { ButtonHTMLAttributes, ReactNode } from "react";

export default interface ButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  type?: "button" | "submit" | "reset";
  className ?:string
  isSubmitting : boolean 
  submittingText : string | ReactNode
}
