"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import { Rate, Col, Row } from "antd";
import { Spin } from "antd";
import Link from "next/link";
import EmptyFav from "./EmptyFav";

type TMovie = {
  id: number;
  title: string;
  year: number;
  rating: number;
  imageUrl: string;
};

type TItemBox = {
  movies: Array<TMovie>;
  locale?: string;
  fromFav?: boolean;
};

const ItemBox = ({ movies, locale, fromFav }: TItemBox) => {
  const loaderRef = useRef(null);
  const [page, setPage] = useState(1);
  const [trigger, setTrigger] = useState(false);

  const favMovie = () => {
    const dataLocal = localStorage.getItem("favMovies");
    const parsedLocal = dataLocal ? JSON.parse(dataLocal) : [];
    return parsedLocal;
  };

  let movieList = fromFav ? favMovie() : movies;
  const dataMovies = movieList?.slice(0, page * 10);
  const isSame = dataMovies?.length === movieList?.length;

  const onFav = (item: TMovie) => {
    const prevStorage = localStorage.getItem("favMovies");
    const parsedStorage = prevStorage ? JSON.parse(prevStorage) : [];
    const isExist = parsedStorage.find((it: TMovie) => it.id === item.id);
    if (isExist) {
      const newStorage = parsedStorage.filter(
        (it: TMovie) => it.id !== item.id
      );
      localStorage.setItem("favMovies", JSON.stringify(newStorage));
    } else {
      localStorage.setItem(
        "favMovies",
        JSON.stringify([...parsedStorage, item])
      );
    }
    setTrigger((prev) => !prev);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        let setData;
        clearTimeout(setData);
        setData = setTimeout(() => {
          setPage((page) => page + 1);
        }, 1000);
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);

  const isFaved = (item: TMovie) => {
    const prevStorage = localStorage.getItem("favMovies");
    const parsedStorage = prevStorage ? JSON.parse(prevStorage) : [];
    const isExist = parsedStorage.find((it: TMovie) => it.id === item.id);
    if (isExist) {
      return true;
    } else {
      return false;
    }
  };

  return dataMovies?.length ? (
    <>
      <Row
        gutter={[16, { xs: 8, sm: 16, md: 24, lg: 24 }]}
        className="row-movie"
      >
        {dataMovies?.map((it: TMovie) => (
          <Col span={6} xs={24} lg={8} xl={6} md={12} key={it?.id}>
            <div className="z-0 transition-transform duration-200 transform md:hover:scale-90 hover:scale-100">
              <div className="relative min-h-[200px] ">
                <Link locale={false} href={`/${locale}/details/${it.id}`}>
                  <Image
                    src={it?.imageUrl}
                    fill
                    className="aspect-[14/13] w-full rounded-2xl object-cover"
                    alt="avatar movie"
                  />
                </Link>
              </div>
              <div className="flex justify-between items-center px-2 bg-gray-900 ">
                <div className="flex flex-col">
                  <div className="font-bold text-white leading-tight ">
                    <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-white">
                      {it?.title} ( {it?.year} )
                    </h3>
                  </div>
                  <div>
                    <Rate disabled defaultValue={it?.rating} />
                  </div>
                </div>
                <div className="z-50 p-3">
                  <HeartIcon
                    style={{ color: isFaved(it) ? "red" : "white" }}
                    onClick={() => onFav(it)}
                    className="h-6 w-6  hover:w-10 hover:h-10  transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      {trigger}
      <div
        className="flex justify-center items-center mt-6 pb-7 bg-gray-900"
        ref={loaderRef}
      >
        {!isSame && <Spin size="large" />}
      </div>
    </>
  ) : (
    <EmptyFav />
  );
};

export default ItemBox;
