import React, { useState, useEffect, useCallback } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(3); // Default to all months

  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/stats?month=${selectedMonth}`
      );
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch statistics:", error);
    }
  }, [selectedMonth]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  return (
    <div className="h-screen flex flex-col p-8">
      <h1 className="text-3xl font-bold mb-4">Statistics</h1>
      <div className="flex space-x-4 mb-4">
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="border p-2 bg-black text-white rounded-lg"
        >
          <option value={0}>All</option>
          <option value={1}>January</option>
          <option value={2}>February</option>
          <option value={3}>March</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
        </select>
      </div>

      {stats ? (
        <div className="flex ">
          <div className="flex">
            <div className="mb-8 ">
              <h2 className="text-2xl font-bold mb-4">General Stats</h2>
              <div className=" p-4 rounded shadow">
                <p>
                  <strong>Total Sale Amount:</strong> $
                  {stats.totalSaleAmount.toFixed(2)}
                </p>
                <p>
                  <strong>Total Sold Items:</strong> {stats.totalSoldItems}
                </p>
                <p>
                  <strong>Total Not Sold Items:</strong>{" "}
                  {stats.totalNotSoldItems}
                </p>
              </div>
            </div>

            <div className="flex-1 w-1/3">
              <h2 className="text-2xl font-bold mb-4">Category Statistics</h2>
              <div className=" p-4 rounded shadow">
                <Pie
                  data={{
                    labels: stats.categoryStatistics.map((c) => c.category),
                    datasets: [
                      {
                        label: "Category Distribution",
                        data: stats.categoryStatistics.map((c) => c.count),
                        backgroundColor: [
                          "rgba(255, 99, 132, 0.2)",
                          "rgba(54, 162, 235, 0.2)",
                          "rgba(255, 206, 86, 0.2)",
                          "rgba(75, 192, 192, 0.2)",
                        ],
                        borderColor: [
                          "rgba(255, 99, 132, 1)",
                          "rgba(54, 162, 235, 1)",
                          "rgba(255, 206, 86, 1)",
                          "rgba(75, 192, 192, 1)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      tooltip: {
                        callbacks: {
                          label: function (context) {
                            let label = context.label || "";
                            let value = context.raw || 0;
                            return `${label}: ${value}`;
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 w-2/5">
            <h2 className="text-2xl font-bold mb-4">Price Range Statistics</h2>
            <div className=" p-2 rounded shadow">
              <Bar
                data={{
                  labels: stats.priceRangeStatistics.map((r) => r.range),
                  datasets: [
                    {
                      label: "Number of Items",
                      data: stats.priceRangeStatistics.map((r) => r.count),
                      backgroundColor: "rgba(75, 192, 192, 0.2)",
                      borderColor: "rgba(75, 192, 192, 1)",
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          let label = context.dataset.label || "";
                          if (label) {
                            label += ": ";
                          }
                          if (context.parsed.y !== null) {
                            label += context.parsed.y;
                          }
                          return label;
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Statistics;
