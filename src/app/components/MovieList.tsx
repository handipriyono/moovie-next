import ItemBox from "./ItemBox";

type TMovieList = {
  locale?: string;
  fromFav?: boolean;
};

async function getMovies(fromFav?: boolean) {
  try {
    if (fromFav) {
      return;
    }
    const res = await fetch(
      `https://private-2fff44-bncfetest.apiary-mock.com/movies`
    );
    return res.json();
  } catch (error) {
    return undefined;
  }
}

const MovieList = async ({ locale, fromFav }: TMovieList) => {
  const movies = await getMovies(fromFav);

  return <ItemBox movies={movies?.data} locale={locale} fromFav={fromFav} />;
};

export default MovieList;
