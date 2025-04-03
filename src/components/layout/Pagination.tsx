"use client";

import { PaginationProps } from "@/interfaces/interfaces";
import React from "react";

export default function Pagination({
  count,
  setCount,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  totalItems,
  setCurrentUsers,
  totalUsers,
}: PaginationProps) {
  //setting limits to items shown
  const [max, setMax] = React.useState<number>(itemsPerPage);
  const min = 1;

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = totalItems > currentPage * itemsPerPage;
  const lastPage = Math.ceil(totalItems / itemsPerPage);
  const nextPage = currentPage + 1;
  const previousPage = currentPage - 1;
  const isActivePage = currentPage;

  return (
    <footer className="flex lg:flex-row flex-col items-center lg:justify-between gap-y-7 lg:gap-0 w-full h-[30px] font-sans">
      <div className="font-normal text-sm text-primary-500 inline-flex flex-row items-center gap-x-2 h-full">
        <h6>Showing</h6>
        <div className="inline-flex flex-row items-center gap-x-2 bg-primary-500/10 w-[60px] h-[30px] px-2 rounded-xs">
          <input
            type="text"
            className="focus:outline-none text-primary-500 w-full px-1 py-1"
            value={count}
            onChange={(e) => {
              const value = e.target.value;
              //only allow numbers
              if (/^\d*$/.test(value)) {
                const newNumber = Number(value);
                if (newNumber >= min && newNumber <= max) {
                  //updating user data
                  setCurrentUsers(totalUsers.slice(0, newNumber));

                  setCount(newNumber);
                }
              }
            }}
          />
          <div className="inline-flex flex-col">
            <button
              aria-label="up"
              className="-mb-2"
              onClick={() => {
                if (count <= max) {
                  //updating user data

                  setCurrentUsers(
                    totalUsers.slice(0, Math.min(count + 1, max))
                  );
                  setCount((prev: number) => Math.min(prev + 1, max));
                }
              }}
            >
              <i className="fa-solid fa-angle-up text-primary-500 cursor-pointer"></i>
            </button>
            <button
              aria-label="down"
              onClick={() => {
                if (count >= min) {
                  //updating user data

                  setCurrentUsers(
                    totalUsers.slice(0, Math.max(count - 1, min))
                  );
                  setCount((prev: number) => Math.max(prev - 1, min));
                }
              }}
            >
              <i className="fa-solid fa-angle-down text-primary-500 cursor-pointer"></i>
            </button>
          </div>
        </div>
        <h6>out of {totalItems}</h6>
      </div>
      <div className="no-underline space-x-4 text-center text-[16px] h-full text-primary-400">
        {currentPage > 0 && currentPage !== 1 && (
          <button
            aria-label="previous"
            onClick={() => {
              const visibleUsers = totalUsers.slice(
                (currentPage - 2) * itemsPerPage,
                itemsPerPage * (currentPage - 1)
              );
              //updating user and page data
              setCurrentUsers(visibleUsers);
              setCurrentPage((prev: number) => prev - 1);
              setMax(visibleUsers.length);
            }}
            className="cursor-pointer bg-primary-500/5 rounded-sm w-fit h-fit py-[2px] px-2"
          >
            <i className="fa-solid fa-angle-left text-primary-500"></i>
          </button>
        )}
        {currentPage !== 1 && (
          <span
            className={`${
              isActivePage === 1 ? "font-medium" : "text-primary-400/40"
            } font-sans font-normal`}
          >
            1
          </span>
        )}
        {hasPreviousPage && previousPage > 1 && previousPage !== 2 && (
          <span className="font-sans font-normal text-primary-400/40">...</span>
        )}
        {hasPreviousPage && previousPage > 1 && (
          <span
            className={`${
              isActivePage === previousPage
                ? "font-medium"
                : "text-primary-400/40"
            } font-sans font-normal`}
          >
            {previousPage}
          </span>
        )}
        <span
          className={`${
            isActivePage === currentPage ? "font-medium" : "text-primary-400/40"
          }  font-sans font-normal`}
        >
          {currentPage}
        </span>
        {hasNextPage && nextPage + 3 < lastPage && (
          <span className="font-sans font-normal text-primary-400/40">...</span>
        )}
        {hasNextPage && nextPage !== lastPage && (
          <span
            className={`${
              isActivePage === nextPage ? "font-medium" : "text-primary-400/40"
            } font-sans font-normal`}
          >
            {lastPage - 1}
          </span>
        )}
        {lastPage !== currentPage && (
          <span
            className={`${
              isActivePage === lastPage ? "font-medium" : "text-primary-400/40"
            } font-sans font-normal`}
          >
            {lastPage}
          </span>
        )}
        {currentPage < lastPage && (
          <button
            aria-label="next"
            onClick={() => {
              const visibleUsers = totalUsers.slice(
                currentPage * itemsPerPage,
                itemsPerPage * (currentPage + 1)
              );
              //updating user and page data
              setCurrentUsers(visibleUsers);
              setCurrentPage((prev: number) => prev + 1);
              setCount(visibleUsers.length);
              setMax(visibleUsers.length);
            }}
            className="cursor-pointer bg-primary-500/5 rounded-sm w-fit h-fit py-[2px] px-2"
          >
            <i className="fa-solid fa-angle-right text-primary-500"></i>
          </button>
        )}
      </div>
    </footer>
  );
}
