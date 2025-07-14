import Month from "@/app/components/Calendar/Month";

interface Props {
  params: Promise<{
    month: number;
    year: number;
  }>;
}

export default async function Home(props: Props) {
  const params = await props.params;
  const year = params.year
  const month = params.month

  return (
    <div className="p-4">
      <Month year={year} month={month} />
    </div>
  );
}
