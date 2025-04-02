"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { DetailsTabModal } from "../layout/Modal";

export default function UserDetails({ userData, id }: {userData: any[], id: string}) {
  let timerId: NodeJS.Timeout | null = null;

  const [isDetailsTabModalOpen, setIsDetailsTabModalOpen] = React.useState(false);
  const router = useRouter();

  //extract user details
  const user = userData.find((datum) => datum.user_id === id);
  //cleaning up asynchronous callback timers
  React.useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  React.useEffect(() => {
    const userDetailsTab = document.querySelector("#user-details") as HTMLElement;

    // Handle user DetailsTab animation
    if (isDetailsTabModalOpen && userDetailsTab) {
      userDetailsTab.classList.add("animate-[fadeInRight_0.3s_ease-out_forwards]");
      userDetailsTab.classList.remove(
        "animate-[fadeOutRight_0.3s_ease-in_forwards]"
      );
    }
  }, [isDetailsTabModalOpen]);

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

  const showDetailsTabModalHandler = () => {
    setIsDetailsTabModalOpen(true);
  };

  return (
    <main
      role="main"
      className="xl:pl-[340px] font-sans xl:pr-12 xl:pt-[175px] xl:pb-12 pb-8 pt-[155px] min-h-screen flex flex-col items-center xl:items-stretch gap-y-10"
    >
      <header className="font-medium text-2xl text-primary-500 font-sans xl:p-0 px-6 flex xl:flex-row flex-col xl:justify-between xl:gap-0 gap-y-4 xl:items-end items-center">
        <div className="inline-flex flex-col items-start gap-y-9">
          <button
            data-testid="go-back"
            onClick={() => router.replace("/users")}
            className="cursor-pointer inline-flex flex-row gap-x-2 items-center font-normal xl:text-[16px] text-[12px] text-primary-400"
          >
            <i className="fa-solid fa-arrow-left text-primary-400"></i>
            <h4>Back To Users</h4>
          </button>
          <h1 className="font-medium text-primary-500 xl:text-[24px] text-[20px]">
            User Details
          </h1>
        </div>
        <div className="inline-flex flex-row gap-x-3 items-center">
          <button className="px-3 py-1 cursor-pointer font-semibold text-sm rounded-md text-status-blacklisted border border-status-blacklisted">
            BLACKLIST USER
          </button>
          <button className="px-3 py-1 cursor-pointer font-semibold text-sm rounded-md text-secondary-400 border border-secondary-400">
            ACTIVATE USER
          </button>
        </div>
      </header>
      <div className="flex items-center flex-col xl:w-[963px] w-full md:w-[70%] xl:h-[210px] h-[275px] xl:px-0 px-6">
        <article className="w-full h-full px-6 xl:pl-6 xl:pr-10 pb-0 pt-6 bg-white border border-primary-500/6 rounded-sm shadow-md">
          <div className="flex flex-col justify-between h-full w-full">
            <div className="xl:flex hidden flex-row gap-x-10 items-center">
              <div className="flex-row flex gap-x-4 items-center">
                <span className="xl:h-[100px] xl:w-[100px] h-[70px] w-[70px] rounded-[50%] bg-cover bg-center bg-primary-500/16 flex justify-center items-center">
                  <label htmlFor="pic" className="cursor-pointer">
                    <i className="fa-regular fa-user text-primary-500 xl:text-[40px] text-[30px]"></i>
                  </label>
                  <input className="hidden" type="file" id="pic" />
                </span>
                <div className="inline-flex flex-col items-start font-sans">
                  <h1 className="text-primary-500 font-medium xl:text-[22px] text-[18px]">
                    {user.profile.personal.full_name}
                  </h1>
                  <h5 className="text-primary-400 text-sm font-normal">
                    {user.user_id}
                  </h5>
                </div>
              </div>
              <div className="flex flex-col gap-y-1 items-start justify-center border border-primary-500/20 h-[80px] border-b-0 border-t-0 px-10">
                <h3 className="font-medium text-sm text-primary-400">
                  User&apos;s Tier
                </h3>
                <ul className="flex flex-row gap-x-1">
                  {user.tier === "basic" ? (
                    <>
                      <li>
                        <i className="fa-solid fa-star text-status-pending text-sm"></i>
                      </li>
                      <li>
                        <i className="fa-regular fa-star text-status-pending text-sm"></i>
                      </li>
                      <li>
                        <i className="fa-regular fa-star text-status-pending text-sm"></i>
                      </li>
                    </>
                  ) : null}
                </ul>
              </div>
              <div className="flex flex-col gap-y-1 items-start">
                <h1 className="font-medium text-[22px] text-primary-500">
                  &#8358;{(user.profile.history.savings).toLocaleString()}
                </h1>
                <h5 className="font-normal text-primary-500 text-[12px]">{`${user.acct_no ?? 0}/${user.bank_name ?? 1}`}</h5>
              </div>
            </div>
            {/* template for small screen  */}
            <div className="flex xl:hidden flex-col items-center gap-y-7 relative">
              <i
                onClick={showDetailsTabModalHandler}
                className="fa-solid fa-ellipsis-vertical text-xl absolute right-0 top-3 cursor-pointer text-gray-500"
              ></i>
              <div className="flex-row flex gap-x-2 items-center">
                <span className="xl:h-[100px] xl:w-[100px] h-[70px] w-[70px] rounded-[50%] bg-cover bg-center bg-primary-500/16 flex justify-center items-center">
                  <label htmlFor="pic" className="cursor-pointer">
                    <i className="fa-regular fa-user text-primary-500 xl:text-[40px] text-[30px]"></i>
                  </label>
                  <input className="hidden" type="file" id="pic" />
                </span>
                <div className="inline-flex flex-col items-start font-sans">
                  <h1 className="text-primary-500 font-medium xl:text-[22px] text-[18px]">
                    {user.profile.personal.full_name}
                  </h1>
                  <h5 className="text-primary-400 text-sm font-normal">
                    {user.user_id}
                  </h5>
                </div>
              </div>
              <div className="flex flex-col gap-y-1 items-center">
                <h1 className="font-medium text-[22px] text-primary-500">
                  &#8358;{(user.profile.history.savings).toLocaleString()}
                </h1>
                <h5 className="font-normal text-primary-500 text-[12px]">{`${user.acct_no ?? 0}/${user.bank_name ?? 1}`}</h5>
              </div>

              <div className="flex flex-col gap-y-1 items-center justify-center">
                <h3 className="font-medium text-sm text-primary-400">
                  User&apos;s Tier
                </h3>
                <ul className="flex flex-row gap-x-1">
                  {user.tier === "basic" ? (
                    <>
                      <li>
                        <i className="fa-solid fa-star text-status-pending text-sm"></i>
                      </li>
                      <li>
                        <i className="fa-regular fa-star text-status-pending text-sm"></i>
                      </li>
                      <li>
                        <i className="fa-regular fa-star text-status-pending text-sm"></i>
                      </li>
                    </>
                  ) : null}
                </ul>
              </div>
            </div>
            {/* template for small screen  */}
            <ul className="xl:flex hidden flex-row justify-between w-full">
              {[
                "General Details",
                "Documents",
                "Bank Details",
                "Loans",
                "Savings",
                "App and System",
              ].map((item, i) => (
                <li
                  key={i}
                  className={`${
                    i === 0 ? "active" : ""
                  } text-black/60 text-[16px] font-normal cursor-pointer`}
                >
                  <div className="w-[154px] h-[29px] flex items-center justify-center">
                    <h4 className="font-mono font-normal">{item}</h4>
                  </div>
                </li>
              ))}
            </ul>
            {isDetailsTabModalOpen && (
              <DetailsTabModal
                styleClasses="right-[238px] top-[21rem] w-[200px]"
                onClose={() =>
                  hideModalHandler(
                    "user-details",
                    setIsDetailsTabModalOpen,
                    "Right"
                  )
                }
              >
                <ul className="flex flex-col gap-y-3 w-full">
                  {[
                    "General Details",
                    "Documents",
                    "Bank Details",
                    "Loans",
                    "Savings",
                    "App and System",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className={`${
                        i === 0 ? "active-sm" : ""
                      } text-black/60 text-[16px] font-normal cursor-pointer`}
                    >
                      <button className="w-[145px] h-[29px] flex items-start justify-center">
                        <h4 className="font-mono font-normal text-start">
                          {item}
                        </h4>
                      </button>
                    </li>
                  ))}
                </ul>
              </DetailsTabModal>
            )}
          </div>
        </article>
      </div>
      <div className="flex items-center flex-col xl:w-[963px] w-full md:w-[70%] xl:h-[910px] h-fit xl:px-0 px-6">
        <article className="w-full h-full px-6 xl:pl-6 xl:pr-10 pb-0 pt-6 pb-6 bg-white border border-primary-500/6 rounded-sm shadow-md">
          <section className="flex flex-col items-startn gap-y-7">
            <header>
              <h4 className="font-medium text-[16px] text-primary-500">
                Personal Information
              </h4>
            </header>
            <div className="flex xl:flex-row flex-col flex-wrap justify-start gap-x-20 gap-y-7 border border-t-0 border-l-0 border-r-0 border-primary-500/10 pb-7">
              <div className="inline-flex flex-col items-start text-primary-400 gap-y-2">
                <h5 className="font-normal text-[12px]">FULL NAME</h5>
                <h4 className="font-medium text-[16px]">
                  {user.profile.personal.full_name}
                </h4>
              </div>
              <div className="inline-flex flex-col items-start text-primary-400 gap-y-2">
                <h5 className="font-normal text-[12px]">PHONE NUMBER</h5>
                <h4 className="font-medium text-[16px]">
                  {user.profile.personal.mobile}
                </h4>
              </div>
              <div className="inline-flex flex-col items-start text-primary-400 gap-y-2">
                <h5 className="font-normal text-[12px]">EMAIL ADDRESS</h5>
                <h4 className="font-medium text-[16px]">
                  {user.profile.personal.email}
                </h4>
              </div>
              <div className="inline-flex flex-col items-start text-primary-400 gap-y-2">
                <h5 className="font-normal text-[12px]">BVN</h5>
                <h4 className="font-medium text-[16px]">
                  {user.profile.personal.bvn ?? 0}
                </h4>
              </div>
              <div className="inline-flex flex-col items-start text-primary-400 gap-y-2">
                <h5 className="font-normal text-[12px]">GENDER</h5>
                <h4 className="font-medium text-[16px]">
                  {(user.profile.personal.gender)[0].toUpperCase() +
                    (user.profile.personal.gender).slice(1)}
                </h4>
              </div>
              <div className="inline-flex flex-col items-start text-primary-400 gap-y-2">
                <h5 className="font-normal text-[12px]">MARITAL STATUS</h5>
                <h4 className="font-medium text-[16px]">
                  {(user.profile.personal.marital_status)[0].toUpperCase() +
                    (user.profile.personal.marital_status).slice(1)}
                </h4>
              </div>
              <div className="inline-flex flex-col items-start text-primary-400 gap-y-2">
                <h5 className="font-normal text-[12px]">CHILDREN</h5>
                <h4 className="font-medium text-[16px]">
                  {user.profile.personal.dependents}
                </h4>
              </div>
              <div className="inline-flex flex-col items-start text-primary-400 gap-y-2">
                <h5 className="font-normal text-[12px]">TYPE OF RESIDENCE</h5>
                <h4 className="font-medium text-[16px]">
                  {(user.profile.personal.residence_type)[0].toUpperCase() +
                    (user.profile.personal.residence_type).slice(1)}
                </h4>
              </div>
            </div>
          </section>
          <section className="flex flex-col items-startn gap-y-7 pt-7">
            <header>
              <h4 className="font-medium text-[16px] text-primary-500">
                Education and Employment
              </h4>
            </header>
            <div className="flex xl:flex-row flex-col flex-wrap justify-start gap-x-23 gap-y-7 border border-t-0 border-l-0 border-r-0 border-primary-500/10 pb-7">
              <div className="inline-flex flex-col items-start text-primary-400 gap-y-2">
                <h5 className="font-normal text-[12px]">LEVEL OF EDUCATION</h5>
                <h4 className="font-medium text-[16px]">
                  {user.profile.history.education_level}
                </h4>
              </div>
              <div className="inline-flex flex-col items-start text-primary-400 gap-y-2">
                <h5 className="font-normal text-[12px]">EMPLOYMENT STATUS</h5>
                <h4 className="font-medium text-[16px]">
                  {user.profile.history.employment_status} 
                </h4>
              </div>
              <div className="inline-flex flex-col items-start text-primary-400 gap-y-2">
                <h5 className="font-normal text-[12px]">SECTOR OF EMLOYMENT</h5>
                <h4 className="font-medium text-[16px]">
                  {user.profile.history.employment_sector}
                </h4>
              </div>
              <div className="inline-flex flex-col items-start text-primary-400 gap-y-2">
                <h5 className="font-normal text-[12px]">
                  DURATION OF EMPLOYMENT
                </h5>
                <h4 className="font-medium text-[16px]">
                  {user.profile.history.employment_duration}
                </h4>
              </div>
              <div className="inline-flex flex-col items-start text-primary-400 gap-y-2">
                <h5 className="font-normal text-[12px]">OFFICE EMAIL</h5>
                <h4 className="font-medium text-[16px]">
                  {user.profile.history.office_email}
                </h4>
              </div>
              <div className="inline-flex flex-col items-start text-primary-400 gap-y-2">
                <h5 className="font-normal text-[12px]">MONTHLY INCOME</h5>
                <h4 className="font-medium text-[16px]">
                  &#8358;{(user.profile.history.income ?? 0).toLocaleString()}
                </h4>
              </div>
              <div className="inline-flex flex-col items-start text-primary-400 gap-y-2">
                <h5 className="font-normal text-[12px]">LOAN REPAYMENT</h5>
                <h4 className="font-medium text-[16px]">
                  {(user.profile.history.interest ?? 0) .toLocaleString()}
                </h4>
              </div>
            </div>
          </section>
          <section className="flex flex-col items-startn gap-y-7 pt-7">
            <header>
              <h4 className="font-medium text-[16px] text-primary-500">
                Socials
              </h4>
            </header>
            <div className="flex xl:flex-row flex-col flex-wrap justify-start gap-x-23 gap-y-7 border border-t-0 border-l-0 border-r-0 border-primary-500/10 pb-7">
              <div className="inline-flex flex-col items-start text-primary-400 gap-y-2">
                <h5 className="font-normal text-[12px]">TWITTER/X</h5>
                <h4 className="font-medium text-[16px]">
                  {user.profile.socials.twitter}
                </h4>
              </div>
              <div className="inline-flex flex-col items-start text-primary-400 gap-y-2">
                <h5 className="font-normal text-[12px]">FACEBOOK</h5>
                <h4 className="font-medium text-[16px]">
                  {user.profile.socials.facebook}
                </h4>
              </div>
              <div className="inline-flex flex-col items-start text-primary-400 gap-y-2">
                <h5 className="font-normal text-[12px]">INSTAGRAM</h5>
                <h4 className="font-medium text-[16px]">
                  {user.profile.socials.instagram}
                </h4>
              </div>
            </div>
          </section>
          <section className="flex flex-col items-startn gap-y-7 pt-7">
            <header>
              <h4 className="font-medium text-[16px] text-primary-500">
                Guarantor
              </h4>
            </header>
            {user.profile.guarantor.map(
              (g: any, index: number, guarantor: any[]) => (
                <div
                  key={index}
                  className={`${
                    index === guarantor.length - 1
                      ? "border-none"
                      : "border border-t-0 border-l-0 border-r-0 border-primary-500/10 pb-7"
                  } flex xl:flex-row flex-col flex-wrap justify-start gap-x-23 gap-y-7`}
                >
                  <div className="inline-flex flex-col items-start text-primary-400 gap-y-2">
                    <h5 className="font-normal text-[12px]">FULL NAME</h5>
                    <h4 className="font-medium text-[16px]">{g.full_name}</h4>
                  </div>
                  <div className="inline-flex flex-col items-start text-primary-400 gap-y-2">
                    <h5 className="font-normal text-[12px]">PHONE NUMBER</h5>
                    <h4 className="font-medium text-[16px]">{g.mobile}</h4>
                  </div>
                  <div className="inline-flex flex-col items-start text-primary-400 gap-y-2">
                    <h5 className="font-normal text-[12px]">EMAIL ADDRESS</h5>
                    <h4 className="font-medium text-[16px]">{g.email}</h4>
                  </div>
                  <div className="inline-flex flex-col items-start text-primary-400 gap-y-2">
                    <h5 className="font-normal text-[12px]">RELATIONSHIP</h5>
                    <h4 className="font-medium text-[16px]">
                      {(g.relationship)[0].toUpperCase() +
                        (g.relationship).slice(1)}
                    </h4>
                  </div>
                </div>
              )
            )}
          </section>
        </article>
      </div>
    </main>
  );
}
