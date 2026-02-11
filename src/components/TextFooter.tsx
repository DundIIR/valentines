import Link from "next/link";

export default function TextFooter() {
  return (
    <>
      {/* Left Text */}
      <h1
        className={`absolute left-2 sm:left-6 lg:left-10 bottom-2 sm:bottom-4 lg:bottom-5 transform -translate-y-1/2 text-white text-lg sm:text-2xl lg:text-4xl xl:text-5xl font-bold leading-tight font-serif`}
      >
        <span className="text-gray-400">Соединяй</span> <br /> фото
      </h1>

      {/* Right Text */}
      <h1
        className={`absolute right-2 sm:right-6 lg:right-10 bottom-2 sm:bottom-4 lg:bottom-5 transform -translate-y-1/2 text-white text-lg sm:text-2xl lg:text-4xl xl:text-5xl font-bold leading-tight text-right font-serif`}
      >
        чтобы пройти <br /> <span className="text-gray-400">дальше</span>
      </h1>
    </>
  );
}
