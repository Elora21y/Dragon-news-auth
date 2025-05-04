import React from "react";
import { Outlet, useNavigation } from "react-router";
import Header from "../components/Header";
import LatestNews from "../components/LatestNews";
import Navbar from "../components/Navbar";
import LeftAside from "../components/homelayout/LeftAside";
import RighAside from "../components/homelayout/RighAside";
import Loading from "../components/Loading";

const HomeLayout = () => {
  const {state} = useNavigation()
  // const isNavigation = Boolean(navigation.location)
  // console.log(state)
  return (
    <div>
      <header>
        <Header></Header>
        <section className="w-11/12 mx-auto my-3">
          <LatestNews></LatestNews>
        </section>
      </header>
        <nav className="w-11/12 mx-auto my-3 sticky top-0 bg-white z-10 shadow-md">
          <Navbar></Navbar>
        </nav>
      <main className="w-11/12 mx-auto my-3  grid grid-cols-12 gap-5">
        <aside className="col-span-3 sticky top-15 h-fit ">
          <LeftAside></LeftAside>
        </aside>
        <section className="main col-span-6">
          {state == 'loading' ? <Loading/> : <Outlet></Outlet>}
        </section>
        <aside className="col-span-3 sticky top-15 h-screen overflow-y-auto">
          <RighAside></RighAside>
        </aside>
      </main>
    </div>
  );
};

export default HomeLayout;
