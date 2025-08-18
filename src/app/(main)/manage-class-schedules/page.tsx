"use client";
import HeadingSection from "@/src/components/HeadingSection";
import { AddIcon, EditIcon, InfoIcon, PersonEditIcon } from "@/src/components/icons";
import Loading from "@/src/components/Loading";

import { useGetAllClassSchedulesQuery, useUpdateClassScheduleStatusMutation } from "@/src/lib/features/classSchedule/classScheduleApi";

import { IClassSchedule, IQuery, IUserInfo } from "@/src/types";
import { Button } from "@heroui/button";

import { Chip } from "@heroui/chip";

import { useDisclosure } from "@heroui/modal";
import { Pagination } from "@heroui/pagination";

import { Switch } from "@heroui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { addToast } from "@heroui/toast";
import { Tooltip } from "@heroui/tooltip";
import { User } from "@heroui/user";
import { useSearchParams } from "next/navigation";
import { use, useMemo, useState } from "react";
import CreateandUpdateForm from "./_components.ts/CreateandUpdateForm";
import dayjs from "dayjs";
import { divider } from "@heroui/theme";
import { isAction } from "@reduxjs/toolkit";
import { isAccessGranted } from "../../utils";

export default function ManageUsersPage() {
    const modalDisclosure=useDisclosure();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");
  const [page, setPage] = useState<number>(1);
  const queryParams = useMemo(() => {
    const params: IQuery[] = [{ name: "page", value: page }];
    if (searchTerm) {
      params.push({ name: "search", value: searchTerm });
    }
    return params;
  }, [page, searchParams]);
  const [updateClassScheduleStatus] = useUpdateClassScheduleStatusMutation();
   
  const { data: schedules, isLoading } = useGetAllClassSchedulesQuery({
    query: queryParams,
  });
  console.log(schedules,"s")
  const loadingState = isLoading ? "loading" : "idle";

  const handleStatus = async(classScheduleId: string,status:boolean) => {
  
    try {
        const res= await updateClassScheduleStatus({classScheduleId,isActive:status})
        addToast({description: res.data.message,color:"success"})
    } catch (error:any) {
      console.log(error,"error")
       const errorMessages = error?.data?.errorMessages;
       if (errorMessages[0]?.path==="classScheduleError") {
        addToast({description: errorMessages[0]?.message,color:"danger"})
       }
        addToast({description: "Unexpected error occurred",color:"danger"})
    }
    
  
  };
  
  return (
    <div>
      <HeadingSection title="Manage Users" >
        {isAccessGranted(["admin"]) &&<Button color="success" size="sm" startContent={<AddIcon />} onPress={()=>modalDisclosure.onOpen()}>
            Create Schedule
        </Button>}
      </HeadingSection>
      <div>
        <Table
          aria-label="Example table with client side pagination"
          shadow="none"
          bottomContent={
            <div className=" w-full ">
              <Pagination
                showControls
                color="success"
                page={page}
                total={schedules?.totalPages }
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px] ",
          }}
        >
          <TableHeader>
            <TableColumn key="date">Date</TableColumn>
            <TableColumn key="time">Start Time - End Time</TableColumn>
            
<TableColumn key="Status">Status</TableColumn>
            <TableColumn key="action">Action</TableColumn>
          </TableHeader>
          <TableBody
            items={(schedules?.data?.data as IClassSchedule[]) ?? []}
            loadingContent={<Loading className="h-auto" />}
            loadingState={loadingState}
            emptyContent={<p>Data not found.</p>}
          >
            {(schedule) => (
              <TableRow key={schedule._id}>
                <TableCell>
                  <User
                    avatarProps={{ radius: "lg", src: (schedule.trainer as IUserInfo)?.name}}
                    description={<div>

                      <div className="flex items-center  gap-1">
                        <span className="font-semibold">Date:</span>
                        <Chip color="secondary" variant="flat" size="sm">
                          {dayjs(schedule.date).format("MMMM D, YYYY")}
                        </Chip>
                      </div>
                    </div>}
                    name={<div className="flex  gap-1">
                        <span className="font-semibold">Trainer:</span>
                        <span>{(schedule.trainer as IUserInfo)?.name}</span>
                      </div>}
                  />
                  
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <div className="flex gap-1 items-center">
                       <span className="font-semibold">Start Time:</span>
                    <Chip color="secondary" variant="flat" size="sm">
                      {dayjs(schedule.startTime).format("h:mm A")}
                    </Chip>
                  </div>
                  -
                  <div className="flex gap-1 items-center">
                       <span className="font-semibold">Start Time:</span>
                    <Chip color="secondary" variant="flat" size="sm">
                      {dayjs(schedule.startTime).format("h:mm A")}
                    </Chip>
                  </div>
                  </div>
                </TableCell>

                <TableCell>
                  {" "}
                {isAccessGranted(["admin"]) &&  <div className="flex items-center gap-2">
                    <Chip
                      color={schedule.isActive ? "secondary" : "danger"}
                      variant="flat"
                      size="sm"
                    >
                      {schedule.isActive ? "Active" : "Inactive"}
                    </Chip>
                    
                      
                        <Switch
                          isSelected={schedule.isActive}
                          color="success"
                          size="sm"
                          onValueChange={(value) => handleStatus(schedule?._id!,value as boolean)}
                        />
                     
                    
                  </div>}
                </TableCell>

                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <Tooltip color="primary" content="Details" showArrow>
                      <Button
                        isIconOnly
                        color="success"
                        variant="flat"
                        size="sm"
                      >
                        <InfoIcon />
                      </Button>
                    </Tooltip>

                  { isAccessGranted(["admin"]) && <Tooltip color="primary" content="Edit" showArrow>
                      <Button
                        isIconOnly
                        color="success"
                        variant="flat"
                        size="sm"
                      >
                        <EditIcon />
                      </Button>
                    </Tooltip>}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <CreateandUpdateForm useDisclosure={modalDisclosure}/>
    </div>
  );
}
