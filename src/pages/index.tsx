import { useModuleClassNames } from "@utils/hooks/useStyle";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/modules/Home.module.scss";
import de_jo from "../../public/images/de_jo.jpeg";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight} from "@fortawesome/free-solid-svg-icons";
import { motion } from 'framer-motion';
import { slideInDown, slideInUp } from "animations";

interface Props {
  [key: string]: any;
}

const Home: NextPage<Props> = () => {
  const classModule = useModuleClassNames(styles);
  return (
    <motion.div  exit={{opacity:0}} initial="initial" animate="animate" className="flex flex-col justify-center items-center h-screen align-middle">
      {/* <span>DE JO SAI GON</span> */}
      <div className="flex flex-col sm:flex-row">
        <motion.div variants={slideInDown} className="flex-1 flex justify-end p-2 sm:p-10">
          <Image
            width={500}
            height={500}
            objectFit="cover"
            src={de_jo}
            alt=""
          />
        </motion.div>
        <motion.div variants={slideInUp} className={classNames("flex flex-col justify-center p-2 sm:p-10 flex-1", classModule('text-intro'))}>
          <span><FontAwesomeIcon icon={faQuoteLeft}/></span>
          <span className="text-left">
            My name is Kim Anh. Jo is a cute nickname called by everybody.
          </span>
          <span className="">
            This is my homepage that I will write my blogs, will share my photos
            which I toke at everywhere I came, and will sell some cute
            things.
          </span>
          <span className="text-right">Welcome to my home !!!</span>
          <span className="self-end"><FontAwesomeIcon icon={faQuoteRight}/></span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
