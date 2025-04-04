"use client";

import React from "react";
import Pagination from "../layout/Pagination";
import { articleHeaderTemplate } from "@/helpers/LayoutContent";
import { useRouter } from "next/navigation";
import useWindowWidth from "@/helpers/getWindowWidth";
import { FilterModal, OptionsModal } from "../layout/Modal";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/css';

export default function UsersContent({ data }: any) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(
    null
  );
  const [isFilterModalOpen, setIsFilterModalOpen] = React.useState(false);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = React.useState(false);
  const windowWidth = useWindowWidth();
  const router = useRouter();

  //limiting the max number of items shown per page
  const ITEMS_PER_PAGE = 9;
  const [count, setCount] = React.useState<number>(ITEMS_PER_PAGE);
  const [visibleUsers, setVisibleUsers] = React.useState<Array<any>>(
    data.userData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      ITEMS_PER_PAGE * currentPage
    )
  );

  let timerId: NodeJS.Timeout | null = null;
  const activeUsers: number[] = [];
  const usersWithLoans: number[] = [];
  const usersWithSavings: number[] = [];

  //extracting data from api
  for (const user of data.userData) {
    if (user.profile.status === "active") {
      activeUsers.push(user.profile.status);
    }
    usersWithLoans.push(user.profile.history.interest);
    usersWithSavings.push(user.profile.history.savings);
  }

  //cleaning up asynchronous callback timers
  React.useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  React.useEffect(() => {
    const filterSettings = document.querySelector(
      "#filter-settings"
    ) as HTMLElement;
    const userOptions = document.querySelector("#user-options") as HTMLElement;

    // Handle filter settings animation
    if (isFilterModalOpen && filterSettings) {
      filterSettings.classList.add(
        "animate-[fadeInLeft_0.3s_ease-out_forwards]"
      );
      filterSettings.classList.remove(
        "animate-[fadeOutLeft_0.3s_ease-in_forwards]"
      );
    }

    // Handle user options animation
    if (isOptionsModalOpen && userOptions) {
      userOptions.classList.add("animate-[fadeInRight_0.3s_ease-out_forwards]");
      userOptions.classList.remove(
        "animate-[fadeOutRight_0.3s_ease-in_forwards]"
      );
    }
  }, [isFilterModalOpen, isOptionsModalOpen]);

  const showFilterModalHandler = () => {
    setIsFilterModalOpen(true);
  };

  const showOptionsModalHandler = (userId: string) => {
    setSelectedUserId(userId);
    setIsOptionsModalOpen(true);
  };

  const hideModalHandler = (
    modalId: string,
    setModalState: React.Dispatch<React.SetStateAction<boolean>>,
    fadeOutClass: string
  ) => {
    const modal = document.querySelector(`#${modalId}`) as HTMLElement;

    if (modal) {
      modal.classList.remove(
        `animate-[fadeIn${fadeOutClass}_0.3s_ease-out_forwards]`
      );
      modal.classList.add(
        `animate-[fadeOut${fadeOutClass}_0.3s_ease-in_forwards]`
      );

      timerId = setTimeout(() => {
        setModalState(false);
      }, 300);
    } else {
      setModalState(false);
    }
  };

  //navigating to details page
  async function openUserDetails(id: string) {
    router.push(`/users/${id}`);
  }

  return (
    <main
      role="main"
      className="lg:pl-[340px] lg:pr-12 lg:pt-[165px] lg:pb-12 pb-8 pt-[145px] min-h-screen flex flex-col gap-y-8"
    >
      <header className="font-medium text-2xl text-primary-500 font-sans lg:p-0 pl-6">
        {data.sectionName[0].toUpperCase() + data.sectionName.slice(1)}
      </header>
      <div className="lg:flex flex-row hidden flex-col lg:gap-x-6 gap-y-6">
        <article className="w-[240px] flex flex-col items-start gap-y-3 px-6 py-4 h-[160px] bg-white border border-primary-500/6 rounded-sm shadow-md">
          <span className="h-[37px] w-[37px] flex items-center justify-center rounded-full bg-dashboard-users/8">
            <i className="fa-solid fa-users text-dashboard-users text-lg"></i>
          </span>
          <h4 className="font-sans font-medium text-primary-400 text-sm">
            USERS
          </h4>
          <h3 className="font-sans font-semibold text-primary-500 text-lg">
            {data.userData.length.toLocaleString()}
          </h3>
        </article>
        <article className="w-[240px] flex flex-col items-start gap-y-4 px-6 py-4 h-[160px] bg-white border border-primary-500/6 rounded-sm shadow-md">
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
        <article className="w-[240px] flex flex-col items-start gap-y-3 px-6 py-4 h-[160px] bg-white border border-primary-500/6 rounded-sm shadow-md">
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
        <article className="w-[240px] flex flex-col items-start gap-y-3 px-6 py-4 h-[160px] bg-white border border-primary-500/6 rounded-sm shadow-md">
          <span className="h-[37px] w-[37px] flex items-center justify-center rounded-full bg-dashboard-savings/8">
            <i className="fa-solid fa-coins text-dashboard-savings text-lg"></i>
          </span>
          <h4 className="font-sans font-medium text-primary-400 text-sm">
            USERS WITH SAVINGS
          </h4>
          <h3 className="font-sans font-semibold text-primary-500 text-lg">
            {usersWithSavings.length.toLocaleString()}
          </h3>
        </article>
      </div>
      {/*   template for small screens   */}
      <div className="flex flex-col gap-y-5 lg:hidden">
        <div className="flex flex-row items-center gap-x-5 px-6">
          <article className="w-[50%] flex flex-col items-start gap-y-3 px-6 py-4 h-[140px] bg-white border border-primary-500/6 rounded-sm shadow-md">
            <span className="h-[37px] w-[37px] flex items-center justify-center rounded-full bg-dashboard-users/8">
              <i className="fa-solid fa-users text-dashboard-users text-lg"></i>
            </span>
            <h4 className="font-sans font-medium text-primary-400 text-sm">
              USERS
            </h4>
            <h3 className="font-sans font-semibold text-primary-500 text-lg">
              {data.userData.length.toLocaleString()}
            </h3>
          </article>
          <article className="w-[50%] flex flex-col items-start gap-y-4 px-6 py-4 h-[140px] bg-white border border-primary-500/6 rounded-sm shadow-md">
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
        </div>
        <div className="flex flex-row items-center gap-x-5 px-6">
          <article className="w-[50%] flex flex-col items-start gap-y-3 px-6 py-4 h-[140px] bg-white border border-primary-500/6 rounded-sm shadow-md">
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
          <article className="w-[50%] flex flex-col items-start gap-y-3 px-6 py-4 h-[140px] bg-white border border-primary-500/6 rounded-sm shadow-md">
            <span className="h-[37px] w-[37px] flex items-center justify-center rounded-full bg-dashboard-savings/8">
              <i className="fa-solid fa-coins text-dashboard-savings text-lg"></i>
            </span>
            <h4 className="font-sans font-medium text-primary-400 text-sm">
              USERS WITH SAVINGS
            </h4>
            <h3 className="font-sans font-semibold text-primary-500 text-lg">
              {usersWithSavings.length.toLocaleString()}
            </h3>
          </article>
        </div>
      </div>
      {/*   template for small screens   */}
      <div className="flex flex-col gap-y-6  px-6 pb-14 lg:p-0">
        <article className="bg-white font-sans lg:flex hidden flex-col gap-y-3 p-6 border border-primary-500/6 rounded-sm shadow-md w-[962px] h-[640px]">
          <header className="w-full">
            <ul className="flex flex-row gap-x-4 font-semibold text-[12px] w-full text-primary-400">
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
          <ul className="flex flex-col font-normal text-[14px] w-full text-primary-500">
            {visibleUsers.map((user, i, array) => {
              return (
                <div key={i}>
                  <ul
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
                          onClick={() => showOptionsModalHandler(user.user_id)}
                          id="toggle-options"
                          data-testid="open-options"
                          className="fa-solid fa-ellipsis-vertical text-primary-500 text-[16px] cursor-pointer"
                        ></i>
                      </div>
                    </li>
                  </ul>
                  {isOptionsModalOpen && (
                    <OptionsModal
                      onClose={() =>
                        hideModalHandler(
                          "user-options",
                          setIsOptionsModalOpen,
                          "Right"
                        )
                      }
                      styleClasses="right-[197px] top-[37rem] w-[180px]"
                    >
                      <button
                        onClick={() =>
                          selectedUserId && openUserDetails(selectedUserId)
                        }
                        className="inline-flex flex-row gap-x-3 cursor-pointer items-center w-full text-primary-500 text-medium text-sm"
                      >
                        <i className="fa-solid fa-eye text-primary-500 text-sm"></i>
                        <h5>View Details</h5>
                      </button>
                      <button className="inline-flex flex-row gap-x-3 cursor-pointer items-center w-full text-primary-500 text-medium text-sm">
                        <i className="fa-solid fa-user-xmark text-primary-500 text-sm"></i>
                        <h5>Blacklist User</h5>
                      </button>
                      <button className="inline-flex flex-row gap-x-3 cursor-pointer items-center w-full text-primary-500 text-medium text-sm">
                        <i className="fa-solid fa-user-check text-primary-500 text-sm"></i>
                        <h5>Activate User</h5>
                      </button>
                    </OptionsModal>
                  )}
                </div>
              );
            })}
          </ul>
        </article>

        {/*   template for small screens   */}
        <div className="lg:hidden block">
          <Swiper
            spaceBetween={10}
            slidesPerView="auto"
            autoHeight
            className="w-full h-[620px]" // add some horizontal padding
            centeredSlides={false} // make sure it's off
            initialSlide={0}
          >
            <SwiperSlide className="!w-[90%] !md:w-[70%] !h-[620px]">
              <article className="bg-white font-sans flex lg:hidden flex-col gap-y-3 p-6 border border-primary-500/6 rounded-sm shadow-md h-full w-full">
                <header className="w-full">
                  <ul className="flex flex-row gap-x-4 font-semibold text-[12px] w-full text-primary-400">
                    {articleHeaderTemplate(
                      "w-full",
                      "ORGANIZATION",
                      showFilterModalHandler
                    )}
                  </ul>
                </header>
                <ul className="flex flex-col font-normal text-[14px] w- text-primary-500">
                  {visibleUsers.map((user, i, array) => {
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
            </SwiperSlide>
            <SwiperSlide className="!w-[90%] !md:w-[70%] !h-[620px]">
              <article className="bg-white font-sans flex lg:hidden flex-col gap-y-3 p-6 border border-primary-500/6 rounded-sm shadow-md h-full w-full">
                <header className="w-full">
                  <ul className="flex flex-row gap-x-4 font-semibold text-[12px] w-full text-primary-400">
                    {articleHeaderTemplate(
                      "w-full",
                      "USERNAME",
                      showFilterModalHandler
                    )}
                  </ul>
                </header>
                <ul className="flex flex-col font-normal text-[14px] w- text-primary-500">
                  {visibleUsers.map((user, i, array) => {
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
            </SwiperSlide>
            <SwiperSlide className="!w-[90%] !md:w-[70%] !h-[620px]">
              <article className="bg-white font-sans flex lg:hidden flex-col gap-y-3 p-6 border border-primary-500/6 rounded-sm shadow-md h-full w-full">
                <header className="w-full">
                  <ul className="flex flex-row gap-x-4 font-semibold text-[12px] w-full text-primary-400">
                    {articleHeaderTemplate(
                      "w-full",
                      "EMAIL",
                      showFilterModalHandler
                    )}
                  </ul>
                </header>
                <ul className="flex flex-col font-normal text-[14px] w-full text-primary-500">
                  {visibleUsers.map((user, i, array) => {
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
            </SwiperSlide>
            <SwiperSlide className="!w-[90%] !md:w-[70%] !h-[620px]">
              <article className="bg-white font-sans flex lg:hidden flex-col gap-y-3 p-6 border border-primary-500/6 rounded-sm shadow-md h-full w-full">
                <header className="w-full">
                  <ul className="flex flex-row gap-x-4 font-semibold text-[12px] w-full text-primary-400">
                    {articleHeaderTemplate(
                      "w-full",
                      `${windowWidth < 768 ? "PHONE" : "PHONE NUMBER"}`,
                      showFilterModalHandler
                    )}
                  </ul>
                </header>
                <ul className="flex flex-col font-normal text-[14px] w-full text-primary-500">
                  {visibleUsers.map((user, i, array) => {
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
            </SwiperSlide>
            <SwiperSlide className="!w-[90%] !md:w-[70%] !h-[620px]">
              <article className="bg-white font-sans flex lg:hidden flex-col gap-y-3 p-6 border border-primary-500/6 rounded-sm shadow-md h-full w-full">
                <header className="w-full">
                  <ul className="flex flex-row gap-x-4 font-semibold text-[12px] w-full text-primary-400">
                    {articleHeaderTemplate(
                      "w-full",
                      "DATE JOINED",
                      showFilterModalHandler
                    )}
                  </ul>
                </header>
                <ul className="flex flex-col font-normal text-[14px] w-full text-primary-500">
                  {visibleUsers.map((user, i, array) => {
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
            </SwiperSlide>
            <SwiperSlide className="!w-[90%] !md:w-[70%] !h-[620px]">
              <article className="bg-white font-sans flex lg:hidden flex-col gap-y-3 p-6 border border-primary-500/6 rounded-sm shadow-md h-full w-full">
                <header className="w-full">
                  <ul className="flex flex-row gap-x-4 font-semibold text-[12px] w-full text-primary-400">
                    {articleHeaderTemplate(
                      "w-full",
                      "STATUS",
                      showFilterModalHandler
                    )}
                  </ul>
                </header>
                <ul className="flex flex-col font-normal text-[14px] w-full text-primary-500">
                  {visibleUsers.map((user, i, array) => {
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
                              onClick={() =>
                                showOptionsModalHandler(user.user_id)
                              }
                              id="toggle-options"
                              data-testid="open-options"
                              className="fa-solid fa-ellipsis-vertical text-primary-500 text-[16px] cursor-pointer"
                            ></i>
                          </div>
                        </li>
                      </ul>
                    );
                  })}
                </ul>
              </article>
            </SwiperSlide>
          </Swiper>
        </div>

        {/*   template for small screens   */}
        <Pagination
          count={count}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={data.userData.length}
          setVisibleUsers={setVisibleUsers}
          setCount={setCount}
          totalUsers={data.userData}
        />
        {isFilterModalOpen && (
          <FilterModal
            onClose={() =>
              hideModalHandler("filter-settings", setIsFilterModalOpen, "Left")
            }
          >
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
                <button className=" w-[50%] text-primary-500 text-sm font-semibold border border-primary-500 hover:bg-primary-500 hover:text-white rounded-md px-7 py-1 bg-transparent">
                  Reset
                </button>
                <button className="w-[50%] text-white text-sm font-semibold border border-secondary-400 hover:ring-1 ring-secondary-400 rounded-md px-7 py-1 bg-secondary-400">
                  Filter
                </button>
              </div>
            </form>
          </FilterModal>
        )}
      </div>
    </main>
  );
}
