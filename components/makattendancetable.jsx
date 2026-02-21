"use client";
import { Button } from "@/components/ui/button";
import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { useEffect, useState } from "react";
import axios from "axios";

export function Timetable({ day }) {
  const [timetable, settimetable] = useState([]);

  // if (day.toLowerCase() == "sunday") {
  //   return (
  //     <>
  //       <div>no class</div>
  //     </>
  //   );
  // }
  const fetchdata = async () => {
    console.log(day)
    const res = await fetch("/api/timetable", {
      method: "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(({ day: day })),
    });
    console.log(res)
    const data = await res.json();
    console.log(data);

    settimetable(data.data[0].classes)
  };

  useEffect(() => {
    fetchdata();
  }, [day]);

  const handlepresent = async (it)=>{
    console.log(it)
    const res = await axios.patch("api/subject",{subject : it.subject , code : it.code ,status : true} )
    console.log(res)

  }
  const handleabsent = async (it)=>{
    console.log(it)
    const res = await axios.patch("api/subject",{subject : it.subject , code : it.code , status :false})
    console.log(res)

  }
  return <>
      {timetable.length == 0 ?<><div>no class marked</div></> : 
    <div className="flex w-full max-w-md flex-col gap-6">
      {timetable.length ==0 ? <><div>Set your timetable</div></> : timetable.map((item , i) => {
        return (
          <Item variant="outline" key={i}>
            <ItemContent>
              <ItemTitle>{item.subject}</ItemTitle>
              <ItemDescription>
                {item.starttime} - {item.endtime}
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="outline" size="sm" onClick={()=>handlepresent(item)}>
                Mark Present
              </Button>
              <Button variant="outline" size="sm" onClick={()=>handleabsent(item)}>
                Absent
              </Button>
            </ItemActions>
          </Item>
        );
      })}
    </div>
  }
  </>

}
