import Button from "./Button";

export default function Footer() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-start">
        <Button.link href="/about">About</Button.link>
      </div>
      <div className="text-center pb-4">&copy; 2025 | @djamaatul</div>
    </div>
  );
}
