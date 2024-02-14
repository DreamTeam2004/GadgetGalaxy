import Link from "next/link";

import LogoIcon from "@/assets/images/logo.svg";

import  "./Logo.scss";

const Logo = ({ color }: { color: string }) => {
  return (
    <Link href={"/"} className="logo">
      <LogoIcon className="logo__img" />
      <div className="logo__text">
        <p className="logo__text" style={{ color }}>
          <span className="logo__text-first">GADGET</span>GALAXY
        </p>
      </div>
    </Link>
  );
};

export default Logo;
