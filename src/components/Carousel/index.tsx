"use client"

import { useEffect, useMemo, useState } from "react";
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
    heroes.findIndex((hero) => hero.id === activeId) - 1
  )
  const [startInteractionPosition, setStartInteractionPosition] =
    useState<number>(0)

  const transitionAudio = useMemo(() => new Audio("/songs/transition.mp3"), [])
  const voicesAudio: Record<string, HTMLAudioElement> = useMemo(
    () => ({
      "spider-man-616": new Audio("/songs/spider-man-616.mp3"),
      "spider-woman-65": new Audio("/songs/spider-woman-65.mp3"),
      "spider-man-1610": new Audio("/songs/spider-man-1610.mp3"),
      "sp-dr-14512": new Audio("/songs/sp-dr-14512.mp3"),
      "spider-ham-8311": new Audio("/songs/spider-ham-8311.mp3"),
      "spider-man-90214": new Audio("/songs/spider-man-90214.mp3"),
      "spider-man-928": new Audio("/songs/spider-man-928.mp3")
    }),
    []
  )

  // for heroes' audios and transisiton
  useEffect(() => {
    if (!visibileItems) return

    transitionAudio.play();

    const voiceAudio = voicesAudio[visibileItems[enPosition.MIDDLE].id]
    if (!voiceAudio) return

    voiceAudio.volume = 0.1;
    voiceAudio.play()
  }, [visibileItems, transitionAudio, voicesAudio])

  // for visibile heroes on screen
  useEffect(() => {
    // Function to loop over hero list, also dont pass the array max length
    const indexOnArrayScope = ((activeIndex % heroes.length) + heroes.length) % heroes.length;

    const visibileItems = [...heroes, ...heroes].slice(indexOnArrayScope, indexOnArrayScope + 3)
    setVisibileItems(visibileItems)
  }, [heroes, activeIndex])

  // for heroes' background image
  useEffect(() => {
    const htmlEl = document.querySelector("html")

    if (!htmlEl || !visibileItems) return;

    const currentHeroId = visibileItems[enPosition.MIDDLE].id;
    htmlEl.style.backgroundImage = `url("/spiders/${currentHeroId}-background.png")`;

    htmlEl.classList.add("hero-page");

    return () => {
      htmlEl.classList.remove("hero-page");
    }
  }, [visibileItems])

  // mouse poitner interaction
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setStartInteractionPosition(e.clientX)
  }
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    if (!startInteractionPosition) return null;

    const endInteractionPosition = e.clientX;
    const diffPosition = endInteractionPosition - startInteractionPosition;
    // diffPosition > 0 => RtL
    // diffPosition < 0 => LtR
    const newPosition = diffPosition > 0 ? -1 : 1;
    handleChangeActiveIndex(newPosition)
  }
  // Changes active hero on carousel
  const handleChangeActiveIndex = (newDirection: number) => {
    setActiveIndex((prevActiveIndex) => prevActiveIndex + newDirection)
  }

  // touch interaction
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartInteractionPosition(e.touches[0].clientX)
  }
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!startInteractionPosition) return null;

    handleChangeDragTouch(e.changedTouches[0].clientX)
  }
  const handleChangeDragTouch = (clientX: number) => {
    const endInteractionPosition = clientX;
    const diffPosition = endInteractionPosition - startInteractionPosition;

    // diffPosition > 0 => RtL
    // diffPosition < 0 => LtR
    const newPosition = diffPosition > 0 ? -1 : 1;
    handleChangeActiveIndex(newPosition)
  }

  // validate before update useEffect
  if (!visibileItems) return null

  return (
    <>
      <div className={styles.container}>
        <div className={styles.carousel}>
          <div
            className={styles.wrapper}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
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

        <motion.div className={styles.details}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
        >
          <HeroDetails data={visibileItems[enPosition.MIDDLE]} />
        </motion.div>
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