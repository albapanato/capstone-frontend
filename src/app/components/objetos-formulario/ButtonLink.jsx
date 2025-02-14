"use client";
import Link from "next/link";

export default function ButtonLink({ href, className, text }) {
  return (
    <>
      <Link
        className={`text-md py-2 px-4 rounded-full ${className}`}
        href={href}
      >
        {text}
      </Link>
    </>
  );
}
