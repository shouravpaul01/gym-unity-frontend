"use client";
import { ReactNode } from "react";
import { FormProvider, SubmitHandler, useForm, UseFormReturn } from "react-hook-form";



interface IProps  {
  children: ReactNode;
  methods: UseFormReturn;
  onSubmit: SubmitHandler<any>;
  className?:string

}
export default function CForm({
  children,
  methods,
  onSubmit,
  className
}: IProps) {
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>{children}</form>
    </FormProvider>
  );
}
