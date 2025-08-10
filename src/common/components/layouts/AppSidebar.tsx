"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/common/context/SidebarContext";
import { MdOutlinePayments, MdOutlineSpaceDashboard } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";

type NavItem = {
  name: string;
  icon?: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string }[];
};

const navItems: NavItem[] = [
  {
    icon: <MdOutlineSpaceDashboard />,
    name: "Sales",
    subItems: [
      { name: "Sales Dashboard", path: "/sales" },
      { name: "Point of Sales", path: "/point-of-sales" },
      { name: "Calender", path: "/calender" },
      { name: "Kanban", path: "/kanban" },
    ],
  },
  {
    icon: <MdOutlinePayments />,
    name: "Payment",
    subItems: [{ name: "Product", path: "/product" }],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const renderMenuItems = (navItems: NavItem[], menuType: "main") => (
    <ul className="flex flex-col gap-3">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-base font-medium ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "text-[#d1e1f8]"
                  : "text-[#d1e1f8] group-hover:text-white"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={` ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "text-[#839de9]"
                    : "text-[#d1e1f8] group-hover:text-white"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`text-[#d1e1f8] group-hover:text-white`}>
                  {nav.name}
                </span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <FiChevronDown
                  className={`ml-auto h-5 w-5 text-[#d1e1f8] transition-transform duration-200 group-hover:text-white ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "text-brand-500 rotate-180"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`group flex w-full items-center gap-3 rounded-lg px-3 py-1 text-sm font-medium ${
                  isActive(nav.path)
                    ? "text-[#d1e1f8]"
                    : "text-[#d1e1f8] group-hover:text-white"
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "text-[#4e73df]"
                      : "text-gray-500 group-hover:text-gray-700"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 ml-3 space-y-1">
                <div className="rounded-md bg-white px-3 py-2">
                  {nav.subItems.map((subItem) => (
                    <li key={subItem.name}>
                      <Link
                        href={subItem.path}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                          isActive(subItem.path)
                            ? "font-semibold text-[#4e73df]"
                            : "text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {subItem.name}
                        {/* <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "bg-[#dde9ff]"
                                : "bg-[#ecf3ff] group-hover:bg-[#dde9ff]"
                            } block rounded-full px-2.5 py-0.5 text-xs font-medium uppercase text-[#465fff]`}
                          >
                            new
                          </span>
                        )}
                      </span> */}
                      </Link>
                    </li>
                  ))}
                </div>
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => path === pathname;
  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    // Check if the current path matches any submenu item
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : null;
      items?.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    // If no submenu item matches, close the open submenu
    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-50 mt-16 flex h-screen flex-col border-r border-gray-200 bg-[#4e73df] px-5 text-gray-900 transition-all duration-300 ease-in-out lg:mt-0 ${
        isExpanded || isMobileOpen
          ? "w-[250px]"
          : isHovered
            ? "w-[250px]"
            : "w-[90px]"
      } ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex py-8 ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src="/images/logo/logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <Image
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <Image
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 flex text-xs leading-[20px] text-gray-400 uppercase ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  //   <HorizontaLDots />
                  <hr />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
