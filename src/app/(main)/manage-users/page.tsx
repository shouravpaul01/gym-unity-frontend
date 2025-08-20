"use client";
import HeadingSection from "@/src/components/HeadingSection";
import { EditIcon, InfoIcon, PersonEditIcon } from "@/src/components/icons";
import Loading from "@/src/components/Loading";
import { roleOptions } from "@/src/constent";
import { useGetAllUsersQuery, useUpdateUserRoleMutation, useUpdateUserStatusMutation } from "@/src/lib/features/user/userApi";
import { IQuery, IUserInfo } from "@/src/types";
import { Button } from "@heroui/button";

import { Chip } from "@heroui/chip";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Pagination } from "@heroui/pagination";
import { Popover, PopoverTrigger } from "@heroui/popover";
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
import { useMemo, useState } from "react";

export default function ManageUsersPage() {
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
  const [updateUserStatus] = useUpdateUserStatusMutation();
   const [updateUserRole] = useUpdateUserRoleMutation();
  const { data: users, isLoading } = useGetAllUsersQuery(queryParams);
  console.log(users,"users")
  const loadingState = isLoading ? "loading" : "idle";

  const handleStatus = async(userId: string,status:boolean) => {
  
    try {
        const res= await updateUserStatus({userId,isBlocked:status})
        addToast({description: res.data.message,color:"success"})
    } catch (error:any) {
       const errorMessages = error?.data.errorMessages;
       if (errorMessages[0].path==="userError") {
        addToast({description: errorMessages[0].message,color:"danger"})
       }
        addToast({description: "Unexpected error occurred",color:"danger"})
    }
    
  
  };
  const handleUpdaterole = async(userId: string,role:string) => {
   
    try {
        const res= await updateUserRole({userId,role})
        addToast({description: res.data.message,color:"success"})
    } catch (error:any) {
       const errorMessages = error?.data.errorMessages;
       if (errorMessages[0].path==="userError") {
        addToast({description: errorMessages[0].message,color:"danger"})
       }
        addToast({description: "Unexpected error occurred",color:"danger"})
    }
    
  
  };
  return (
    <div>
      <HeadingSection title="Manage Users" />
      <div>
        <Table
          aria-label="Example table with client side pagination"
          shadow="none"
          bottomContent={
            <div className=" w-full ">
              <Pagination
                showControls
                color="secondary"
                page={page}
                total={users?.totalPages }
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px] ",
          }}
        >
          <TableHeader>
            <TableColumn key="name">NAME</TableColumn>
            <TableColumn key="role">ROLE</TableColumn>
            <TableColumn key="status">STATUS</TableColumn>

            <TableColumn key="action">Action</TableColumn>
          </TableHeader>
          <TableBody
            items={(users?.data?.data as IUserInfo[]) ?? []}
            loadingContent={<Loading className="h-auto" />}
            loadingState={loadingState}
            emptyContent={<p>Data not found.</p>}
          >
            {(user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <User
                    avatarProps={{ radius: "lg", src: user?.image }}
                    description={<p>{user?.email}</p>}
                    name={user?.name}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Chip color="secondary" variant="flat" size="sm">
                      {user?.role.toUpperCase()}
                    </Chip>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          isIconOnly
                          variant="flat"
                          color="success"
                          size="sm"
                        >
                          <PersonEditIcon />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                      disallowEmptySelection
                        aria-label="Dynamic Actions"
                        items={roleOptions}
                        color="success"
                        selectionMode="single"
                        variant="flat"
                      >
                        {(role) => (
                          <DropdownItem
                            key={role.value}
                            isDisabled={user?.role === role.value}
                           
                            onPress={() => handleUpdaterole(user?._id!,role.value)}
                          >
                            {role.label}
                          </DropdownItem>
                        )}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </TableCell>

                <TableCell>
                  {" "}
                  <div className="flex items-center gap-2">
                    <Chip
                      color={user.isBlocked ? "secondary" : "danger"}
                      variant="flat"
                      size="sm"
                    >
                      {user?.isBlocked ? "Blocked" : "Unblocked"}
                    </Chip>
                    
                      
                        <Switch
                          isSelected={user?.isBlocked}
                          color="success"
                          size="sm"
                          onValueChange={(value) => handleStatus(user?._id!,value as boolean)}
                        />
                     
                    
                  </div>
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

                    <Tooltip color="primary" content="Edit user" showArrow>
                      <Button
                        isIconOnly
                        color="success"
                        variant="flat"
                        size="sm"
                      >
                        <EditIcon />
                      </Button>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
