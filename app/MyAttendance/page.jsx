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
    const res = await fetch("/api/subject");
    const response = await res.json();
    console.log(response)
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
                <ItemTitle>{sub.subject}</ItemTitle>
              </ItemContent>
              <ItemContent>
                <div className="flex flex-col gap-1 justify-center items-center">
                  <span>{sub.totalclasses ==0 ? <><div>0</div></> : <><div>{  Math.ceil(sub["attended classes"]/sub.totalclasses*100)}%</div></>}</span>
                  <span>{sub.totalclasses ==0 ? <><div></div></> : <><div>{sub["attended classes"]} /{sub.totalclasses}</div></>}</span>
                </div>
              </ItemContent>
            </Item>;
          })
        )}
      </div>
    </SidebarPro>
  );
};

export default page;
