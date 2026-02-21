"use client"
import React from 'react'
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
const SidebarPro = ({title,children}) => {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader value={title} />
        <div className="flex flex-1 flex-col justify-center items-center  ">
          <div className="@container/main w-full flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 w-full md:gap-6 md:py-6 lg:w-1/2 ">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default SidebarPro
