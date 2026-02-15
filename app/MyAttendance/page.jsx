"use client";
import React, { useEffect, useState } from "react";
import SidebarPro from "@/Provider/SidebarPro";
import { Calendar } from "@/components/ui/calendar";
import { Item } from "@/components/ui/item";
import { ItemContent, ItemTitle, ItemDescription } from "@/components/ui/item";
import { Card , CardTitle} from "@/components/ui/card";
const page = () => {
  const [data, setdata] = useState(null);
  const fetchdata = async () => {
    const res = await fetch("/api/attendance");
    const response = await res.json();
    setdata(response.data);
  };
  useEffect(() => {
    fetchdata();
  },[]);
  console.log(data)
  return (
    <SidebarPro title={"MY Attendance"}>
        <Card className={"text-center font-bold text-2xl m-1"}>
          <CardTitle>
            Subjectwise Attendance
          </CardTitle>
        </Card>
      <div className="p-2.5 flex flex-col gap-3">
        {!data ? (
          <>
            <div>unable to fetch data</div>
          </>
        ) : (
          data.map((sub) => {
            return <Item variant="outline">
              <ItemContent>
                <ItemTitle>{sub.code}</ItemTitle>
                <ItemDescription>{sub.subject}</ItemDescription>
              </ItemContent>
            </Item>;
          })
        )}
      </div>
    </SidebarPro>
  );
};

export default page;
