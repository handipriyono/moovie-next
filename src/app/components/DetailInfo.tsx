import { Rate } from "antd";
import BackHome from "./Back";
import ImagePopup from "./ImagePopup";

type TDetailInfo = {
  description: string;
  slug: string;
};

type TGetMovies = {
  id: string;
};

async function getMovies({ id }: TGetMovies) {
  try {
    const res = await fetch(
      `https://private-2fff44-bncfetest.apiary-mock.com/movies/${id}`
    );
    return res.json();
  } catch (error) {
    return undefined;
  }
}

const DetailInfo = async ({ description, slug }: TDetailInfo) => {
  const detail = await getMovies({ id: slug });

  const features = [
    { name: "", type: "image", description: detail?.data?.imageLargeUrl },
    { name: "Desc", description: detail?.data?.desc },
    { name: "Release Date", description: detail?.data?.releaseDate },
    { name: "Duration", description: detail?.data?.duration },
    { name: "Starring", description: detail?.data?.starring?.join(", ") },
    { name: "Genre", description: detail?.data?.genre },
  ];

  return (
    <>
      <div className="bg-white">
        <div aria-hidden="true" className="relative">
          <img
            src={detail?.data?.imageLargeUrl}
            alt="image-large"
            className="h-96 w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white" />
        </div>

        <div className="relative mx-auto -mt-12 max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
          <div className="z-50 p-3">
            <BackHome />
          </div>
          <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {detail?.data?.title} ({detail?.data?.year})
            </h2>
            <p className="mt-4 text-gray-500">{description}</p>
            <Rate disabled defaultValue={detail?.data?.rating} />
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
            {features?.map((feature) => (
              <div
                key={feature?.name}
                className="border-t border-gray-200 pt-4"
              >
                <dt className="font-medium text-gray-900">{feature?.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">
                  {feature?.type === "image" ? (
                    <ImagePopup imageUrl={feature?.description} />
                  ) : (
                    feature?.description
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  );
};

export default DetailInfo;
