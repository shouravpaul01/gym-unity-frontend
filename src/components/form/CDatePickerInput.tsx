"use client";

import { DatePicker, DatePickerProps } from "@heroui/date-picker";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

interface IProps {
  name: string;
  datePickerProps?: DatePickerProps;
  registerOptions?: RegisterOptions;
}

export default function CDatePickerInput({
  name,
  datePickerProps,
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
        <DatePicker
          variant="bordered"
          labelPlacement="outside"
          size="lg"
          {...datePickerProps}
          value={field.value ?? null}
          onChange={field.onChange}
          isInvalid={!!errors[name]}
          errorMessage={errors[name]?.message as string}
        />
      )}
    />
  );
}
