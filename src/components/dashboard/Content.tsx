export default function Content({ data }: any) {
  let activeUsers: number[] = [];
  let usersWithLoans: number[] = [];

  const users = data.userData as any[];

  //extracting data from api
  for (const user of users) {
    if (user.profile.status === "active") {
      activeUsers.push(user.profile.status);
    }
    usersWithLoans.push(user.profile.history.interest);
  }

  return (
    <section className="lg:pl-[340px] lg:pr-12 lg:pt-[175px] lg:pb-12 pb-8 pt-[155px] px-12 min-h-screen flex flex-col gap-y-10">
      <header className="font-medium text-2xl text-primary-500 font-sans">
        {data.sectionName[0].toUpperCase() + data.sectionName.slice(1)}
      </header>
      <div className="flex lg:flex-row flex-col lg:gap-x-6 gap-y-6">
        <span className="lg:w-[240px] w-full flex flex-col items-start gap-y-3 px-6 py-4 h-[160px] bg-white border border-primary-500/6 rounded-sm shadow-md">
          <span className="h-[37px] w-[37px] flex items-center justify-center rounded-full bg-dashboard-users/8">
            <i className="fa-solid fa-users text-dashboard-users text-lg"></i>
          </span>
          <h4 className="font-sans font-medium text-primary-400 text-sm">
            USERS
          </h4>
          <h3 className="font-sans font-semibold text-primary-500 text-lg">
            {data.userData.length.toLocaleString()}
          </h3>
        </span>
        <span className="lg:w-[240px] w-full flex flex-col items-start gap-y-4 px-6 py-4 h-[160px] bg-white border border-primary-500/6 rounded-sm shadow-md">
          <span className="h-[37px] w-[37px] flex items-center justify-center rounded-full bg-dashboard-active/8">
            <i className="fa-solid fa-users text-dashboard-active text-lg"></i>
          </span>
          <h4 className="font-sans font-medium text-primary-400 text-sm">
            ACTIVE USERS
          </h4>
          <h3 className="font-sans font-semibold text-primary-500 text-lg">
            {activeUsers.length.toLocaleString()}
          </h3>
        </span>
        <span className="lg:w-[240px] w-full flex flex-col items-start gap-y-3 px-6 py-4 h-[160px] bg-white border border-primary-500/6 rounded-sm shadow-md">
          <span className="h-[37px] w-[37px] flex items-center justify-center rounded-full bg-dashboard-loans/8">
            <i className="fa-solid fa-file-invoice text-dashboard-loans text-lg"></i>
          </span>
          <h4 className="font-sans font-medium text-primary-400 text-sm">
            USERS WITH LOANS
          </h4>
          <h3 className="font-sans font-semibold text-primary-500 text-lg">
            {usersWithLoans.length.toLocaleString()}
          </h3>
        </span>
        <span className="lg:w-[240px] w-full flex flex-col items-start gap-y-3 px-6 py-4 h-[160px] bg-white border border-primary-500/6 rounded-sm shadow-md">
          <span className="h-[37px] w-[37px] flex items-center justify-center rounded-full bg-dashboard-savings/8">
            <i className="fa-solid fa-coins text-dashboard-savings text-lg"></i>
          </span>
          <h4 className="font-sans font-medium text-primary-400 text-sm">
            USERS WITH SAVINGS
          </h4>
          <h3 className="font-sans font-semibold text-primary-500 text-lg">
            {3}
          </h3>
        </span>
      </div>
      <article className="bg-white font-sans text-primary-500 p-6 border border-primary-500/6 rounded-sm shadow-md lg:w-[962px] h-[640px] w-full">
        <header>
          <ul className="flex flex-row gap-x-4 font-semibold text-[12px]">
            {users.map((user, i) => {
              if (i < 2) {
                return (
                  <li key={i}>
                    <div className="flex flex-row gap-x-2 items-center">
                      <h5>{Object.keys(user)[0].toUpperCase()}</h5>
                      <i className="fa-solid fa-filter"></i>
                    </div>
                  </li>
                );
              }
              if (i > 1 && i < 4) {
                if (
                  Object.keys(user.profile.personal)[0] === "email" ||
                  Object.keys(user.profile.personal)[0] === "mobile"
                ) {
                  return (
                    <li key={i}>
                      <div className="flex flex-row gap-x-2 items-center">
                        <h5>
                          {Object.keys(user.profile.personal)[0].toUpperCase()}
                        </h5>
                        <i className="fa-solid fa-filter"></i>
                      </div>
                    </li>
                  );
                }
              }
            })}
          </ul>
        </header>
      </article>
    </section>
  );
}
