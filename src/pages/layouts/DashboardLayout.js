import Sidebar from "@/components/Sidebar";
import NavbarAdmin from "@/components/navbar/NavbarAdmin";
import { useAppContext } from "@/context/AppContext";
import Head from "next/head";
import React, { useEffect } from "react";

function DashboardLayout({ children }) {
  const [state, dispatch] = useAppContext();

  useEffect(() => {
    dispatch({
      type: "SET_IS_MODAL",
      payload: false,
    });
    dispatch({
      type: "SET_SIDEBAR_IS_OPEN",
      payload: false,
    });

    setTimeout(() => {
      dispatch({
        type: "SET_MESSAGE",
        payload: { status: "", message: "" },
      });
    }, 2500);
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/icon-ibt.png/" />
        <title>Admin | Inkubator Solotechnopark</title>
        <meta
          name="description"
          content="Mengembangkan Startup dan UMKM Yang Tangguh, Inovatif dan Berdaya Saing."
        />
      </Head>

      <NavbarAdmin />
      <Sidebar />

      <main className="p-4 sm:ml-64 mt-14  dark:bg-gray-700 dark:text-white">
        {children}
      </main>
    </>
  );
}

export default DashboardLayout;
