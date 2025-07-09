import Button from "@/app/components/Button";
import Input from "@/app/components/Input";

export default function Login() {
  return (
    <div className="flex justify-center items-center">
      <form>
        <Input />
        <Input />
        <Button />
      </form>
    </div>
  );
}
