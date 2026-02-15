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

  console.log(timetable);
  return <>
      {timetable.length == 0 ?<><div>no class marked</div></> : 
    <div className="flex w-full max-w-md flex-col gap-6">
      {timetable.length ==0 ? <><div>Set your timetable</div></> : timetable.map((item , i) => {
        return (
          <Item variant="outline" key={i}>
            <ItemContent>
              <ItemTitle>{item.time}</ItemTitle>
              <ItemDescription>
                {item.subject}
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="outline" size="sm" onClick={()=>{console.log("present")}}>
                {item.status == 'absent' ? "Absent" : "Present"}
              </Button>
            </ItemActions>
          </Item>
        );
      })}
    </div>
  }
  </>

}
