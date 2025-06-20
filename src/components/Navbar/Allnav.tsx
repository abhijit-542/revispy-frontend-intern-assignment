import DesktopNav from "./Desktop";
import MobileNav from "./Mobile";
import Offer from "./Offer";

const Allnav = () => {
  return (
    <>
      <header>
        <section className="xl:block hidden">
          <DesktopNav />
        </section>
        <section className="container px-6 mx-auto xl:hidden block">
          <MobileNav />
        </section>
        <Offer />
      </header>
    </>
  );
};

export default Allnav;
