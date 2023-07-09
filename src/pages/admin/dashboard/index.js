import CardCount from "@/components/cards/CardCount";
import axios from "@/pages/api/axios";
import DashboardLayout from "@/pages/layouts/DashboardLayout";
import React, { useEffect, useState } from "react";

function DashboardPage() {
  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    const getSummary = async () => {
      try {
        const response = await axios.get("content/summary");

        setSummaryData(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    getSummary();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="font-medium text-xl">Dashboard</h1>

      <div className="flex flex-wrap gap-5">
        {summaryData &&
          summaryData.map((data, i) => (
            <CardCount
              key={i}
              count={data.total_rows}
              title={data.table_name}
            />
          ))}
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;
