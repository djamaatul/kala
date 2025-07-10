import Button from "./Button";

export default function Footer() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Button.link href="/about" className="self-start">
        About
      </Button.link>
      <div className="text-center pb-4">&copy; 2025 | @djamaatul</div>
    </div>
  );
}
