import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link, Outlet, useLoaderData, useParams } from "react-router";
import RighAside from "../components/homelayout/RighAside";
import { FaArrowLeft } from "react-icons/fa";

const NewsDetails = () => {
  const data = useLoaderData();
  const { id } = useParams();
  // console.log(id)
  const [news, setNews] = useState({});

  useEffect(() => {
    const singleNews = data.find((news) => news.id.includes(id));
    setNews(singleNews);
  }, [data, id]);
  // console.log(news)

  const { title, thumbnail_url, details, category_id } = news || {};
  return (
    <div className="w-11/12 mx-auto py-10">
      <header>
        <Header />
      </header>
      <main className="grid grid-cols-4 gap-5 ">
        <section className="col-span-3">
          <h2 className="text-xl font-semibold text-primary mb-4">
            Dragon News
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-4 ">
            <img
              src={thumbnail_url}
              alt={title}
              className="rounded-lg"
            />
            <h2 className="text-primary font-semibold text-2xl md:text-3xl">
              {title}
            </h2>
            <p className="text-accent">{details}</p>
            <Link
              to={`/category/${category_id}`}
              className="btn btn-secondary w-60"
            >
              <FaArrowLeft /> All news in this category
            </Link>
          </div>
        </section>
        <aside className="col-span-1">
          <RighAside />
        </aside>
      </main>
    </div>
  );
};

export default NewsDetails;
