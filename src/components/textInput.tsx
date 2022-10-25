import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export const TextInput: React.FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = ({ className = "", ...rest }) => (
  <input
    autoComplete="given-name"
    className={
      "w-full border-bottom border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm " +
      className
    }
    {...rest}
  />
);
