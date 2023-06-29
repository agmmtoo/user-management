import { Outlet } from "react-router-dom";

import { Nav } from "../components/Nav";

function Home() {
  return (
    <>
      <Nav />
      <main className="p-1 md:w-2/3 mx-auto">
        <Outlet />
      </main>
    </>
  );
}

export default Home;
