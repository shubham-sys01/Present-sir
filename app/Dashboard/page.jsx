import React from "react";
import SidebarPro from "@/Provider/SidebarPro";
const page = ({ children }) => {
  
  return (
    <SidebarPro title="Dashboard">
      <div>this home page</div>
    </SidebarPro>
  );
};
export const dynamic = "force-dynamic";

export default page;
