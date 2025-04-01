"use client";

import React from "react";
import Pagination from "../layout/Pagination";
import { articleHeaderTemplate } from "@/helpers/LayoutContent";
import { useRouter } from "next/navigation";
import useWindowWidth from "@/helpers/getWindowWidth";
import { FilterModal } from "../layout/Modal";

export default function Content({ data }: any) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isFilterModalOpen, setIsFilterModalOpen] = React.useState(false);
  const router = useRouter();
  const windowWidth = useWindowWidth();
  //limiting the max number of items shown per page
  const ITEMS_PER_PAGE = 9;
  const [count, setCount] = React.useState<number>(ITEMS_PER_PAGE);
  const [currentUsers, setCurrentUsers] = React.useState<any[]>(
    data.userData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      ITEMS_PER_PAGE * currentPage
    )
  );

  let timerId: NodeJS.Timeout | null = null;
  let activeUsers: number[] = [];
  let usersWithLoans: number[] = [];

  //extracting data from api
  for (const user of currentUsers) {
    if (user.profile.status === "active") {
      activeUsers.push(user.profile.status);
    }
    usersWithLoans.push(user.profile.history.interest);
  }

  React.useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  React.useEffect(() => {
    let filterSettings = document.querySelector(
      "#filter-settings"
    ) as HTMLElement;
    if (isFilterModalOpen && filterSettings) {
      filterSettings.classList.add(
        "animate-[fadeInLeft_0.3s_ease-out_forwards]"
      );
      filterSettings.classList.remove(
        "animate-[fadeOutLeft_0.3s_ease-in_forwards]"
      );
    }
  }, [isFilterModalOpen]);

  const showFilterModalHandler = () => {
    setIsFilterModalOpen(true);
  };

  const hideFilterModalHandler = () => {
    let filterSettings = document.querySelector(
      "#filter-settings"
    ) as HTMLElement;
    if (filterSettings) {
      filterSettings.classList.remove(
        "animate-[fadeInLeft_0.3s_ease-out_forwards]"
      );
      filterSettings.classList.add(
        "animate-[fadeOutLeft_0.3s_ease-in_forwards]"
      );
      timerId = setTimeout(() => {
        setIsFilterModalOpen(false);
      }, 300);
    } else {
      setIsFilterModalOpen(false);
    }
  };

  async function openUserDetails(id: string) {
    router.push(`/users/${id}`);
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
              {articleHeaderTemplate(
                "w-[16%]",
                "ORGANIZATION",
                showFilterModalHandler
              )}
              {articleHeaderTemplate(
                "w-[13%]",
                "USERNAME",
                showFilterModalHandler
              )}
              {articleHeaderTemplate(
                "w-[20%]",
                "EMAIL",
                showFilterModalHandler
              )}
              {articleHeaderTemplate(
                "w-[17%]",
                "PHONE NUMBER",
                showFilterModalHandler
              )}
              {articleHeaderTemplate(
                "w-[20%]",
                "DATE JOINED",
                showFilterModalHandler
              )}
              {articleHeaderTemplate(
                "w-[15%]",
                "STATUS",
                showFilterModalHandler
              )}
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
                    <div className="inline-flex flex-row items-center justify-between w-full">
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
                      <i
                        onClick={() => openUserDetails(user.id)}
                        className="fa-solid fa-ellipsis-vertical text-primary-500 text-sm cursor-pointer"
                      ></i>
                    </div>
                  </li>
                </ul>
              );
            })}
          </ul>
        </article>
        <article className="bg-white font-sans flex lg:hidden flex-col gap-y-3 text-primary-500 p-6 border border-primary-500/6 rounded-sm shadow-md h-[640px] w-full">
          <header className="w-full">
            <ul className="flex flex-row gap-x-4 font-semibold text-[12px] w-full">
              {articleHeaderTemplate(
                "w-full",
                "ORGANIZATION",
                showFilterModalHandler
              )}
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
              {articleHeaderTemplate(
                "w-full",
                "USERNAME",
                showFilterModalHandler
              )}
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
              {articleHeaderTemplate("w-full", "EMAIL", showFilterModalHandler)}
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
                    <h5 className="text-start">
                      {user.profile.personal.email}
                    </h5>
                  </li>
                </ul>
              );
            })}
          </ul>
        </article>
        <article className="bg-white font-sans flex lg:hidden flex-col gap-y-3 text-primary-500 p-6 border border-primary-500/6 rounded-sm shadow-md h-[640px] w-full">
          <header className="w-full">
            <ul className="flex flex-row gap-x-4 font-semibold text-[12px] w-full">
              {articleHeaderTemplate(
                "w-full",
                "PHONE NUMBER",
                showFilterModalHandler
              )}
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
                    <h5 className="text-start">
                      {user.profile.personal.mobile}
                    </h5>
                  </li>
                </ul>
              );
            })}
          </ul>
        </article>
        <article className="bg-white font-sans flex lg:hidden flex-col gap-y-3 text-primary-500 p-6 border border-primary-500/6 rounded-sm shadow-md h-[640px] w-full">
          <header className="w-full">
            <ul className="flex flex-row gap-x-4 font-semibold text-[12px] w-full">
              {articleHeaderTemplate(
                "w-full",
                "DATE JOINED",
                showFilterModalHandler
              )}
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
                </ul>
              );
            })}
          </ul>
        </article>
        <article className="bg-white font-sans flex lg:hidden flex-col gap-y-3 text-primary-500 p-6 border border-primary-500/6 rounded-sm shadow-md h-[640px] w-full">
          <header className="w-full">
            <ul className="flex flex-row gap-x-4 font-semibold text-[12px] w-full">
              {articleHeaderTemplate(
                "w-full",
                "STATUS",
                showFilterModalHandler
              )}
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
                    <div className="inline-flex flex-row items-center justify-between w-full">
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
                      <i
                        onClick={() => openUserDetails(user.id)}
                        className="fa-solid fa-ellipsis-vertical text-primary-500 text-sm cursor-pointer"
                      ></i>
                    </div>
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
        {isFilterModalOpen && (
          <FilterModal onClose={hideFilterModalHandler}>
            <form className="flex flex-col gap-y-4 text-primary-400 font-medium text-sm font-sans w-full py-8">
              <div className="flex flex-col items-start w-full">
                <label>Organization</label>
                <select className="w-full text:primary-500/5 focus:outline-none focus:border-primary-500 bg-transparent focus-outline:none font-sans font-normal text-sm p-2 rounded-md border border-primary-400/20">
                  <option>Select</option>
                </select>
              </div>
              <div className="flex flex-col items-start w-full">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="User"
                  className="w-full placeholder:primary-500 focus:outline-none focus:border-primary-500 bg-transparent focus-outline:none placeholder:font-sans placeholder:font-normal text-sm px-3 py-2 rounded-md border border-primary-400/20"
                />
              </div>
              <div className="flex flex-col items-start w-full">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full placeholder:primary-500 focus:outline-none focus:border-primary-500 bg-transparent focus-outline:none placeholder:font-sans placeholder:font-normal text-sm px-3 py-2 rounded-md border border-primary-400/20"
                />
              </div>
              <div className="flex flex-col items-start w-full">
                <label>Date</label>
                <input
                  type="date"
                  placeholder="Date"
                  className="w-full placeholder:primary-500 focus:outline-none focus:border-primary-500 bg-transparent focus-outline:none placeholder:font-sans placeholder:font-normal text-sm px-3 py-2 rounded-md border border-primary-400/20"
                />
              </div>
              <div className="flex flex-col items-start w-full">
                <label>Phone Number</label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full placeholder:primary-500 focus:outline-none focus:border-primary-500 bg-transparent focus-outline:none placeholder:font-sans placeholder:font-normal text-sm px-3 py-2 rounded-md border border-primary-400/20"
                />
              </div>
              <div className="flex flex-col items-start w-full">
                <label>Status</label>
                <select className="w-full text:primary-500/5 focus:outline-none focus:border-primary-500 bg-transparent focus-outline:none font-sans font-normal text-sm p-2 rounded-md border border-primary-400/20">
                  <option>Select</option>
                </select>{" "}
              </div>
              <div className="flex flex-row gap-x-4 items-center w-full mt-3">
                <button className=" w-[50%] text-primary-500 text-sm font-semibold border border-primary-500 hover:bg-primary-500 hover:text-white rounded-md px-7 py-1 bg-transparent">Reset</button>
                <button className="w-[50%] text-white text-sm font-semibold border border-secondary-400 hover:ring-1 ring-secondary-400 rounded-md px-7 py-1 bg-secondary-400">Filter</button>
              </div>
            </form>
          </FilterModal>
        )}
      </div>
    </section>
  );
}
