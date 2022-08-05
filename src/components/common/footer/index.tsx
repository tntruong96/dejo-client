import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { FooterContainer } from "./style";

enum SocialLabels {
  ins = "Instagram",
  fac = "Facebook",
}

const socials = [
  {
    label: SocialLabels.ins,
    link: "/",
  },
  {
    label: SocialLabels.fac,
    link: "/",
  },
];

const abouts = [
  {
    label: "De Jo",
    link: "/about",
  },
  {
    label: "Contact",
    link: "#",
  },
  {
    label: "Careers",
    link: "#",
  },
];

const helps = [
  {
    label: "Shipping and Returns",
    link: "#",
  },
  {
    label: "Customer service",
    link: "#",
  },
  {
    label: "FAQ",
    link: "#",
  },
];

const legals = [
  {
    label: "Terms & Conditions",
    link: "#",
  },
  {
    label: "Privacy Policy",
    link: "#",
  },
];

const Footer = () => {
  return (
    <FooterContainer className="flex flex-col items-center justify-center w-full mt-5">
      <ol className="w-full flex flex-wrap md:justify-evenly p-5">
        <li className="w-full md:w-2/6 flex flex-col items-center md:items-start  my-2">
          <h3>NEWSLETTER</h3>
          <form className="w-full sm:w2/3 flex flex-col justify-center items-center pr-5">
            <input placeholder="EMAIL" className="w-full" />
            <div className="w-full m-2">
              <button className="btn">Subscribe</button>
            </div>
          </form>
        </li>
        <li className="w-1/2 md:w-1/6 my-2 px-5">
          <h3>ABOUT</h3>
          <ol>
            {abouts.map((about, index) => (
              <li key={index}>
                <Link href={about.link} passHref>
                  <a>{about.label}</a>
                </Link>
              </li>
            ))}
          </ol>
        </li>
        <li className="w-1/2 md:w-1/6 my-2 px-5">
          <h3>SOCIAL</h3>
          <ol className="flex flex-col">
            {socials.map((social, index) => (
              <li key={index}>
                <Link href={social.link} passHref>
                  <a>{social.label}</a>
                </Link>
              </li>
            ))}
          </ol>
        </li>
        <li className="w-1/2 md:w-1/6 my-2 px-5">
          <h3>HELP</h3>
          <ol className="flex flex-col">
            {helps.map((help, index) => (
              <li key={index}>
                <Link href={help.link} passHref>
                  <a>{help.label}</a>
                </Link>
              </li>
            ))}
          </ol>
        </li>
        <li className="w-1/2 md:w-1/6 my-2 px-5">
          <h3>LEGAL</h3>
          <ol className="flex flex-col">
            {legals.map((legal, index) => (
              <li key={index}>
                <Link href={legal.link} passHref>
                  <a>{legal.label}</a>
                </Link>
              </li>
            ))}
          </ol>
        </li>
      </ol>
      <span>
        Copyright <FontAwesomeIcon icon={faCopyright} /> 2022 De Jo Sai Gon
      </span>
    </FooterContainer>
  );
};

export default Footer;
