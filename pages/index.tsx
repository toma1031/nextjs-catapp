import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

interface SearchCatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface IndexPageProps {
  initialCatImage: string;
}

const fetchCatImage = async (): Promise<SearchCatImage> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const result = await res.json();
  // console.log(result[0]);
  return result[0];
};

const Home: NextPage<IndexPageProps> = ({ initialCatImage }) => {
  const [catImageUrl, setCatImageUrl] = useState(initialCatImage);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const catImage = await fetchCatImage();
    setCatImageUrl(catImage.url);
    setIsLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>Cat Image APP</h1>
      {isLoading ? (
        <Loader active size="huge" inline="centered" />
      ) : (
        <img src={catImageUrl} width={500} height="auto" />
      )}
      <button style={{ marginTop: 18 }} onClick={handleClick}>
        Today's Cat
      </button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  IndexPageProps
> = async () => {
  const catImage = await fetchCatImage();
  return {
    props: {
      initialCatImage: catImage.url,
    },
  };
};

export default Home;
