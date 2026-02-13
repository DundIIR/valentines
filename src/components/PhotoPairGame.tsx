"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

// Base path for GitHub Pages deployment

// 18 images

// Create 18 pairs of images (36 images in total)
const imagePairs = (images: any) =>
  images.flatMap((image: any) => [image, image]);

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Filter configuration - adjust these values to customize the effect
const photoFilter = {
  brightness: 0.85, // Slight darkening (1 = normal, <1 = darker)
  contrast: 1.15, // Enhanced contrast
  saturate: 1.2, // More vivid colors
  sepia: 0.1, // Slight warm tone
  vignette: true, // Add dark edges
};

const heartLayout = [
  [null, null, 0, 1, null, 2, 3, null, null],
  [null, 4, 5, 6, 7, 8, 9, 10, null],
  [11, 12, 13, 14, 15, 16, 17, 18, 19],
  [null, 20, 21, 22, 23, 24, 25, 26, null],
  [null, null, 27, 28, 29, 30, 31, null, null],
  [null, null, null, 32, 33, 34, null, null, null],
  [null, null, null, null, 35, null, null, null, null],
];

type ValentinesProposalProps = {
  handleShowProposal: () => void;
  showAll: boolean;
  filterEnabled: boolean;
  images: string[];
};

export default function PhotoPairGame({
  handleShowProposal,
  showAll,
  filterEnabled,
  images: imagesInit,
}: ValentinesProposalProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [incorrect, setIncorrect] = useState<number[]>([]);
  const [images, setImages] = useState<string[]>(() => {
    return imagePairs(imagesInit);
  });
  const [enlargedLeft, setEnlargedLeft] = useState<string | null>(null);
  const [enlargedRight, setEnlargedRight] = useState<string | null>(null);
  const [cardPosition, setCardPosition] = useState<{
    left?: { x: number; y: number };
    right?: { x: number; y: number };
  }>({});

  // Shuffle images after component mounts to avoid hydration mismatch
  useEffect(() => {
    setImages(shuffleArray(imagePairs(imagesInit)));
  }, [imagesInit]);

  // Generate filter style
  const getFilterStyle = () => {
    if (!filterEnabled) return {};

    const filterString = `brightness(${photoFilter.brightness}) contrast(${photoFilter.contrast}) saturate(${photoFilter.saturate}) sepia(${photoFilter.sepia})`;
    const style: React.CSSProperties = {
      filter: filterString,
    };

    if (photoFilter.vignette) {
      style.boxShadow = "inset 0 0 60px rgba(0,0,0,0.5)";
    }

    return style;
  };

  const handleClick = async (index: number, event: React.MouseEvent) => {
    if (
      selected.length === 2 ||
      matched.includes(index) ||
      selected.includes(index) ||
      showAll
    )
      return;

    if (selected.length === 1) {
      const firstIndex = selected[0];
      const rect = (event.target as HTMLElement)
        .closest(".card-wrapper")
        ?.getBoundingClientRect();
      if (rect) {
        setCardPosition((prev) => ({
          ...prev,
          right: { x: rect.left, y: rect.top },
        }));
      }
      setSelected((prev) => [...prev, index]);
      setEnlargedRight(images[index]); // Show second card on the right

      if (images[firstIndex] === images[index]) {
        setMatched((prev) => [...prev, firstIndex, index]);
        setTimeout(() => {
          setSelected([]);
          setEnlargedLeft(null);
          setEnlargedRight(null);
          setCardPosition({});
        }, 1000);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second

        setIncorrect([firstIndex, index]);
        setTimeout(() => setIncorrect([]), 1000); // Clear incorrect after 1 second
        setTimeout(() => {
          setSelected([]);
          setEnlargedLeft(null);
          setEnlargedRight(null);
          setCardPosition({});
        }, 1000);
      }
    } else {
      const rect = (event.target as HTMLElement)
        .closest(".card-wrapper")
        ?.getBoundingClientRect();
      if (rect) {
        setCardPosition({ left: { x: rect.left, y: rect.top } });
      }
      setSelected([index]);
      setEnlargedLeft(images[index]); // Show first card on the left
    }
  };

  // Check if game is won
  useEffect(() => {
    if (matched.length === images.length) {
      handleShowProposal();
    }
  }, [matched, handleShowProposal, images.length]);

  return (
    <div className="relative flex items-center justify-center gap-2 sm:gap-4 lg:gap-8">
      {/* Увеличенное фото слева */}
      <div
        className="w-32 h-48 sm:w-48 sm:h-72 lg:w-64 lg:h-96 flex-shrink-0 relative z-50"
        id="left-enlarged"
      >
        {/* Текст слева */}
        <div className="absolute left-0 bottom-2 sm:bottom-4 lg:bottom-6 z-0 pointer-events-none">
          <h1 className="text-white text-lg sm:text-2xl lg:text-4xl xl:text-5xl font-bold leading-tight font-serif">
            <span className="text-gray-400">Соединяй</span> <br /> фото
          </h1>
        </div>

        {enlargedLeft && cardPosition.left && (
          <motion.div
            initial={{
              x:
                cardPosition.left.x -
                (typeof window !== "undefined"
                  ? document
                      .getElementById("left-enlarged")
                      ?.getBoundingClientRect().left || 0
                  : 0),
              y:
                cardPosition.left.y -
                (typeof window !== "undefined"
                  ? document
                      .getElementById("left-enlarged")
                      ?.getBoundingClientRect().top || 0
                  : 0),
              width: "8vh",
              height: "8vh",
              rotateY: -180,
            }}
            animate={{
              x: 0,
              y: 0,
              width: "100%",
              height: "100%",
              rotateY: 0,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl z-10"
            style={getFilterStyle()}
          >
            <Image
              src={enlargedLeft}
              alt="Selected card 1"
              fill
              className="object-cover"
            />
          </motion.div>
        )}
      </div>

      {/* Игровое поле */}
      <div className="relative flex-shrink-0">
        {/* Image preload - используем обычные img теги для гарантированной загрузки */}
        <div className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden">
          {Array.from(new Set(images)).map((image, i) => (
            <img
              key={`preload-${i}`}
              src={image}
              alt=""
              loading="eager"
              decoding="async"
            />
          ))}
        </div>

        <div className="grid grid-cols-9 gap-0.5 sm:gap-1 lg:gap-2 max-w-[95vw] mx-auto place-items-center">
          {heartLayout.flat().map((index, i) =>
            index !== null ? (
              <motion.div
                key={i}
                className="card-wrapper w-[8vh] h-[8vh] sm:w-[10vh] sm:h-[10vh] lg:w-20 lg:h-20 relative cursor-pointer"
                whileHover={{ scale: 1.1 }}
                onClick={(e) => handleClick(index, e)}
                style={{ perspective: "1000px" }} // Add perspective for 3D effect
              >
                {/* Back of the card */}
                {!selected.includes(index) &&
                  !matched.includes(index) &&
                  !showAll && (
                    <motion.div
                      className="w-full h-full bg-gray-300 rounded-sm lg:rounded-md absolute z-10"
                      initial={{ rotateY: 0 }}
                      animate={{
                        rotateY:
                          selected.includes(index) ||
                          matched.includes(index) ||
                          showAll
                            ? 180
                            : 0,
                      }}
                      transition={{ duration: 0.5 }}
                      style={{ backfaceVisibility: "hidden" }}
                    />
                  )}

                {/* Front of the card (image) */}
                {(selected.includes(index) ||
                  matched.includes(index) ||
                  showAll) && (
                  <motion.div
                    className="w-full h-full absolute"
                    initial={{ rotateY: -180 }}
                    animate={{ rotateY: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      backfaceVisibility: "hidden",
                      ...getFilterStyle(),
                    }}
                  >
                    <Image
                      src={images[index]}
                      alt={`Imagen ${index + 1}`}
                      fill
                      className="rounded-sm lg:rounded-md object-cover"
                    />
                  </motion.div>
                )}

                {/* Incorrect animation */}
                {incorrect.includes(index) && (
                  <motion.div
                    className="absolute inset-0"
                    animate={{ scale: [1, 1.1, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-full h-full bg-red-500 rounded-sm lg:rounded-md"></div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <div
                key={i}
                className="w-[8vh] h-[8vh] sm:w-[10vh] sm:h-[10vh] lg:w-20 lg:h-20"
              />
            ),
          )}
        </div>
      </div>

      {/* Увеличенное фото справа */}
      <div
        className="w-32 h-48 sm:w-48 sm:h-72 lg:w-64 lg:h-96 flex-shrink-0 relative z-50"
        id="right-enlarged"
      >
        {/* Текст справа */}
        <div className="absolute right-0 bottom-2 sm:bottom-4 lg:bottom-6 z-0 pointer-events-none">
          <h1 className="text-white text-lg sm:text-2xl lg:text-4xl xl:text-5xl font-bold leading-tight text-right font-serif">
            чтобы пройти <br /> <span className="text-gray-400">дальше</span>
          </h1>
        </div>

        {enlargedRight && cardPosition.right && (
          <motion.div
            initial={{
              x:
                cardPosition.right.x -
                (typeof window !== "undefined"
                  ? document
                      .getElementById("right-enlarged")
                      ?.getBoundingClientRect().left || 0
                  : 0),
              y:
                cardPosition.right.y -
                (typeof window !== "undefined"
                  ? document
                      .getElementById("right-enlarged")
                      ?.getBoundingClientRect().top || 0
                  : 0),
              width: "8vh",
              height: "8vh",
              rotateY: -180,
            }}
            animate={{
              x: 0,
              y: 0,
              width: "100%",
              height: "100%",
              rotateY: 0,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl z-10"
            style={getFilterStyle()}
          >
            <Image
              src={enlargedRight}
              alt="Selected card 2"
              fill
              className="object-cover"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
