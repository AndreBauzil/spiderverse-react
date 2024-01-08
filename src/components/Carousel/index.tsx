"use client"

import { useEffect, useState } from "react";

import HeroDetails from "../HeroDetails";
import HeroPicture from "../HeroPicture";

import styles from "./Carousel.module.scss"

import { IHeroData } from "@/interfaces/heroes";
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
            {visibileItems.map((item) => (
              <div key={item.id} className={styles.hero}>
                <HeroPicture hero={item} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.details}>
          <HeroDetails data={heroes[0]} />
        </div>
      </div>
    </>
  )
}

