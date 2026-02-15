"use client";
import SidebarPro from "@/Provider/SidebarPro";
import { Card, CardTitle, CardContent, CardAction } from "@/components/ui/card";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Item, ItemContent } from "@/components/ui/item";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ItemTitle, ItemDescription, ItemActions } from "@/components/ui/item";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
const page = () => {
  const [addclass, setAddclass] = useState(false);
  const [subjects, setsubjects] = useState([]);
  const [classelem, setclasselem] = useState({
    day: "",
    subject: "",
    starttime: "",
    endtime: "",
  });
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  function convertTo12Hour(time24) {
    const [hours, minutes, seconds] = time24.split(":").map(Number);

    const period = hours >= 12 ? "PM" : "AM";

    let hour12 = hours % 12;
    if (hour12 === 0) hour12 = 12;

    return `${hour12.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${period}`;
  }

  const fetchsubjects = async () => {
    const res = await fetch("/api/attendance");
    const data = await res.json();
    setsubjects(data.data);
  };
  const router = useRouter();
  const [timetable, setTimetable] = useState([]);
  const fetchdata = async () => {
    const data = await fetch("/api/timetable");
    const res = await data.json();
    console.log(res);
    if (data.status == 401) {
      router.push("/");
    }
    setTimetable(res.data.timetable);
  };
  useEffect(() => {
    fetchdata();
    fetchsubjects();
  }, []);
  const handleadd = async (c) => {
    console.log(classelem);
    setTimetable((prev) => {
      return prev.map((item) => {
        if (item.day === classelem.day) {
          return {
            ...item,
            classes: [
              ...item.classes,
              {
                starttime: convertTo12Hour(classelem.starttime),
                endtime: convertTo12Hour(classelem.endtime),
                subject: classelem.subject,
              },
            ],
          };
        }
        return item;
      });
    });

    console.log(timetable);
  };
  const handleremove = async (item, day) => {
    console.log(item, day);
    setTimetable((prev) => {
      return prev.map((it) => {
        if (it.day === day) {
          console.log("matched");
          return {
            ...it,
            classes: it.classes.filter((cls) => {
              if (cls.subject !== item.subject) {
                return cls;
              } else {
                if (
                  cls.starttime !== item.starttime ||
                  cls.endtime !== item.endtime
                ) {
                  return cls;
                }
              }
            }),
          };
        }
        return it;
      });
    });

    console.log(timetable);
  };
  const handlesubmit = async () => {
    const conf = confirm(
      "Your timetable will be modified and cannot be restored. Continue ? ",
    );
    if (conf == false) {
      return;
    }
    const res = await axios.post("/api/timetable/settimetable", timetable);
    console.log(res);
    console.log(timetable);
    setAddclass(false);
  };
  return (
    <SidebarPro title="TimeTable">
      <div className="p-1.5">
        {!addclass ? (
          <Button onClick={() => setAddclass(true)}>Edit Timetable</Button>
        ) : (
          <Item className={"p-1.5 "}>
            <ItemContent className={"flex flex-col gap-1"}>
              <FieldGroup>
                {/* setclasselem({...classelem , "day" : e.target.value}) */}
                <Field>
                  <FieldLabel htmlFor="day">Day</FieldLabel>
                  <Select
                    id="day"
                    onValueChange={(value) => {
                      setclasselem({ ...classelem, day: value });
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {days.map((day) => {
                          return <SelectItem value={day}>{day}</SelectItem>;
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="subject">Subject</FieldLabel>
                  <Select
                    id="subject"
                    onValueChange={(value) => {
                      setclasselem({ ...classelem, subject: value });
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {subjects.map((item) => {
                          return (
                            <SelectItem value={item.subject}>
                              {item.subject}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="Start Time">Start Time</FieldLabel>
                  <Input
                    type="time"
                    id="time-picker-optional"
                    step="1"
                    defaultValue="00:00:00"
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    onChange={(e) => {
                      setclasselem({ ...classelem, starttime: e.target.value });
                    }}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="EndTime">End Time</FieldLabel>
                  <Input
                    type="time"
                    id="time-picker-optional"
                    step="1"
                    defaultValue="00:00:00"
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    onChange={(e) => {
                      setclasselem({ ...classelem, endtime: e.target.value });
                    }}
                  />
                </Field>
              </FieldGroup>
              <Button onClick={handleadd}>add class</Button>
              <Button onClick={handlesubmit}>Submit</Button>
            </ItemContent>
          </Item>
        )}
        <div className="flex flex-col gap-1">
          {timetable.map((day, i) => {
            return (
              <Card className={"p-1"} key={i}>
                <CardTitle className={"p-1"}>{day.day}</CardTitle>
                <CardContent className={"gap-1.5"}>
                  {day.classes.map((item) => {
                    return (
                      <Item variant="outline" className={"p-2 "}>
                        <ItemContent>
                          <ItemTitle>{item.subject}</ItemTitle>
                          <ItemDescription>
                            {`${item.starttime} - ${item.endtime}`}
                          </ItemDescription>
                        </ItemContent>
                        {!addclass ? (
                          <></>
                        ) : (
                          <ItemActions>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleremove(item, day.day)}
                            >
                              remove
                            </Button>
                          </ItemActions>
                        )}
                      </Item>
                    );
                  })}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </SidebarPro>
  );
};

export default page;
