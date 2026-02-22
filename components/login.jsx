"use client"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { usercontext } from "@/Provider/usercontext";
export   function LoginForm({ className, ...props }) {
  const {setuser } = useContext(usercontext)
    const [formdata, setFormdata] = useState({})
    const router = useRouter()
    const handlesubmit =async (e)=>{
        e.preventDefault();
        const res = await axios.post("/api/login",formdata)
        
        console.log(res)

        if(res.data.status == false){
          alert(res.data.message)
          return ;
        }
        
        setuser({username : res.data.username , email :res.data.email})
        console.log(res.data.message)
        if(res.data.firstlogin){
          console.log("redirect done");
          router.push("/setup")
        }
        else{
          console.log("redirect done")
          router.push("/Dashboard")
        }
    }
    // if()
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  name = "email"
                  required
                  onChange={(e)=>{setFormdata((prev)=>({...prev,[e.target.name]:e.target.value}))}}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input id="password" type="password" required  name="password"
                onChange={(e)=>{setFormdata((prev)=>({...prev,[e.target.name]:e.target.value}))}}/>
              </Field>
              <Field>
                <Button type="submit" onClick= {handlesubmit}>Login</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/Signup">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
