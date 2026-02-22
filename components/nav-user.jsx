"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import {deleteCookie} from "@/lib/logout"
import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavUser({
  user,
}) {
  const router = useRouter()
  const { isMobile } = useSidebar()
  const handlelogout= async ()=>{
    console.log("logout")
    await deleteCookie("token")
    router.push("/")
    
  }
  console.log(user)
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAM1BMVEX///+ZmZmVlZXZ2dmQkJDk5OS8vLzo6OjS0tK1tbXz8/P7+/v39/fs7OykpKTHx8eqqqq8lpdBAAAEZUlEQVR4nO1b2ZasIAyUiCLt+v9fe1unZ7pdoBJA23Mu9S4WIQkhS1FkZGRkZGRkZGRkZGRcgO7R98ZUVWVM/+i+zeYJ09R2GhS9oIbJ1o35Hp9HNQ5aP4lsQFrrYaweX6BU1QPpHaE/aBrq6lpG/ag8hP4kpsa+KNqLKFkFGb14KdtfQslMmsfoJa7pfLXv2FL6kNa5bqId98bGoEXjiYplpgBKM/R0mmo12OLctM4RVmfDKT1B9gRWlVTBd6xUcmdaxjH6QZmWUxMpph9Qcz9OaVk1Eh/uhU7GqklFSaWTVZlMTgurJNpesX71G3kykMAztAxGWtmxKctmtApLlVT0/dxCP/6MAj72XuEogmwsqRH9QttNvGQskhaNcZwM+AEdeWno/XVUzNCCWIXUYVhpwBHSFHM5o8MbHO+ox+D/LuYAO8CJnOG3QV+GWyCwPJ8fLMGnwRZo/LtVk+9jFDmHvnGQlnttqEe6Hsap97sDdALg7APdgvUuCuPIU7SqB5wUSKs80PchohqBMx/QAmf4KrRRKP4aXZtyThW69eBG0XWg5YEV2ieOa2FkX0s5oduLIylEynVzOlHBUC36+BRJzw+uiBUdx6xS+xsgqViXwFliA8azCmgEdL5P+5NxQmGwwubHeOprWajAeKiDmBZF0px9bQC9sUJvXc67mmSeipW18+lpi9VcMSz4E93EWdJn0tilzAtMklAd+vPXos4DBMHUL0Q+nWHOP3CwYicjJTEVeiEBVvwEqcQn8ElRvVOLrmYntNwPxwPA6/hj3WkjrBLfUO+PJVeygNTTL6vRvMTVmZGRobqC1JznGGw9jrUdhBUAESnG1bddnptcjCAlWZ82kHx6hvWRXmr+K8wdAdxyl4gUz3mSsmX/2MUKbdeXVvEkJnGejGuGyPqjBMugJbpm8IVM2/zrHgaHGqILGabLBlbdAPpRWZLDH+RRzUykgiy8MMjzhsOSUpQ3UheGw17vKSr5+CIG4cPB88SS5iU8mRLhE8v9kpQX7JwnSNLHqCs7oQNSXcnWcsQJ4s0tcHgGcYLD5dODKoiOOqY4FXTsqYSOJflih0ajA0sq3eFiAVJPKCiHqALWOXrjBtekD7RKh+zwIKYKrKfMOAg7guogu8s0pnS481WBxbVdwSim9JtssW3ai8I5Fe12rVBV2BYhI1Rqv8PgRsu1VoU7hBlrpxDRMLEubMf1OKw9TERhe20zcV1GqwAman/tdA6pqGaJlSWnIxXXVrJShWSkYhtwPh9JcT1i79RsfKvSR1MX1WUE3i5hSNAa+3HBb5M+ErxXSdIYe8dGwXStpwundI2eN2w+vWebbipWKeU0o4xtR5+RuPU7RZP8cMLE0R3HCYooIyTdnDWlEjyiQmeOGYUN86hTh3mKW449zZANiKkrBsRm8Efp9FWjdAst5tBhfR2lBfN4ppsXfWE8c8FrkFVtz5Loa4OsL9xt5PcPy3B0daPh6IyMjIyMjIyMjIyM/wD/AKrlLaHofErWAAAAAElFTkSuQmCC"} alt={user.username} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.username}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAM1BMVEX///+ZmZmVlZXZ2dmQkJDk5OS8vLzo6OjS0tK1tbXz8/P7+/v39/fs7OykpKTHx8eqqqq8lpdBAAAEZUlEQVR4nO1b2ZasIAyUiCLt+v9fe1unZ7pdoBJA23Mu9S4WIQkhS1FkZGRkZGRkZGRkZGRcgO7R98ZUVWVM/+i+zeYJ09R2GhS9oIbJ1o35Hp9HNQ5aP4lsQFrrYaweX6BU1QPpHaE/aBrq6lpG/ag8hP4kpsa+KNqLKFkFGb14KdtfQslMmsfoJa7pfLXv2FL6kNa5bqId98bGoEXjiYplpgBKM/R0mmo12OLctM4RVmfDKT1B9gRWlVTBd6xUcmdaxjH6QZmWUxMpph9Qcz9OaVk1Eh/uhU7GqklFSaWTVZlMTgurJNpesX71G3kykMAztAxGWtmxKctmtApLlVT0/dxCP/6MAj72XuEogmwsqRH9QttNvGQskhaNcZwM+AEdeWno/XVUzNCCWIXUYVhpwBHSFHM5o8MbHO+ox+D/LuYAO8CJnOG3QV+GWyCwPJ8fLMGnwRZo/LtVk+9jFDmHvnGQlnttqEe6Hsap97sDdALg7APdgvUuCuPIU7SqB5wUSKs80PchohqBMx/QAmf4KrRRKP4aXZtyThW69eBG0XWg5YEV2ieOa2FkX0s5oduLIylEynVzOlHBUC36+BRJzw+uiBUdx6xS+xsgqViXwFliA8azCmgEdL5P+5NxQmGwwubHeOprWajAeKiDmBZF0px9bQC9sUJvXc67mmSeipW18+lpi9VcMSz4E93EWdJn0tilzAtMklAd+vPXos4DBMHUL0Q+nWHOP3CwYicjJTEVeiEBVvwEqcQn8ElRvVOLrmYntNwPxwPA6/hj3WkjrBLfUO+PJVeygNTTL6vRvMTVmZGRobqC1JznGGw9jrUdhBUAESnG1bddnptcjCAlWZ82kHx6hvWRXmr+K8wdAdxyl4gUz3mSsmX/2MUKbdeXVvEkJnGejGuGyPqjBMugJbpm8IVM2/zrHgaHGqILGabLBlbdAPpRWZLDH+RRzUykgiy8MMjzhsOSUpQ3UheGw17vKSr5+CIG4cPB88SS5iU8mRLhE8v9kpQX7JwnSNLHqCs7oQNSXcnWcsQJ4s0tcHgGcYLD5dODKoiOOqY4FXTsqYSOJflih0ajA0sq3eFiAVJPKCiHqALWOXrjBtekD7RKh+zwIKYKrKfMOAg7guogu8s0pnS481WBxbVdwSim9JtssW3ai8I5Fe12rVBV2BYhI1Rqv8PgRsu1VoU7hBlrpxDRMLEubMf1OKw9TERhe20zcV1GqwAman/tdA6pqGaJlSWnIxXXVrJShWSkYhtwPh9JcT1i79RsfKvSR1MX1WUE3i5hSNAa+3HBb5M+ErxXSdIYe8dGwXStpwundI2eN2w+vWebbipWKeU0o4xtR5+RuPU7RZP8cMLE0R3HCYooIyTdnDWlEjyiQmeOGYUN86hTh3mKW449zZANiKkrBsRm8Efp9FWjdAst5tBhfR2lBfN4ppsXfWE8c8FrkFVtz5Loa4OsL9xt5PcPy3B0daPh6IyMjIyMjIyMjIyM/wD/AKrlLaHofErWAAAAAElFTkSuQmCC"} alt={user.username} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.username}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <IconLogout />
              <Button onClick={handlelogout}>Log out</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
