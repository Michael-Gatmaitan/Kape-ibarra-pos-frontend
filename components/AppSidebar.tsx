import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from './ui/sidebar'
import { BadgeCent, Bell, Box, CalendarClock, ChartBarStacked, Logs, LucideProps, Milk, Monitor, NotebookPen, Plus, ShoppingBasket, User, Users, Wallet } from 'lucide-react'
import Link from 'next/link'

import SwitchMode from './SwitchMode'
import LogoutButton from './sidebar-items/LogoutButton'
import React, { ForwardRefExoticComponent, RefAttributes } from 'react'
import ProfileCard from './sidebar-items/ProfileCard'
import { getUserPayloadServer } from '../actions/serverActions';
import { ScrollArea } from './ui/scroll-area'

interface IItem {
  title: string,
  url: string,
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
}
interface ISidebarItems {
  admin: IItem[],
  create: IItem[],
  cashier: IItem[],
  barista: IItem[],
  customer: IItem[],
}


const items: ISidebarItems = {
  admin: [{
    title: "Sales report",
    url: "/",
    icon: BadgeCent
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
  }, {
    title: 'E-wallet',
    url: "/e-wallet",
    icon: Wallet
  }, {
    title: "Audit log",
    url: "/view/audit-logs",
    icon: CalendarClock
  }, {
    title: "Inventory",
    url: "/view/inventories",
    icon: Box
  }, {
    title: "Notification",
    url: "/view/notifications",
    icon: Bell
  }],

  customer: [{
    title: "Products",
    url: "/c/products",
    icon: ShoppingBasket
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
  }, {
    title: "Create new employee",
    url: "/auth/signup",
    icon: Plus
  }, {
    title: "Create batch",
    url: "/create/batch",
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
  }],

  barista: [{
    title: "Manage orders",
    url: '/u/barista/order',
    icon: Logs
  }],

  // customer: [{
  //   title: "Manage orders",
  //   url: '/u/barista/order',
  //   icon: Logs
  // }]
}


const AppSidebar = async () => {

  const payload = await getUserPayloadServer();

  if (!payload?.person?.id) {
    return (
      // <nav>Nav for not logged in</nav>
      null
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

          {payload.roleName === "customer" && (
            <CustomSidebarGroup
              label="Customer"
              items={items.customer}
            />
          )}

          {/* Group for track / ADMIN */}
          {payload.roleName === "admin" &&
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
          {(payload.roleName === "admin" || payload.roleName === "cashier") &&
            <CustomSidebarGroup label='Cashier' items={items.cashier} />
          }

          <SidebarSeparator />

          {(payload.roleName === "admin" || payload.roleName === "barista") &&
            <CustomSidebarGroup label='Barista' items={items.barista} />
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
