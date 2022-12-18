import { useEffect, useState } from "react";
import { GET_TOP_ANIMES } from "./apis/GET";
import "./App.css";
import { CardProps } from "./components/Card";
import { CardGrid } from "./components/CardGrid";
import { Chart } from "./components/Chart";

function App() {
  const [cardList, setCardList] = useState<CardProps[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  const getTopAnimes = async () => {
    const res = await fetch(GET_TOP_ANIMES);
    const resJson = await res.json();

    const formatterCardList: CardProps[] = await resJson?.data?.map(
      (item: any) => ({
        rank: item?.rank,
        title: item?.title,
        imageUrl: item?.images?.jpg?.image_url,
        releaseDate: item?.year,
        latestDate: item?.aired?.to,
        rated: item?.rating,
      })
    );
    const formattedChartData: {
      year: number;
      animes: number;
      titles: string[];
    }[] = [];
    await resJson?.data?.map((item: any) => {
      let found = false;
      formattedChartData.map((obj, index) => {
        if (obj?.year === item?.year) {
          formattedChartData[index].animes += 1;
          formattedChartData[index].titles.push(item?.title);
          found = true;
        }
      });
      if (!found) {
        formattedChartData.push({
          year: item?.year,
          animes: 1,
          titles: [item?.title],
        });
      }
    });
    formattedChartData.sort((a, b) => a.year - b.year);
    console.log(formattedChartData);

    setCardList(formatterCardList);
    setChartData(formattedChartData);
  };

  useEffect(() => {
    getTopAnimes();
  }, []);

  return (
    <div className="App">
      {cardList.length === 0 ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <CardGrid data={cardList} maxLimit={20} />
          <div className="chart-container">
            <Chart data={chartData} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
