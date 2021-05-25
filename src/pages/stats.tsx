import { IDonation } from "@libs/types";
import { GetServerSidePropsContext, NextPage } from "next";

const stats: NextPage<{ donations: IDonation[] }> = ({ donations }) => {
  const getTotalDonation = (): String => {
    const totalAmount = donations.reduce(
      (acc, donation) => acc + donation.amount,
      0
    );
    return `${totalAmount}$`;
  };

  return (
    <div className="grid h-full p-5 md:grid-cols-2 lg:px-24">
      <div className="flex flex-col justify-center space-y-3">
        <div className="items-center w-10/12 mx-auto textBlock-wrapper bg-gray-dark md:py-14">
          <h1 className="mb-4 text-2xl textBlock-title text-yellow md:text-5xl">
            Total Donations
          </h1>
          <span className="px-6 py-4 text-2xl md:text-3xl bg-gray-light">
            {getTotalDonation()}
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-center space-y-3 text-center">
        <h1 className="mb-4 text-2xl textBlock-title text-yellow md:text-5xl">
          Last 5 donators
        </h1>
        {donations.map((donation, i) => (
          <div
            className="flex justify-between px-6 py-4 text-xl bg-gray-dark "
            key={i}
          >
            <span>{donation.name}</span>
            <span>{donation.amount} $</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default stats;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let data;
  try {
    const res = await fetch("http://localhost:3001/api/donation");
    data = await res.json();
  } catch (error) {
    console.log(error);
  }
  console.log("server side props function called");

  return {
    props: {
      donations: data,
    }, // will be passed to the page component as props
  };
}
