"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Day {
  date: number;
  img: string;
  timestamp: number;
  dayName: string;
}

export default function Calendar({ address }: { address: string }) {
  // State for the current month's Unix timestamp
  const [currentMonth, setCurrentMonth] = useState<number>(
    Math.floor(new Date().getTime() / 1000)
  );
  const [isLoading, setLoading] = useState<boolean>(true);

  // State for the days of the current month
  const [days, setDays] = useState<Day[]>([]);

  // Function to generate days of a month from a given Unix timestamp
  const getDaysInMonth = (unixTimestamp: number): Day[] => {
    const date = new Date(unixTimestamp * 1000);
    const month = date.getMonth();
    const year = date.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dayNames = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    // Determine the day of the week for the first day of the month
    const firstDayOfWeek = new Date(year, month, 1).getDay();

    // Calculate how many padding days we need at the start
    const paddingDays = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1; // 0 is Sunday, 1 is Monday, etc.

    const days: Day[] = [];

    // Add padding days for the start of the month
    for (let i = 1; i <= paddingDays; i++) {
      days.push({
        date: 0, // This indicates it's a padding day
        img: "", // No image for padding days
        timestamp: 0,
        dayName: "",
      });
    }

    // Add the actual days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(year, month, i);
      const dayTimestamp = dayDate.getTime() / 1000;
      const dayOfWeek = dayDate.getDay();
      const dayNameIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

      days.push({
        date: i,
        img: `https://images.unsplash.com/photo-1560196327-cca0a731441b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80`,
        timestamp: dayTimestamp,
        dayName: dayNames[dayNameIndex], // Adjusted for the new order of dayNames
      });
    }

    return days;
  };

  useEffect(() => {
    setLoading(true);
    setDays(getDaysInMonth(currentMonth));
    setLoading(false);
  }, [currentMonth]);

  // Function to navigate to the next month
  const goToNextMonth = () => {
    const date = new Date(currentMonth * 1000);
    const nextMonth =
      new Date(date.getFullYear(), date.getMonth() + 1, 1).getTime() / 1000;
    setCurrentMonth(nextMonth);
  };

  // Function to navigate to the previous month
  const goToPreviousMonth = () => {
    const date = new Date(currentMonth * 1000);
    const prevMonth =
      new Date(date.getFullYear(), date.getMonth() - 1, 1).getTime() / 1000;
    setCurrentMonth(prevMonth);
  };

  // Get the current month's name for display
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonthName = monthNames[new Date(currentMonth * 1000).getMonth()];
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-12">
      <div className="mb-6 flex justify-center items-center">
        <button
          onClick={goToPreviousMonth}
          className="mr-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <h2 className="text-2xl font-bold">{currentMonthName}</h2>
        <button
          onClick={goToNextMonth}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-7">
        {days.map((day, index) => (
          <div key={index} className="p-4">
            {day.date > 0 && (
              <Link href={`/billboard/${address}/${day.timestamp}`}>
                <h2 className="text-center">
                  {day.dayName}, {day.date}
                </h2>
                <Image
                  src={day.img}
                  alt={`Image for day ${day.date}`}
                  className="mt-4 w-full h-32 object-cover rounded-md"
                  objectFit="cover"
                  width="400"
                  height="100"
                />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
