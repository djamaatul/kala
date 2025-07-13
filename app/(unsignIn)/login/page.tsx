import Button from "@/app/components/Button";
import Input from "@/app/components/Input";

export default async function Login() {
  return (
    <form className="flex flex-col gap-4 ">
      <Input placeholder="Email" name="email" />
      <Input placeholder="Password" name="password" type="password" />
      <Button type="submit">Login</Button>

      <span>
        <span>{"don't have account ? register"}</span>
        <Button.link href="/register">here</Button.link>
      </span>
    </form>
  );
}
