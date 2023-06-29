import { Outlet } from "react-router-dom";

import { Nav } from "../components/Nav";

function Home() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Home;
