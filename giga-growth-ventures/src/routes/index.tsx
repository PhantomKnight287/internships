import { useState } from "react";
import { toast } from "react-toastify";
import { Chart } from "react-chartjs-2";
import Modal from "react-modal";
import { useUserStore } from "../context/user";
import { Navigate } from "react-router-dom";

export default function RootRoute() {
  const [stockName, setStockName] = useState("");
  const [dataState, setDataState] = useState<
    "neutral" | "loading" | "error" | "success"
  >("neutral");
  const [chartData, setChartData] = useState<
    Record<
      string,
      Record<
        "1. open" | "2. high" | "3. low" | "4. close" | "5. volume",
        string
      >
    >
  >({});
  const [email, setEmail] = useState("");
  const [opened, setOpened] = useState(false);
  const user = useUserStore((u) => u.user);

  async function fetchPrice() {
    setDataState("loading");
    const data = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockName}&interval=60min&apikey=${
        import.meta.env.VITE_alphavantage_key
      }`
    );
    const body = await data.json();
    if (!data.ok || body["Error Message"]) {
      setDataState("error");
      return;
    }
    setDataState("success");
    setChartData(body["Time Series (60min)"]);
  }

  if (!user) return <Navigate to="/login" />;
  return (
    <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <h1 className="text-6xl font-bold mt-8">
        Welcome to <span className="text-purple-600">StonksMail</span>
      </h1>
      <p className="mt-3 text-2xl">
        The best way to get prices of your favourite stocks
      </p>
      <div className="flex flex-col items-center justify-center mt-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!stockName) return toast.error("Please enter a stock name");
            fetchPrice();
          }}
        >
          <input
            type="text"
            placeholder="Enter stock name"
            className="border-2 border-gray-300 p-2 rounded-lg w-96 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            value={stockName}
            onChange={(e) => setStockName(e.target.value)}
          />
          <button
            type="submit"
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mt-2 lg:ml-8"
          >
            Get Price
          </button>
        </form>
      </div>
      {dataState === "loading" ? (
        <div className="flex flex-col items-center justify-center mt-8">
          <p className="text-2xl">Loading...</p>
        </div>
      ) : (
        <>
          {dataState === "error" ? (
            <div className="flex flex-col items-center justify-center mt-8">
              <p className="text-2xl">Error fetching data</p>
            </div>
          ) : null}
          {dataState === "success" ? (
            <div className="flex flex-col items-center justify-center mt-8 w-full">
              <Chart
                data={{
                  labels: Object.keys(chartData),
                  datasets: [
                    {
                      label: "Price(USD)",
                      data: Object.values(chartData).map((v) => v["4. close"]),
                      borderWidth: 1,
                      borderColor: "#9f7aea",
                      backgroundColor: "#9f7aea",
                    },
                  ],
                  xLabels: Object.keys(chartData).map((v) =>
                    new Date(v).toUTCString()
                  ),
                  yLabels: Object.values(chartData).map((v) => v["4. close"]),
                }}
                type="line"
                style={{ width: "100%", height: "100%" }}
                options={{
                  onClick: (event, element) => {
                    if (element.length > 0) {
                      setOpened(true);
                    }
                  },
                }}
              />
            </div>
          ) : null}
        </>
      )}
      <Modal
        isOpen={opened}
        onRequestClose={() => setOpened(false)}
        onAfterClose={() => setOpened(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          content: {
            width: "max-content",
            height: "max-content",
            inset: "auto",
          },
        }}
      >
        <div className="flex flex-col items-center justify-center mt-8">
          <p className="text-2xl">Enter your email to get notified</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!email) return toast.error("Please enter an email");
              window.open(
                `mailto:${email}?subject=Stock Price&body=The price of ${stockName} on ${
                  Object.keys(chartData)[0]
                } was ${Object.values(chartData)[0]["4. close"]}`
              );
            }}
          >
            <input
              type="text"
              placeholder="Enter email"
              className="border-2 border-gray-300 p-2 rounded-lg w-96 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              type="submit"
              className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mt-2 lg:ml-8"
            >
              Notify
            </button>
          </form>
        </div>
      </Modal>
    </main>
  );
}
