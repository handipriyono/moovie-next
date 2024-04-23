import { useTranslations } from "next-intl";
import MoviePreview from "../components/MoviePreview";
import MovieList from "../components/MovieList";

type THome = {
  params: { slug: string; locale?: string };
};

export default function Home({ params }: THome) {
  const t = useTranslations("Index");

  return (
    <main className="min-h-[1000px] bg-gray-900">
      <MoviePreview title={t("title-movie")} description={t("desc-movie")} />
      <div className="pt-5 px-3 bg-gray-900">
        <MovieList locale={params?.locale} fromFav={false} />
      </div>
    </main>
  );
}
