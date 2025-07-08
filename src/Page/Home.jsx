import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { MdOutlineIosShare } from "react-icons/md";
import { Link } from "react-router-dom";

function Home() {
  useGSAP(() => {
    const timeline = gsap.timeline();

    timeline.from("#hero", {
      color: "black",
      opacity: 0,
      duration: 1,
      delay: 1,
      x: -30,
      stagger: 1,
    });

    timeline.from("#image", {
      color: "black",
      opacity: 0,
      duration: 1,
      delay: 1,
      x: 30,
      stagger: 0.5,
    });
  });
  return (
    <div className="w-full">
      <div className="flex justify-between items-start gap-5 flex-wrap sm:flex-nowrap mb-10">
        <div id="hero" className="w-full sm:w-1/2">
          <h1 className="text-3xl sm:text-7xl capitalize">
            Build and share <br />
            interactive stories <br /> on our platform
          </h1>
          <p className="mt-5">
            Just dropped! 🌟 Swipe left to get a sneak peek of our latest gem.
            Tap your favorite feature in the comments!
          </p>
          <div className="align-s">
            <Link
              to="/products"
              className="bg-[#45d8e0] py-2 px-10 text-white rounded mt-5 mr-5"
            >
              Product
            </Link>
            <button className="bg-gray-100 text-black py-2 px-4 font-mono rounded mt-5">
              Contact
            </button>
          </div>
        </div>
        <div id="image" className="w-full sm:w-1/2">
          <img
            src="src/asset/home.png"
            alt=""
            className="w-full h-[80vh] object-contain"
          />
        </div>
      </div>
      <div className="w-full h-full bg-gradient-to-t from-gray-100 to-white p-10 flex gap-10 flex-col items-center">
        <div className="sm:w-1/2 flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-6xl mb-5 capitalize">
            communication is at the heart of ecommerce and community
          </h1>
          <p className="text-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
            voluptatibus eveniet et possimus inventore nobis autem adipisci
            nihil distinctio repellendus.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 text-center gap-5">
          <div className="bg-[#3246cb] text-sm text-white min-h-65 p-6 flex flex-col justify-center">
            <div className="flex flex-col items-center gap-3">
              <HiOutlineDocumentSearch className="text-5xl" />
              <h1 className="text-2xl capitalize">
                Search Engine Optimization
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt, officiis.
              </p>
            </div>
          </div>
          <div className="bg-[#3246cb] text-sm text-white min-h-65 p-6 flex flex-col justify-center">
            <div className="flex flex-col items-center gap-3">
              <LiaBusinessTimeSolid className="text-5xl" />
              <h1 className="text-2xl capitalize">Paid media management</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt, officiis.
              </p>
            </div>
          </div>
          <div className="bg-[#3246cb] text-sm text-white min-h-65 p-6 flex flex-col justify-center">
            <div className="flex flex-col items-center gap-3">
              <MdOutlineIosShare className="text-5xl" />
              <h1 className="text-2xl capitalize">soical media management</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt, officiis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
