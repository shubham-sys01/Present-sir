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
import { deleteCookie } from "@/lib/logout";
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
    day: null,
    subject: null,
    starttime: null,
    endtime: null,
  });
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [Loading, setLoading] = useState(false)
  function convertTo12Hour(time24) {
    
    if(!time24){
      alert("select time ")
      return null;
    }
    const [hours, minutes, seconds] = time24.split(":").map(Number);

    const period = hours >= 12 ? "PM" : "AM";

    let hour12 = hours % 12;
    if (hour12 === 0) hour12 = 12;

    return `${hour12.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;
  }

  const fetchsubjects = async () => {
    const res = await fetch("/api/subject");
    const data = await res.json();
    console.log(data)
    setsubjects(data.data);
  };
  const router = useRouter();
  const [timetable, setTimetable] = useState([]);
  const fetchdata = async () => {
    const data = await fetch("/api/timetable");
    const res = await data.json();
    console.log(res);
    setTimetable(res.data.timetable);
  };
  useEffect(() => {
    setLoading(true)
    fetchdata();
    fetchsubjects();
    setLoading(false)
  }, []);
  const handleadd = async (c) => {
     if(classelem.endtime == null || classelem.day == null || classelem.subject == null || classelem.starttime == null){
      alert("fill all the details")
      return ;
    }
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
                code : classelem.code
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
    if(classelem.endtime == null || classelem.day == null || classelem.subject == null || classelem.starttime == null){
      alert("fill all the details")
      return ;
    }
    const conf = confirm(
      "Your timetable will be modified and cannot be restored. Continue ? ",
    );
    if (conf == false) {
      return;
    }
    try {
      const res = await axios.post("/api/timetable/settimetable", timetable);
    } catch (error) {
      console.log(error)
       await deleteCookie("token")
    }
    
    console.log(timetable);
    setAddclass(false);
  };
  return (
    <SidebarPro title="TimeTable">
      <div className="p-1.5 ">
        {!addclass ? (
          <Button onClick={() => setAddclass(true) } className={"my-1.5"}>Edit Timetable</Button>
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
                  <FieldLabel htmlFor="code">Subject Code</FieldLabel>
                  <Select
                    id="subject"
                    onValueChange={(value) => {
                      setclasselem({ ...classelem, code: value });
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {subjects.map((item) => {
                          return (
                            <SelectItem value={item.code}>
                              {item.code}
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
        {Loading ? <><Button disabled size="sm">
        <Spinner data-icon="inline-start" />
        Loading...
      </Button></> : 
        <div className="flex flex-col gap-2">
          {timetable.map((day, i) => {
            return (
              <Card className={"p-2"} key={i}>
                <CardTitle className={"p-2  rounded-lg w-fit "}>{day.day}</CardTitle>
                <CardContent className={" flex flex-col gap-2"}>
                  {day.classes.length == 0 ?  <><div>No Classes Marked</div></>: day.classes.map((item) => {
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
        </div>}
      </div>
    </SidebarPro>
  );
};

export default page;
