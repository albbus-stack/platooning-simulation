import Link from "next/link";

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-5 text-lg">
      404: Page Not Found
      <Link
        href="/"
        className="px-4 py-2 bg-gray-300 rounded-md hover:opacity-70"
      >
        Go Back
      </Link>
    </div>
  );
}
