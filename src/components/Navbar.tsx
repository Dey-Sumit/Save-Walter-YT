import Link from "next/link";
import { useRouter } from "next/router";
const Navbar = () => {
  const { pathname } = useRouter();
  // console.log({ pathname });

  return (
    <div
      className="flex items-center justify-between px-3 py-2 text-white lg:px-20"
      style={{ height: "10vh" }}
    >
      <Link href="/">
        <a>
          <div className="flex items-center space-x-4 cursor-pointer">
            <img
              src="/assets/logo.png"
              alt=""
              className="object-contain w-12 h-12"
            />
            <div className="hidden md:block">
              <p>Father,Husband and Teacher</p>
              <p>Save Mr. White</p>
            </div>
          </div>
        </a>
      </Link>

      <div className="flex space-x-6 text-base uppercase md:text-xl">
        <Link href="/donate">
          <a className={pathname === "/donate" ? "text-yellow " : ""}>Donate</a>
        </Link>
        <Link href="/stats">
          <a className={pathname === "/stats" ? "text-yellow " : ""}>stats</a>
        </Link>
        <Link href="/family">
          <a className={pathname === "/family" ? "text-yellow " : ""}>family</a>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
