"use client";
import { useState, useContext } from "react";
import { usercontext } from "@/Provider/usercontext";
import React from "react";
import SidebarPro from "@/Provider/SidebarPro";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const page = () => {
  const { username, email } = useContext(usercontext);
  return (
    <SidebarPro title={"Analytics"}>
      <div className="p-2.5"> 
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {`Analytics -  ${username}`}
        </h2>

      </div>
    </SidebarPro>
  );
};

export default page;
