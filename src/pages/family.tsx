// import { quotes } from "@libs/data";
import { IQuote } from "@libs/types";
import { GetStaticPropsContext, NextPage } from "next";
import Image from "next/image";

const family: NextPage<{ quotes: IQuote[] }> = ({ quotes }) => {
  return (
    <div className="grid h-full gap-5 p-5 md:grid-cols-2 lg:px-24">
      <div className="textBlock-wrapper">
        <h1 className="mb-4 text-2xl textBlock-title text-yellow md:text-5xl">
          <span className="font-bold text-yellow">Family &</span> Friends
        </h1>
        <p className="textBlock-subtitle">Notes from family & friends</p>
      </div>

      <div className="flex flex-col justify-center space-y-3">
        {quotes.map((quote) => (
          <div className="flex p-3 px-6 space-x-3 text-sm rounded-lg md:text-base bg-gray-dark">
            <div className="flex-shrink-0 text-center">
              <div>
                <Image
                  src={quote.pictureURL}
                  width={60}
                  height={60}
                  className="rounded-full"
                  objectFit="cover"
                  quality={100}
                />
              </div>

              <span className="mt-1">{quote.name}</span>
            </div>
            <p>{quote.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default family;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  let data;
  try {
    const res = await fetch(`${process.env.VERCEL_URL}/api/quotes`);
    data = await res.json();
  } catch (error) {
    console.log(error);
  }
  console.log("I am called");

  return {
    props: {
      quotes: data ?? [],
    },
    revalidate: 20,
  };
};
