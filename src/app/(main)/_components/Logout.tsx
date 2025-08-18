"use client"

import { logoutUser } from '@/src/services/auth'
import { ICurrentTookenData, IUserInfo } from '@/src/types'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown'
import { User } from '@heroui/user'
import React from 'react'

export default function Logout({user}: {user: ICurrentTookenData}) {
  return (
    <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
            className="transition-transform"
            description={user.role}
            name={user.name}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          
          
          <DropdownItem key="logout" color="danger" onPress={()=>logoutUser}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
  )
}
