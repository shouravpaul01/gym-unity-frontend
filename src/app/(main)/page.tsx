"use client";
import { ClockIcon } from "@/src/components/icons";
import { useGetAllClassSchedulesQuery } from "@/src/lib/features/classSchedule/classScheduleApi";
import { IClassSchedule } from "@/src/types";
import ClassScheduleCard from "./_components/ClassScheduleCard";


export default function page() {
  const { data: schedules, isLoading } = useGetAllClassSchedulesQuery([]);
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {schedules &&
          schedules?.data?.data?.map((schedule: IClassSchedule) => (
            <ClassScheduleCard key={schedule._id} schedule={schedule} />
          ))}
      </div>
    </div>
  );
}
