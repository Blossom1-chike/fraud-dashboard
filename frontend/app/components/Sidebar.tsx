"use client";
import Link from "next/link";
import { NAV_ITEMS } from "../constants/navItems";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-[250px] bg-sidebar py-8 px-8 shrink-0 flex flex-col">
      <div className="flex items-center gap-[9px] mb-[34px] px-[6px]">
        <div className="w-[26px] h-[26px] rounded-lg bg-sidebar-soft flex items-center justify-center text-sm">
          🛡️
        </div>

        <span className="font-serif text-bg text-[16.5px] font-semibold">
          FraudShield AI
        </span>
      </div>

      <aside className="flex flex-col gap-3">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.key;
          return (
            <Link
              href={`/${item.key}`}
              key={item.key}
              className={`flex items-center gap-[9px] w-full rounded-[9px] px-3 py-[9px] text-left text-[13.5px] font-sans transition-colors ${
                active
                  ? "bg-white/10 text-bg font-medium opacity-100"
                  : "bg-transparent text-sidebar-soft font-normal opacity-75 hover:opacity-100"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </aside>

      <div className="mt-auto pt-5 border-t border-white/10 flex items-center gap-[9px]">
        <div className="w-[30px] h-[30px] rounded-full bg-mint flex items-center justify-center text-white text-[12.5px] font-semibold">
          BA
        </div>

        <div>
          <div className="text-bg text-[12.5px] font-medium">B. Adeyemi</div>

          <div className="text-sidebar-soft text-[10.5px] opacity-70">
            Fraud Analyst
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
