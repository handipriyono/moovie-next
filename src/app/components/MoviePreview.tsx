import Image from "next/image";
import Poster from "../../../public/poster.webp";

type TPreview = {
  title: string;
  description: string;
  customStyle?: React.CSSProperties;
};

const MoviePreview = ({ title, description, customStyle }: TPreview) => {
  return (
    <div className="bg-gradient-to-tl from-purple-900 to-green-700 relative">
      <Image
        src={Poster}
        quality={100}
        style={{ ...customStyle }}
        className="mix-blend-overlay object-cover h-[350px] w-[100%]"
        alt="avatar movie"
      />
      <div className="left-[50px] top-[30px] md:top-[50px] md:left-[70px] absolute">
        <h2 className="text-1xl md:text-2xl lg:text-5xl font-bold text-white uppercase ">
          {title}
        </h2>
        <p className="text-white max-w-[300px] md:max-w-[600px] bg-gray-800 bg-opacity-75">
          {description}
        </p>
      </div>
    </div>
  );
};

export default MoviePreview;
