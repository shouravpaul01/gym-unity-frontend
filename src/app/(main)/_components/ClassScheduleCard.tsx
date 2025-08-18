import { ClockIcon } from "@/src/components/icons";
import { IClassSchedule } from "@/src/types";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Chip } from "@heroui/chip";
import dayjs from "dayjs";

export default function ClassScheduleCard({
  schedule,
}: {
  schedule: IClassSchedule;
}) {
   
  return (
    <Card
   
      shadow="none"
      className="border border-dashed border-success"
    >
      <CardBody className="flex flex-col items-center gap-2">
        <ClockIcon className="size-14 text-center" />
        <div className="flex items-center gap-1">
          <Chip color="secondary" variant="flat" size="sm">
            {dayjs(schedule.startTime).format("h:mm A")}
          </Chip>
          - <span>To</span> -
          <Chip color="secondary" variant="flat" size="sm">
            {dayjs(schedule.endTime).format("h:mm A")}
          </Chip>
        </div>
        <Chip color="secondary" variant="flat" size="sm">
            Date: {dayjs(schedule.date).format("MMM D, YYYY")}
          </Chip>
          <div className="flex items-center gap-2">
            <span>Available</span>
            <Chip color="secondary" variant="flat" size="sm">
            {10-schedule.trainees?.length}
          </Chip>
          </div>
      </CardBody>
      <CardFooter>
        <Button color="success" variant="light" size="md" fullWidth>
          Book Schedule
        </Button>
      </CardFooter>
    </Card>
  );
}
