"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function Dashboard() {
  const { push } = useRouter();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function verify() {
      try {
        const response = await fetch("/api/auth/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        return {
          user: responseData,
          error: null,
        };
      } catch (error) {
        return {
          user: null,
          error,
        };
      }
    }

    async function getCourses() {
      try {
        const response = await fetch("/api/courses/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        return responseData.studentCourses;
      } catch (error) {
        return error;
      }
    }

    (async () => {
      const { user, error } = await verify();
      if (error) {
        push("/login");
        return;
      }
      const data = await getCourses();
      setCourses(data);
    })();
  }, [push]);

  return (
    <div className="flex w-full flex-col justify-center px-6 py-12 lg:px-8">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Your Courses
      </h2>

      <div className="mt-10 sm:mx-auto sm:w-full ">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Course ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Course Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Course Code
                </th>
                <th scope="col" className="px-6 py-3">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {courses.length > 0 &&
                courses.map((course) => (
                  <tr key={course._id} className="border-b">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {course.course_id}
                    </td>
                    <td className="px-6 py-4">{course.course_name}</td>
                    <td className="px-6 py-4">{course.course_code}</td>
                    <td className="px-6 py-4">{course.course_duration}</td>
                    <td className="px-6 py-4">
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
