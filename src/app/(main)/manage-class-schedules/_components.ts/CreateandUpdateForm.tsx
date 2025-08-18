import CDatePickerInput from "@/src/components/form/CDatePickerInput";
import CForm from "@/src/components/form/CForm";
import CSelectInput from "@/src/components/form/CSelectInput";
import CTextarea from "@/src/components/form/CTextarea";
import CTimeInput from "@/src/components/form/CTimeInput";
import { useCreateClassScheduleMutation } from "@/src/lib/features/classSchedule/classScheduleApi";
import { useGetAllUsersQuery } from "@/src/lib/features/user/userApi";
import { IUserInfo } from "@/src/types";
import { createClassScheduleSchema } from "@/src/validations/classSchedule.validation";
import { Button } from "@heroui/button";
import { DatePicker } from "@heroui/date-picker";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  UseDisclosureProps,
} from "@heroui/modal";
import { addToast } from "@heroui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { getLocalTimeZone, Time, today } from "@internationalized/date";
import { useEffect, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function CreateandUpdateForm({
  useDisclosure,
}: {
  useDisclosure: UseDisclosureProps | any;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: users } = useGetAllUsersQuery([
    { name: "role", value: "trainer" },
  ]);
  const userOptions = useMemo(() => {
    return users?.data?.data?.map((user: IUserInfo) => ({
      label: user.name,
      value: user._id,
    }));
  }, [users]);
  const [createClassSchedule] = useCreateClassScheduleMutation();
  const methods = useForm({  resolver: zodResolver(createClassScheduleSchema)   });
  useEffect(() => {
    methods.reset({
      date: today(getLocalTimeZone()),
     
    
    });
  }, []);
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    setIsSubmitting(true);
        try {

         const res= await createClassSchedule(data).unwrap();
          addToast({ description: res?.message, color: "success" });

          methods.reset();
          useDisclosure.onOpenChange(false);
        } catch (error:any) {

          const errorMessages = error?.data.errorMessages;
          if (errorMessages.length > 0) {
            errorMessages.forEach((errorMessage: any) =>
              methods.setError(errorMessage.path, {
                type: "manual",
                message: errorMessage.message,
              })
            );
          }

        } finally {
          setIsSubmitting(false);
        }
  };
  return (
    <div>
      <Modal
        isOpen={useDisclosure.isOpen}
        onOpenChange={useDisclosure.onOpenChange}
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <CForm methods={methods as any} onSubmit={handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                Create Class Schedule
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col md:flex-row gap-4">
                  <CDatePickerInput
                    name="date"
                    datePickerProps={{
                      label: "Date",
                      className: "w-full md:w-[60%]",
                    }}
                  />
                  <CTimeInput
                    name="startTime"
                    timePickerProps={{
                      label: "Start Time",
                      className: "w-full md:w-[40%]",
                    }}
                  />
                </div>
                <CSelectInput
                  name="trainer"
                  options={userOptions}
                  selectProps={{
                    label: "Trainer",
                    placeholder: "Select Trainer",
                  }}
                />
                <CTextarea
                  name="description"
                  textareaProps={{ label: "Description" }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="success" type="submit">
                  Submit
                </Button>
              </ModalFooter>
            </CForm>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
