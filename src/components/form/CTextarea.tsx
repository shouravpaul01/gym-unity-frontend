"use client";

import { Textarea, TextAreaProps } from "@heroui/input";
import { RegisterOptions, useFormContext } from "react-hook-form";

interface IProps {
  name: string;
  textareaProps?: TextAreaProps;
  registerOptions?: RegisterOptions;
}

export default function CTextarea({
  name,
  textareaProps,
  registerOptions,
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Textarea
      variant="bordered"
      labelPlacement="outside"
      size="lg"
      {...register(name, registerOptions)}
      {...textareaProps}
      isInvalid={!!errors[name]}
      errorMessage={errors[name]?.message as string}
    />
  );
}
