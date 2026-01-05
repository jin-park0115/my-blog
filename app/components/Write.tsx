import Link from "next/link";

export default function Write() {
  return (
    <Link
      href={"/postwrite"}
      className="w-10 h-10 rounded-[50%] fixed top-[80%] right-5 bg-black flex items-center justify-center hover:bg-amber-950 cursor-pointer"
    >
      <p>🖊</p>
    </Link>
  );
}
