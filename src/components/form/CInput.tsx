"use client";

import { Input, InputProps } from "@heroui/input";
import { RegisterOptions, useFormContext } from "react-hook-form";

interface IProps {
  name: string;
  inputProps?: InputProps;
  registerOptions?:RegisterOptions
}
export default function CInput({ name, inputProps,registerOptions}: IProps) {
  const { register,formState:{errors} } = useFormContext();
 
  return <Input variant="bordered" labelPlacement="outside" size="lg" {...register(name,registerOptions)} {...inputProps} isInvalid={!!errors[name]}
  errorMessage={errors[name]?.message as string}/>;
}
