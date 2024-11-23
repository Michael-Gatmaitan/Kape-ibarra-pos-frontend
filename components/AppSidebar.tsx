import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from './ui/sidebar'
import { ChartBarStacked, Home, Logs, LucideProps, Milk, Monitor, NotebookPen, Plus, ShoppingBasket, User, Users } from 'lucide-react'
import Link from 'next/link'

import SwitchMode from './SwitchMode'
import LogoutButton from './sidebar-items/LogoutButton'
import React, { ForwardRefExoticComponent, RefAttributes } from 'react'
import ProfileCard from './sidebar-items/ProfileCard'
import { getUserPayloadServer } from '../actions/serverActions';
import { ScrollArea } from './ui/scroll-area'
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'

interface IItem {
  title: string,
  url: string,
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
}
interface ISidebarItems {
  admin: IItem[],
  create: IItem[],
  cashier: IItem[],
}


const items: ISidebarItems = {
  admin: [{
    title: "Home",
    url: "/",
    icon: Home
  }, {
    title: "Products",
    url: "/view/products",
    icon: ShoppingBasket
  }, {
    title: "Category",
    url: "/view/categories",
    icon: ChartBarStacked
  }, {
    title: "Raw materials",
    url: "/view/raw-materials",
    icon: Milk
  }, {
    title: "Users / employees",
    url: "/view/users",
    icon: User
  }, {
    title: "Customer accounts",
    url: "/view/customers",
    icon: Users
  }, {
    title: "Transaction",
    url: "/view/transactions",
    icon: NotebookPen
  }],

  create: [{
    title: "Create product",
    url: "/create/product",
    icon: Plus
  }, {
    title: "Create category",
    url: "/create/category",
    icon: Plus
  }, {
    title: "Create raw materials",
    url: "/create/raw-material",
    icon: Plus
  }],

  cashier: [{
    title: "Counter",
    url: "/u/cashier/counter",
    icon: Monitor
  }, {
    title: "List of orders",
    url: "/u/cashier/orders",
    icon: Logs
  }]
}


const AppSidebar = async () => {

  const payload = await getUserPayloadServer();
  console.log("Sidebar: payload checked");

  if (!payload?.employee?.id) {
    return (
      <nav>Nav for not logged in</nav>
    )
  }

  return (
    // <Sidebar>
    //   {/* <SidebarHeader /> */}
    //   <SidebarContent>
    //     <SidebarGroup>
    //       <SidebarGroupLabel>Track</SidebarGroupLabel>
    //       <SidebarGroupAction>
    //         <ShoppingBasket /> Products <span className="sr-only">Products</span>
    //       </SidebarGroupAction>
    //     </SidebarGroup>
    //   </SidebarContent>
    //   {/* <SidebarFooter /> */}
    // </Sidebar>
    <Sidebar className='z-50' variant='sidebar'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {/* <ToggleSidebar /> */}
            <ProfileCard />
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarMenu>
          <SidebarMenuItem>
            <SwitchMode />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea>

          {/* Group for track / ADMIN */}
          {payload.roleName === "Admin" &&
            (
              <React.Fragment>
                <CustomSidebarGroup
                  label="Admin / Track"
                  items={items.admin}
                />
                <CustomSidebarGroup label='Create' items={items.create} />
              </React.Fragment>)
          }

          {/* Section for creating */}

          <SidebarSeparator />

          {/* Group for CASHIER */}
          {(payload.roleName === "Admin" || payload.roleName === "Cashier") &&
            <CustomSidebarGroup label='Cashier' items={items.cashier} />
          }

        </ScrollArea>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <LogoutButton />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

const CustomSidebarGroup = (props: { label: string, items: IItem[] }) => {
  const { label, items } = props;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(item => (
            <CustomSideBarMenuButton key={item.url} item={item} />
          ))}

        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

const CustomSideBarMenuButton = (props: { item: IItem }) => {
  const { item } = props;
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link href={item.url}>
          <item.icon />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export default AppSidebar
