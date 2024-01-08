"use client"

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import HeroDetails from "../HeroDetails";
import HeroPicture from "../HeroPicture";

import styles from "./Carousel.module.scss"

import { IHeroData } from "@/interfaces/heroes";


enum enPosition {
  FRONT = 0,
  MIDDLE = 1,
  BACK = 2
}
interface IProps {
  heroes: IHeroData[];
  activeId: string;
}

export default function Carousel({ heroes, activeId }: IProps) {
  const [visibileItems, setVisibileItems] = useState<IHeroData[] | null>(null)
  const [activeIndex, setActiveIndex] = useState<number>(
    heroes.findIndex((hero) => hero.id === activeId)
  )

  useEffect(() => {
    // Function to loop over hero list, also dont pass the array max length
    const indexOnArrayScope = ((activeIndex % heroes.length) + heroes.length) % heroes.length;

    const visibileItems = [...heroes, ...heroes].slice(indexOnArrayScope, indexOnArrayScope + 3)
    setVisibileItems(visibileItems)
  }, [heroes, activeIndex])

  // Changes active hero on carousel
  // newDirection = +1, rotates clockwise
  // newDirection = -1, rotates anti-clockwise
  const handleChangeActiveIndex = (newDirection: number) => {
    setActiveIndex((prevActiveIndex) => prevActiveIndex + newDirection)
  }

  // validate before update useEffect
  if (!visibileItems) return null

  return (
    <>
      <div className={styles.container}>
        <div className={styles.carousel}>
          <div className={styles.wrapper} onClick={() => handleChangeActiveIndex(1)}>
            <AnimatePresence mode="popLayout">
              {visibileItems.map((item, position) => (
                <motion.div
                  key={item.id}
                  className={styles.hero}
                  initial={{ x: -1500, scale: 0.75 }}
                  animate={{ x: 0, ...getItemStyles(position) }}
                  exit={{
                    x: -300,
                    opacity: 0,
                    scale: 1,
                    left: "-20%"
                  }}
                  transition={{ duration: 0.8 }}
                >
                  <HeroPicture hero={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className={styles.details}>
          <HeroDetails data={heroes[0]} />
        </div>
      </div>
    </>
  )
}

const getItemStyles = (position: enPosition) => {
  if (position === enPosition.FRONT) return {
    zIndex: 3,
    filter: "blur(10px)",
    scale: 1.2
  };

  if (position === enPosition.MIDDLE) return {
    zIndex: 2,
    left: 350,
    scale: 0.8,
    top: "-10%"
  };

  return {
    zIndex: 1,
    filter: "blur(10px)",
    left: 235,
    top: "-20%",
    scale: 0.6,
    opacity: 0.8
  };
}