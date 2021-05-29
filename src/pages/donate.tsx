import { FunctionComponent, useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";

export const Amount: FunctionComponent<{
  amount: Number;
  setAmount: Function;
  value: Number;
}> = ({ amount, setAmount, value }) => {
  return (
    <span
      className={`px-4 py-2 text-lg cursor-pointer bg-gray-light ${
        amount === value ? "border-2 border-yellow " : ""
      }`}
      onClick={() => setAmount(value)}
    >
      {value}$
    </span>
  );
};

const donate = () => {
  const [amount, setAmount] = useState(10);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const addPaypalScript = () => {
    if (window.paypal) {
      setScriptLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AVPyo3Wmhkoq63w0Y-bynoixOPf_Zs0Am_SpZEwJum_6HnGCknQXwf7TT43GrlJ4lFu--p7ZhXLfqQT5";

    script.type = "text/javascript";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  };

  useEffect(() => {
    addPaypalScript();
  }, []);

  const addDonationInDB = async (name: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/donation`,
        {
          method: "POST",
          body: JSON.stringify({
            name,
            amount,
          }),
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid h-full gap-5 p-5 md:grid-cols-2 lg:px-24">
      <div className="textBlock-wrapper">
        <h1 className="mb-4 text-2xl textBlock-title md:text-6xl">
          You can <span className="font-bold text-yellow">Help</span>
        </h1>
        <p className="textBlock-subtitle">
          To save please send your contribution to our fund & keep the series
          alive
        </p>
      </div>

      <div className="grid place-items-center">
        <div className="flex flex-col items-center w-10/12 px-4 py-6 mx-auto space-y-4 rounded-md bg-gray-dark">
          <h1 className="textBlock-title">Donate Box</h1>
          <p className="textBlock-subtitle">Any amount will be appreciated</p>
          <div className="flex space-x-10">
            <Amount amount={amount} setAmount={setAmount} value={1} />
            <Amount amount={amount} setAmount={setAmount} value={5} />
            <Amount amount={amount} setAmount={setAmount} value={10} />
          </div>

          {scriptLoaded ? (
            <PayPalButton
              amount={amount}
              onSuccess={(details, data) => {
                console.log(details);
                addDonationInDB(details.payer.name.given_name);
              }}
            />
          ) : (
            <span>loading...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default donate;

//
// z2hQbPDQaLkSOC1N
