"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // ...existing code...

import {
  LayoutDashboard,
  Sprout,
  DollarSign,
  AlertTriangle,
  Settings,
  LogOut,
  User,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/farmer/dashboard", icon: LayoutDashboard },
  { name: "My Farms", href: "/farmer/farm", icon: Sprout },
  { name: "Loans", href: "/farmer/loans", icon: DollarSign },
  { name: "Profile", href: "/farmer/profile", icon: User },
  { name: "Weather Alerts", href: "/farmer/alerts", icon: AlertTriangle },
];

const bottomNav = [
  { name: "Settings", href: "/farmer/settings", icon: Settings },
  { name: "Logout", href: "/logout", icon: LogOut },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">AgriFin</h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-2 text-sm font-medium rounded-md",
                pathname === item.href
                  ? "bg-agri-50 text-agri-700"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-gray-200">
        {bottomNav.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md"
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
