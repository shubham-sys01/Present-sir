"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { Item } from "@/components/ui/item";
import { ItemContent } from "@/components/ui/item";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FieldLabel } from "@/components/ui/field";
import { Field } from "@/components/ui/field";
import { FieldDescription } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ItemTitle } from "@/components/ui/item";
import { ItemDescription } from "@/components/ui/item";
import { ItemActions } from "@/components/ui/item";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
const page = () => {
  
  const [subjects, setSubjects] = useState([]);
  const [code, setscode] = useState("")
  const [subject, setname] = useState("")
  const router = useRouter()
  const addsubject = (e)=>{
    e.preventDefault()
    console.log({code , subject})
    setSubjects((prev)=>{
        
        if(prev){
            return [...prev ,{code , subject}]

        }
        return [{code , subject}]
    })
    setscode("")
    setname("");
  }
  const removeitem = (item)=>{
    console.log(item)
    console.log(subjects.filter(i=>{
            return i.code != item.code
        }))
    setSubjects(prev=>{
        return prev.filter(i=>{
           return i.code != item.code
        })
    })
  }
  const handleconfirm = async ()=>{
    const res = await axios.post("/api/subject",subjects)
    if(res.status == 200){
      router.push("/Dashboard")
    }
  }
  return (
    <div>
      <Card className={"m-2"}>
        <CardTitle className={"text-center font-bold text-xl"}>
          Enter the Subject you want to track
        </CardTitle>
      </Card>
      <card className={"m-2 my-3"}>
        <form className="p-3 flex gap-2 flex-col">
            <Field>
          <FieldLabel htmlFor="Code">Subject Code</FieldLabel>
          <Input id="Code" placeholder="MVJXXCSXXX" value={code} onChange={(e)=>{setscode(e.target.value)}}/>
          <FieldDescription>
            Course code provided by the college
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="subjectname">Subject Name</FieldLabel>
          <Input id="subjectname" onChange={(e)=>{setname(e.target.value)}} value={subject} placeholder="Computer Networks" />
          <FieldDescription>Name or title of the subject</FieldDescription>
        </Field>
        <Button onClick={addsubject}> ADD</Button>
        </form>
      </card>
      {subjects?.length == 0  ? (<div>Add the subjects </div>) :
        <div className="p-2 gap-1.5 flex flex-col">
        <h3>Subjects :</h3>
        {subjects?.map((item , i)=>{
        return <Item key={i} variant="outline">
            <ItemContent>
                <ItemTitle>Subject Code</ItemTitle>
                <ItemDescription>{item.code}</ItemDescription>
                <ItemTitle>Subject Name</ItemTitle>
                <ItemDescription>{item.subject}</ItemDescription>
            </ItemContent>
            <ItemActions>
                <Button onClick={()=>{removeitem(item)}}>Remove</Button>
            </ItemActions>
            </Item>
      })}
      <Button onClick={handleconfirm}>Confirm</Button>
      </div>
      }
      
    </div>
  );
};

export default page;
