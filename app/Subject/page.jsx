"use client"
import React, { useEffect ,useState } from "react";
import SidebarPro from "@/Provider/SidebarPro";
import { Card , CardContent , CardDescription  ,CardTitle  } from "@/components/ui/card";
import { Item , ItemDescription , ItemContent  , ItemTitle, ItemActions} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { sub } from "date-fns";
import axios from "axios";
const page = () => {
    const router = useRouter()
    const [Fetchdata, setFetchdata] = useState([])
    const fetchdata = async ()=>{
        const res = await fetch("api/subject")
        const response =await res.json()
        console.log(response.data)
        setFetchdata(response.data)
    }
    useEffect(() => {
        fetchdata()
    }, [])
    const gotosetup = ()=>{
        router.push("/setup")
    }
    const handleremove = async (it)=>{
        console.log(it)
        const con = confirm(`Do you want to remove ${it.subject} (${it.code})  ? (you cannot restore it )`)
        if(con){
            const res = await axios.delete("api/subject",{
                data: {
                    subject : it.subject,
                    code : it.code
                }
            });
            fetchdata()
        }
    }
  return (
    <SidebarPro title={"Subjects"}>
         <Card className={"text-center font-bold text-2xl m-1"}>
          <CardTitle>
            Subject Registered
          </CardTitle>
        </Card>
        <Button onClick={gotosetup}>Add Subject</Button>
      <div className="p-2.5 flex flex-col gap-3">
        {!Fetchdata ? (
          <>
            <div>unable to fetch data</div>
          </>
        ) : (
          Fetchdata.map((sub) => {
            return <Item variant="outline">
              <ItemContent>
                <ItemTitle>{sub.code}</ItemTitle>
                <ItemDescription>{sub.subject}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button onClick={()=>handleremove(sub)}>Remove</Button>
              </ItemActions>
            </Item>;
          })
        )}
      </div>
    </SidebarPro>
  );
};

export default page;
