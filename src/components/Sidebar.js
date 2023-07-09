import Link from "next/link";
import React from "react";
import {
  FaHandshake,
  FaUser,
  FaUserFriends,
  FaUserGraduate,
} from "react-icons/fa";
import { AiFillShopping, AiFillTag } from "react-icons/ai";
import {
  RiArticleFill,
  RiCommunityFill,
  RiMiniProgramFill,
} from "react-icons/ri";
import { BsCalendar2EventFill } from "react-icons/bs";
import { MdCategory } from "react-icons/md";
import { useAppContext } from "@/context/AppContext";
import OutsideClickHandler from "react-outside-click-handler";
import { useRouter } from "next/router";

const navigations = [
  {
    title: "tenant",
    path: "/admin/tenant",
    icon: <FaUser size={14} />,
  },
  {
    title: "tagline",
    path: "/admin/tagline",
    icon: <AiFillTag size={14} />,
  },
  {
    title: "program",
    path: "/admin/program",
    icon: <RiMiniProgramFill size={14} />,
  },
  {
    title: "mentor",
    path: "/admin/mentor",
    icon: <FaUserGraduate size={14} />,
  },
  {
    title: "team",
    path: "/admin/team",
    icon: <FaUserFriends size={14} />,
  },
  {
    title: "partner",
    path: "/admin/partner",
    icon: <FaHandshake size={14} />,
  },
  {
    title: "category",
    path: "/admin/category",
    icon: <MdCategory size={14} />,
  },
  {
    title: "product",
    path: "/admin/product",
    icon: <AiFillShopping size={14} />,
  },
  {
    title: "event",
    path: "/admin/event",
    icon: <BsCalendar2EventFill size={14} />,
  },
  {
    title: "community",
    path: "/admin/community",
    icon: <RiCommunityFill size={14} />,
  },
  {
    title: "article",
    path: "/admin/article",
    icon: <RiArticleFill size={14} />,
  },
];

function Sidebar() {
  const router = useRouter();
  const [state, dispatch] = useAppContext();
  const currentPage = router.pathname.split("/")[2];

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        dispatch({
          type: "SET_SIDEBAR_IS_OPEN",
          payload: false,
        });
      }}
    >
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform sm:translate-x-0 bg-white border-r border-gray-200  dark:bg-gray-800 dark:border-gray-700 ${
          state.isOpenSidebar ? "" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-1 font-medium">
            {navigations.map((data, i) => (
              <li key={i}>
                <Link
                  href={data.path}
                  className={`flex gap-5 px-4 py-2 items-center transition-all rounded-lg text-sm capitalize text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white ${
                    currentPage === data.title
                      ? "bg-gray-100 text-primary-100"
                      : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-md flex justify-center items-center  ${
                      currentPage === data.title
                        ? "bg-primary-100 text-white"
                        : "bg-primary-200"
                    }`}
                  >
                    {data.icon}
                  </div>
                  {data.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </OutsideClickHandler>
  );
}

export default Sidebar;
