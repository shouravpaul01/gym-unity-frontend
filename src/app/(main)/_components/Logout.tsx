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
              src: user?.image || "",
              size:"sm"
            }}
            className="transition-transform"
            description={user.role}
            name={user.name}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          
          
          <DropdownItem key="logout" color="danger" onPress={async()=> {await logoutUser()}}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
  )
}
