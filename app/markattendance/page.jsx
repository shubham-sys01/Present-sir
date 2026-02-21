"use client"
import React from "react";
import SidebarPro from "@/Provider/SidebarPro";
import { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Timetable } from "@/components/makattendancetable";
const page = () => {
  const [loading, setLoading] = useState(false)
  const date = new Date();
  const day = date.toLocaleDateString("en-IN", {
    weekday: "long"
  });
  return (
    <SidebarPro title="Mark Attendance">
      <div className="flex-col flex justify-center items-center p-2 gap-4">
        <Card size="sm" className=" w-full max-w-sm  p-1.5">
          <CardHeader className={"p-1"}>
            <CardTitle className={"text-2xl "}>Date : <span className="font-semibold text-xl">{date.toLocaleDateString("en-IN")}</span></CardTitle>
          </CardHeader>
        </Card>
        <Timetable day={day} />
      </div>
    </SidebarPro>
  );
};

export default page;
