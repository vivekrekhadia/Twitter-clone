import Image from "next/image";
import React from "react";
import { VscAccount } from "react-icons/vsc";
type profileImageProps = {
  src?: string | null;
  className?: string;
};

export const ProfileImage = ({ src, className = "" }: profileImageProps) => {
  return (
    <div
      className={`relative h-12 w-12 overflow-hidden rounded-full ${className}`}
    >
      {src == null ? (
        <VscAccount className="h-full w-full" />
      ) : (
        <Image src={src} alt="profile image" fill />
      )}
    </div>
  );
};
