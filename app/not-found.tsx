import Link from "next/link";
import Button from "./components/Button";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <p>Opps, page not found</p>
      <Link href="/">
        <Button>Back to home</Button>
      </Link>
    </div>
  );
}
