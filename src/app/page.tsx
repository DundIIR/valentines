"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PhotoPairGame from "../components/PhotoPairGame";
import ValentinesProposal from "@/components/ValentinesProposal";
import OrientationGuard from "@/components/OrientationGuard";

const ANIM_DURATION = 2;

const basePath = process.env.NODE_ENV === "production" ? "/valentines" : "";

const images = [
  `${basePath}/game-photos/1.jpg`,
  `${basePath}/game-photos/2.jpg`,
  `${basePath}/game-photos/3.jpg`,
  `${basePath}/game-photos/4.jpg`,
  `${basePath}/game-photos/5.jpg`,
  `${basePath}/game-photos/6.jpg`,
  `${basePath}/game-photos/7.jpg`,
  `${basePath}/game-photos/8.jpg`,
  `${basePath}/game-photos/9.jpg`,
  `${basePath}/game-photos/10.jpg`,
  `${basePath}/game-photos/11.jpg`,
  `${basePath}/game-photos/12.jpg`,
  `${basePath}/game-photos/13.jpg`,
  `${basePath}/game-photos/14.jpg`,
  `${basePath}/game-photos/15.jpg`,
  `${basePath}/game-photos/16.jpg`,
  `${basePath}/game-photos/17.jpg`,
  `${basePath}/game-photos/18.jpg`,
];

const exampleImages = [
  `${basePath}/game-photos/last/1.avif`,
  `${basePath}/game-photos/last/2.avif`,
  `${basePath}/game-photos/last/3.avif`,
  `${basePath}/game-photos/last/4.avif`,
  `${basePath}/game-photos/last/5.avif`,
  `${basePath}/game-photos/last/6.avif`,
  `${basePath}/game-photos/last/7.avif`,
  `${basePath}/game-photos/last/8.avif`,
  `${basePath}/game-photos/last/9.avif`,
  `${basePath}/game-photos/last/10.avif`,
  `${basePath}/game-photos/last/11.avif`,
  `${basePath}/game-photos/last/12.avif`,
  `${basePath}/game-photos/last/13.avif`,
  `${basePath}/game-photos/last/14.avif`,
  `${basePath}/game-photos/last/15.avif`,
  `${basePath}/game-photos/last/16.avif`,
  `${basePath}/game-photos/last/17.avif`,
  `${basePath}/game-photos/last/18.avif`,
];

export default function Home() {
  const [showValentinesProposal, setShowValentinesProposal] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [filterEnabled, setFilterEnabled] = useState(false);

  const handleShowProposal = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowValentinesProposal(true);
    }, ANIM_DURATION * 1000);
  };

  const handleSkip = () => {
    setIsTransitioning(!isTransitioning);
    setTimeout(() => {
      setShowValentinesProposal(!showValentinesProposal);
    }, ANIM_DURATION * 100);
  };

  return (
    <OrientationGuard>
      <main className="flex items-center justify-center min-h-screen bg-black overflow-hidden relative">
        {/* Скрытая кнопка для быстрого перехода */}

        <button
          onClick={handleSkip}
          style={{ width: "40px", height: "40px", top: "25px" }}
          className="absolute top-0 left-0 opacity-0 hover:opacity-20 transition-opacity cursor-pointer bg-purple-800 rounded z-[1000]"
          aria-label="Skip to proposal"
        />

        {/* Кнопка для показа всех карточек */}
        <button
          onClick={() => setShowAll(!showAll)}
          style={{ width: "40px", height: "40px", top: "25px" }}
          className="absolute top-0 right-0 opacity-0 hover:opacity-20 transition-opacity cursor-pointer bg-purple-800 rounded z-[1000]"
          aria-label="Toggle show all cards"
        ></button>

        {/* Кнопка для включения фильтра */}
        <button
          onClick={() => setFilterEnabled(!filterEnabled)}
          style={{ width: "40px", height: "40px", top: "65px" }}
          className="absolute right-0 opacity-0 hover:opacity-20 transition-opacity cursor-pointer bg-purple-800 rounded z-[1000]"
          aria-label="Toggle photo filter"
        ></button>

        {!showValentinesProposal ? (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isTransitioning ? 0 : 1 }}
            transition={{ duration: ANIM_DURATION }}
            className="flex flex-col items-center"
          >
            <PhotoPairGame
              handleShowProposal={handleShowProposal}
              showAll={showAll}
              filterEnabled={filterEnabled}
              images={exampleImages}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: ANIM_DURATION }}
          >
            <ValentinesProposal images={exampleImages} />
          </motion.div>
        )}
      </main>
    </OrientationGuard>
  );
}
