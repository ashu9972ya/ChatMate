import Image from "next/image";
import React from "react";

type Props = {
  size: number;
};

const LoadingLogo = ({ size = 100 }: Props) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Image
        className="animate-pulse duration-700"
        src="/logo.svg"
        alt="log"
        width={size}
        height={size}
      />
    </div>
  );
};

export default LoadingLogo;
