"use client";
import { useState, useContext, useEffect } from "react";
import { usercontext } from "@/Provider/usercontext";
import React from "react";
import SidebarPro from "@/Provider/SidebarPro";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { Attendancechart } from "@/components/attendancetrendchart";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { totalattendance } from "../utils/dashboardfunctions";
const page = () => {
  const [loading, setLoading] = useState(false)
  const [details, setdetails] = useState(null)
  const [attendancedata, setAttendancedata] = useState()
  const { username, email } = useContext(usercontext);
  const fetchdata = async ()=>{
    setLoading(true)
    const res = await axios.get("/api/subject")
    console.log(res)
    console.log(totalattendance(res.data))
    setdetails(totalattendance(res.data))
    setAttendancedata(res.data)
    
    setLoading(false)
  }
  useEffect(() => {
    fetchdata()
    
  }, [])
  
  return (
    <SidebarPro title={"Dashboard"}>
      {loading ? <><Spinner/></> : 
      <div className="p-2.5 flex flex-col gap-2"> 
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {`Welcome Back`} <span className="text-4xl"> { username }!</span>
        </h2>
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Total Attendance</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {Math.ceil((details?.attendedclass / details?.totalclass)*100)==NaN ? "--" : Math.ceil((details?.attendedclass / details?.totalclass)*100) }%
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  --
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Total classes : {details?.totalclass}
              </div>
              <div className="text-muted-foreground">
                Across all subjects this semester
              </div>
            </CardFooter>
          </Card>
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Classes Attended</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {details?.attendedclass}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingDown />
                  +5
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                5 more than last month<IconTrendingDown className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Consistency improving
              </div>
            </CardFooter>
          </Card>
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Classes Missed</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {details?.totalclass - details?.attendedclass}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  -3
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Reduced absentee rate<IconTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Better discipline maintained
              </div>
            </CardFooter>
          </Card>
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Risk Status</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {details?.zone}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  75% Required
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Above minimum requirement
                <IconTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Maintain current pace
              </div>
            </CardFooter>
          </Card>
        </div>
        
      </div>
      }
    </SidebarPro>
  );
};

export default page;
