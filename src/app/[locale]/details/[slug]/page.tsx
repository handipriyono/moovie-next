import { useTranslations } from "next-intl";
import DetailInfo from "@/app/components/DetailInfo";

type TDetail = {
  params: { slug: string };
};

export const metadata = {
  title: "Detail of Movie",
  description: "List of details Movie with actors, pictures, synopsis",
};

export default function Details({ params }: TDetail) {
  const t = useTranslations("Detail");

  return (
    <div className="bg-white">
      <DetailInfo slug={params?.slug} description={t("description")} />
    </div>
  );
}
