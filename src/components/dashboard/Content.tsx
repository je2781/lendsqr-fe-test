"use client";

import React from "react";
import Pagination from "../layout/Pagination";
import { articleHeaderTemplate } from "@/helpers/LayoutContent";

export default function Content({ data }: any) {
  const [currentPage, setCurrentPage] = React.useState(1);

  //limiting the max number of items shown per page
  const ITEMS_PER_PAGE = 9;
  const [count, setCount] = React.useState<number>(ITEMS_PER_PAGE);
  const [currentUsers, setCurrentUsers] = React.useState<any[]>(
    data.userData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      ITEMS_PER_PAGE * currentPage
    )
  );

  let activeUsers: number[] = [];
  let usersWithLoans: number[] = [];

  //extracting data from api
  for (const user of currentUsers) {
    if (user.profile.status === "active") {
      activeUsers.push(user.profile.status);
    }
    usersWithLoans.push(user.profile.history.interest);
  }

  return (
    <section className="lg:pl-[340px] lg:pr-12 lg:pt-[175px] lg:pb-12 pb-8 pt-[155px] min-h-screen flex flex-col gap-y-10">
      <header className="font-medium text-2xl text-primary-500 font-sans lg:p-0 pl-12">
        {data.sectionName[0].toUpperCase() + data.sectionName.slice(1)}
      </header>
      <div className="flex lg:flex-row flex-col lg:gap-x-6 gap-y-6 px-12 lg:p-0">
        <article className="lg:w-[240px] w-full flex flex-col items-start gap-y-3 px-6 py-4 h-[160px] bg-white border border-primary-500/6 rounded-sm shadow-md">
          <span className="h-[37px] w-[37px] flex items-center justify-center rounded-full bg-dashboard-users/8">
            <i className="fa-solid fa-users text-dashboard-users text-lg"></i>
          </span>
          <h4 className="font-sans font-medium text-primary-400 text-sm">
            USERS
          </h4>
          <h3 className="font-sans font-semibold text-primary-500 text-lg">
            {count.toLocaleString()}
          </h3>
        </article>
        <article className="lg:w-[240px] w-full flex flex-col items-start gap-y-4 px-6 py-4 h-[160px] bg-white border border-primary-500/6 rounded-sm shadow-md">
          <span className="h-[37px] w-[37px] flex items-center justify-center rounded-full bg-dashboard-active/8">
            <i className="fa-solid fa-users text-dashboard-active text-lg"></i>
          </span>
          <h4 className="font-sans font-medium text-primary-400 text-sm">
            ACTIVE USERS
          </h4>
          <h3 className="font-sans font-semibold text-primary-500 text-lg">
            {activeUsers.length.toLocaleString()}
          </h3>
        </article>
        <article className="lg:w-[240px] w-full flex flex-col items-start gap-y-3 px-6 py-4 h-[160px] bg-white border border-primary-500/6 rounded-sm shadow-md">
          <span className="h-[37px] w-[37px] flex items-center justify-center rounded-full bg-dashboard-loans/8">
            <i className="fa-solid fa-file-invoice text-dashboard-loans text-lg"></i>
          </span>
          <h4 className="font-sans font-medium text-primary-400 text-sm">
            USERS WITH LOANS
          </h4>
          <h3 className="font-sans font-semibold text-primary-500 text-lg">
            {usersWithLoans.length.toLocaleString()}
          </h3>
        </article>
        <article className="lg:w-[240px] w-full flex flex-col items-start gap-y-3 px-6 py-4 h-[160px] bg-white border border-primary-500/6 rounded-sm shadow-md">
          <span className="h-[37px] w-[37px] flex items-center justify-center rounded-full bg-dashboard-savings/8">
            <i className="fa-solid fa-coins text-dashboard-savings text-lg"></i>
          </span>
          <h4 className="font-sans font-medium text-primary-400 text-sm">
            USERS WITH SAVINGS
          </h4>
          <h3 className="font-sans font-semibold text-primary-500 text-lg">
            {3}
          </h3>
        </article>
      </div>
      <div className="flex flex-col gap-y-6 px-12 pb-14 lg:p-0">
        <article className="bg-white font-sans lg:flex hidden flex-col gap-y-3 text-primary-500 p-6 border border-primary-500/6 rounded-sm shadow-md w-[962px] h-[640px]">
          <header className="w-full">
            <ul className="flex flex-row gap-x-4 font-semibold text-[12px] w-full">
                {articleHeaderTemplate()}
                {articleHeaderTemplate("w-[13%]", 'USERNAME')}
                {articleHeaderTemplate("w-[20%]", 'EMAIL')}
                {articleHeaderTemplate("w-[17%]", 'PHONE NUMBER')}
                {articleHeaderTemplate("w-[20%]", 'DATE JOINED')}
                {articleHeaderTemplate("w-[15%]", 'STATUS')}
            </ul>
          </header>
          <ul className="flex flex-col font-normal text-[14px] w-full">
            {currentUsers.map((user, i, array) => {
              return (
                <ul
                  key={i}
                  className={`flex flex-row gap-x-4 items-center w-full ${
                    i === array.length - 1
                      ? ""
                      : "border border-b-primary-500/20 border-l-0 border-r-0 border-t-0"
                  } py-4`}
                >
                  <li className="w-[16%]">
                    <h5 className="text-start">{user.organization}</h5>
                  </li>
                  <li className="w-[13%]">
                    <h5 className="text-start">{user.username}</h5>
                  </li>
                  <li className="w-[20%]">
                    <h5 className="text-start">
                      {user.profile.personal.email}
                    </h5>
                  </li>
                  <li className="w-[17%]">
                    <h5 className="text-start">
                      {user.profile.personal.mobile}
                    </h5>
                  </li>
                  <li className="w-[20%]">
                    <h5 className="text-start">
                      {new Date(user.profile.date_joined)
                        .toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                        .replace(" at", "")}
                    </h5>
                  </li>
                  <li className="w-[15%]">
                    <span
                      className={`flex items-center justify-center rounded-2xl w-fit h-fit py-1 px-4 ${
                        user.profile.status === "inactive"
                          ? "bg-primary-400/7"
                          : user.profile.status === "active"
                          ? "bg-status-active/7"
                          : user.profile.status === "pending"
                          ? "bg-status-pending/7"
                          : "bg-status-blacklisted/7"
                      }`}
                    >
                      <h5
                        className={`text-start ${
                          user.profile.status === "inactive"
                            ? "text-primary-400"
                            : user.profile.status === "active"
                            ? "text-status-active"
                            : user.profile.status === "pending"
                            ? "text-status-pending"
                            : "text-status-blacklisted"
                        }`}
                      >
                        {user.profile.status[0].toUpperCase() +
                          user.profile.status.slice(1)}
                      </h5>
                    </span>
                  </li>
                </ul>
              );
            })}
          </ul>
        </article>
        <article className="bg-white font-sans flex lg:hidden flex-col gap-y-3 text-primary-500 p-6 border border-primary-500/6 rounded-sm shadow-md h-[640px] w-full">
          <header className="w-full">
            <ul className="flex flex-row gap-x-4 font-semibold text-[12px] w-full">
            {articleHeaderTemplate('w-full')}
            </ul>
          </header>
          <ul className="flex flex-col font-normal text-[14px] w-full">
            {currentUsers.map((user, i, array) => {
              return (
                <ul
                  key={i}
                  className={`flex flex-row gap-x-4 items-center w-full ${
                    i === array.length - 1
                      ? ""
                      : "border border-b-primary-500/20 border-l-0 border-r-0 border-t-0"
                  } py-4`}
                >
                  <li className="w-full">
                    <h5 className="text-start">{user.organization}</h5>
                  </li>
                </ul>
              );
            })}
          </ul>
        </article>
        <article className="bg-white font-sans flex lg:hidden flex-col gap-y-3 text-primary-500 p-6 border border-primary-500/6 rounded-sm shadow-md h-[640px] w-full">
          <header className="w-full">
            <ul className="flex flex-row gap-x-4 font-semibold text-[12px] w-full">
            {articleHeaderTemplate('w-full', 'USERNAME')}
            </ul>
          </header>
          <ul className="flex flex-col font-normal text-[14px] w-full">
            {currentUsers.map((user, i, array) => {
              return (
                <ul
                  key={i}
                  className={`flex flex-row gap-x-4 items-center w-full ${
                    i === array.length - 1
                      ? ""
                      : "border border-b-primary-500/20 border-l-0 border-r-0 border-t-0"
                  } py-4`}
                >
                  <li className="w-full">
                    <h5 className="text-start">{user.username}</h5>
                  </li>
                </ul>
              );
            })}
          </ul>
        </article>
        <article className="bg-white font-sans flex lg:hidden flex-col gap-y-3 text-primary-500 p-6 border border-primary-500/6 rounded-sm shadow-md h-[640px] w-full">
          <header className="w-full">
            <ul className="flex flex-row gap-x-4 font-semibold text-[12px] w-full">
            {articleHeaderTemplate('w-full', 'EMAIL')}


            </ul>
          </header>
          <ul className="flex flex-col font-normal text-[14px] w-full">
            {currentUsers.map((user, i, array) => {
              return (
                <ul
                  key={i}
                  className={`flex flex-row gap-x-4 items-center w-full ${
                    i === array.length - 1
                      ? ""
                      : "border border-b-primary-500/20 border-l-0 border-r-0 border-t-0"
                  } py-4`}
                >
                  <li className="w-full">
                    <h5 className="text-start">{user.profile.personal.email}</h5>
                  </li>
                </ul>
              );
            })}
          </ul>
        </article>
        <article className="bg-white font-sans flex lg:hidden flex-col gap-y-3 text-primary-500 p-6 border border-primary-500/6 rounded-sm shadow-md h-[640px] w-full">
          <header className="w-full">
            <ul className="flex flex-row gap-x-4 font-semibold text-[12px] w-full">
            {articleHeaderTemplate('w-full', 'PHONE NUMBER')}
            </ul>
          </header>
          <ul className="flex flex-col font-normal text-[14px] w-full">
            {currentUsers.map((user, i, array) => {
              return (
                <ul
                  key={i}
                  className={`flex flex-row gap-x-4 items-center w-full ${
                    i === array.length - 1
                      ? ""
                      : "border border-b-primary-500/20 border-l-0 border-r-0 border-t-0"
                  } py-4`}
                >
                  <li className="w-full">
                    <h5 className="text-start">{user.profile.personal.mobile}</h5>
                  </li>
                </ul>
              );
            })}
          </ul>
        </article>
        <article className="bg-white font-sans flex lg:hidden flex-col gap-y-3 text-primary-500 p-6 border border-primary-500/6 rounded-sm shadow-md h-[640px] w-full">
          <header className="w-full">
            <ul className="flex flex-row gap-x-4 font-semibold text-[12px] w-full">
            {articleHeaderTemplate('w-full', 'DATE JOINED')}
            </ul>
          </header>
          <ul className="flex flex-col font-normal text-[14px] w-full">
            {currentUsers.map((user, i, array) => {
              return (
                <ul
                  key={i}
                  className={`flex flex-row gap-x-4 items-center w-full ${
                    i === array.length - 1
                      ? ""
                      : "border border-b-primary-500/20 border-l-0 border-r-0 border-t-0"
                  } py-4`}
                >
                  <li className="w-full">
                    <h5 className="text-start">{new Date(user.profile.date_joined)
                        .toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                        .replace(" at", "")}</h5>
                  </li>
                </ul>
              );
            })}
          </ul>
        </article>
        <article className="bg-white font-sans flex lg:hidden flex-col gap-y-3 text-primary-500 p-6 border border-primary-500/6 rounded-sm shadow-md h-[640px] w-full">
          <header className="w-full">
            <ul className="flex flex-row gap-x-4 font-semibold text-[12px] w-full">
            {articleHeaderTemplate('w-full', 'STATUS')}
            </ul>
          </header>
          <ul className="flex flex-col font-normal text-[14px] w-full">
            {currentUsers.map((user, i, array) => {
              return (
                <ul
                  key={i}
                  className={`flex flex-row gap-x-4 items-center w-full ${
                    i === array.length - 1
                      ? ""
                      : "border border-b-primary-500/20 border-l-0 border-r-0 border-t-0"
                  } py-4`}
                >
                  <li className="w-full">
                    <span
                      className={`flex items-center justify-center rounded-2xl w-fit h-fit py-1 px-4 ${
                        user.profile.status === "inactive"
                          ? "bg-primary-400/7"
                          : user.profile.status === "active"
                          ? "bg-status-active/7"
                          : user.profile.status === "pending"
                          ? "bg-status-pending/7"
                          : "bg-status-blacklisted/7"
                      }`}
                    >
                      <h5
                        className={`text-start ${
                          user.profile.status === "inactive"
                            ? "text-primary-400"
                            : user.profile.status === "active"
                            ? "text-status-active"
                            : user.profile.status === "pending"
                            ? "text-status-pending"
                            : "text-status-blacklisted"
                        }`}
                      >
                        {user.profile.status[0].toUpperCase() +
                          user.profile.status.slice(1)}
                      </h5>
                    </span>
                  </li>
                </ul>
              );
            })}
          </ul>
        </article>
        <Pagination
          count={count}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={data.userData.length}
          setCurrentUsers={setCurrentUsers}
          setCount={setCount}
          totalUsers={data.userData}
        />
      </div>
    </section>
  );
}
