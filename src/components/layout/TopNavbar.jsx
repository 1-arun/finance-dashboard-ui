import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import RoleSwitcher from "@/components/dashboard/RoleSwitcher";
import ThemeToggle from "@/components/dashboard/ThemeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

const TopNavbar = () => {
  return (
    <header className="h-14 border-b border-border bg-card/80 backdrop-blur-sm flex items-center justify-between px-4 gap-4 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="shrink-0" />
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-9 w-[220px] h-9 bg-secondary/50"
            readOnly
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <RoleSwitcher />
        <ThemeToggle />
        <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all">
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
            AK
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default TopNavbar;
