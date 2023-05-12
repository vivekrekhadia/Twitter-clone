import Image from "next/image";
import React from "react";
type profileImageProps = {
  src?: string | null;
  className?: string;
};

export const ProfileImage = ({ src, className = "" }: profileImageProps) => {
  return (
    <div
      className={`relative h-12 w-12 overflow-hidden rounded-full ${className}`}
    >
      {src == null ? null : <Image src={src} alt="profile image" fill />}
    </div>
  );
};
