export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/admin",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/admin/analytics",
    label: "Analytics",
  },
  {
    imgURL: "/assets/icons/location.svg",
    route: "/admin/museums",
    label: "Museums",
  },
  {
    imgURL: "/assets/icons/eye.svg",
    route: "/admin/scan-ticket",
    label: "Scan Ticket",
  },
  {
    imgURL: "/assets/icons/calendar.svg",
    route: "/admin/holidays",
    label: "Holidays",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/admin/profile",
    label: "Profile",
  },
];

export const publicHolidays = [
  { date: "2024-01-01", description: "New Year's Day" },
  { date: "2024-01-26", description: "Republic Day" },
  { date: "2024-03-25", description: "Holi" }, 
  { date: "2024-08-15", description: "Independence Day" },
  { date: "2024-09-17", description: "Ganesh Chaturthi" }, 
  { date: "2024-10-02", description: "Gandhi Jayanti" },
  { date: "2024-12-25", description: "Christmas Day" },
  // Add other public holidays here as needed
];

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];
