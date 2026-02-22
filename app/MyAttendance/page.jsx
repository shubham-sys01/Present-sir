"use client";
import React, { useEffect, useState } from "react";
import SidebarPro from "@/Provider/SidebarPro";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Item } from "@/components/ui/item";
import { ItemContent, ItemTitle, ItemDescription } from "@/components/ui/item";
import {
  Card,
  CardTitle,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
const page = () => {
  const [data, setdata] = useState(null);
  const [Loading, setLoading] = useState(false);
  const fetchdata = async () => {
    setLoading(true);
    const res = await fetch("/api/subject");
    const response = await res.json();
    console.log(response);
    setdata(response.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchdata();
  }, []);
  console.log(data);
  return (
    <SidebarPro title={"MY Attendance"}>
      <Card className={"text-center font-bold text-2xl m-1"}>
        <CardTitle>Subjectwise Attendance</CardTitle>
      </Card>
      {Loading ? (
        <>
        <div className="absolute top-[50%] left-[50%] bg-[#00000033] p-7 -translate-y-1/2  -translate-x-1/2  rounded-3xl ">
        <Spinner/>
      </div>
        </>
      ) : (
        <div className="p-2.5 flex flex-col gap-3">
          {!data ? (
            <>
              <div>unable to fetch data</div>
            </>
          ) : (
            data.map((sub) => {
              return (
                <Card className="@container/card">
                  <CardHeader>
                    <CardDescription>{sub.subject}</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                      {Math.ceil(
                        (sub["attended classes"] / sub.totalclasses) * 100,
                      ).toString()}
                      %
                    </CardTitle>
                    <CardAction>
                      <Badge variant="outline" className={"p-2"}>
                        <div
                          className={` h-3 w-3 rounded-full ${
                            Math.ceil(
                              (sub["attended classes"] / sub.totalclasses) *
                                100,
                            ) < 75
                              ? "bg-red-500"
                              : "bg-green-500"
                          }`}
                        ></div>
                      </Badge>
                    </CardAction>
                  </CardHeader>
                  <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                      Total classes : {sub.totalclasses}
                    </div>
                    <div className="">
                      Totended classes : {sub["attended classes"]}
                    </div>
                  </CardFooter>
                </Card>
              );
            })
          )}
        </div>
      )}
    </SidebarPro>
  );
};

export default page;
