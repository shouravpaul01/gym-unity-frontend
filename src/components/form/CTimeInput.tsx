"use client";


import { TimeInput, TimeInputProps } from "@heroui/date-input";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

interface IProps {
  name: string;
  timePickerProps?: TimeInputProps;
  registerOptions?: RegisterOptions;
}

export default function CTimeInput({
  name,
  timePickerProps,
  registerOptions,
}: IProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

   return (
    <Controller
      name={name}
      control={control}
      defaultValue={null as any}
      render={({ field: { ref, ...field } }) => (
        <TimeInput
          variant="bordered"
          labelPlacement="outside"
          size="lg"
          {...timePickerProps}
          value={field.value ?? null}
          onChange={field.onChange}
          isInvalid={!!errors[name]}
          errorMessage={errors[name]?.message as string}
        />
      )}
    />
  );
}