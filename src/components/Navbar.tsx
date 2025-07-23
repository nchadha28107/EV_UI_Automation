'use client'
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Navbar() {
  const searchParams = useSearchParams();
  const backUrl = `${searchParams?.toString() ? `/?${searchParams?.toString()}` : ""}`;

  return (

    <nav className="w-full p-4  flex items-center" style={{
        padding: "10px 20px",
        width: "100%",
        borderBottom: "solid",
        borderBottomWidth: "1px",
        borderBottomColor: "#000",
      }}>
      <Link role="navigation" href={backUrl} className="text-lg font-semibold">
        ← Back to Listings
      </Link>
    </nav>
  );
}
