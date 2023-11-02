import React from "react";
import Link from "next/link";
import Image from "next/image";

import "@/assets/styles/style-components/Logo.scss";

import LogoIcon from "@/assets/images/logo.svg";

const Logo = ({ color }: { color: string }) => {
  return (
    <Link href={"/"} className="logo">
      <div>
        <LogoIcon width={44} height={44} className="logo-img" />
      </div>
      <div className="logo-text">
        <p className="logo-text" style={{ color }}>
          <span className="logo-text__first">GADGET</span>GALAXY
        </p>
      </div>
    </Link>
  );
};

export default Logo;
