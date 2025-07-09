import Calendar from "../components/Calendar";

interface Props {
  params: Promise<{
    year: number;
  }>;
}

export default async function Home({ params }: Props) {
  const year = (await params).year ?? new Date().getFullYear();
  return (
    <div className="p-4">
      <Calendar year={year} />
    </div>
  );
}
