import Month from "@/app/components/Calendar/Month";

interface Props {
  params: Promise<{
    month: number;
    year: number;
  }>;
}

export default async function Home(props: Props) {
  const params = await props.params;
  const year = params.year ?? new Date().getFullYear();
  const month = params.month ?? new Date().getMonth();

  return (
    <div className="p-4">
      <Month year={year} month={month} classNameDay="aspect-square" />
    </div>
  );
}
