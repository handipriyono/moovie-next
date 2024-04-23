import { useTranslations } from "next-intl";
import MovieList from "@/app/components/MovieList";

type TFavPage = {
  params: {
    locale: string;
  };
};

export const metadata = {
  title: "List of Favorites Movie",
  description:
    "List of favorites movies with information regarding release date, actors, and etc",
};

export default function Favorites({ params }: TFavPage) {
  const t = useTranslations("Index");
  return (
    <div className="bg-gray-900 py-8 px-5 min-h-screen ">
      <MovieList locale={params?.locale} fromFav />
    </div>
  );
}
