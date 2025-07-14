import moment from "moment";

interface Props {
  params: Promise<{
    month: number;
    year: number;
    date: number;
  }>;
}

export default async function Home(props: Props) {
  const params = await props.params;
  const year = params.year;
  const month = params.month;
  const date = params.date;

  const instanceMoment = moment(`${year}-${month}-${date}`, "YYYY-MM-DD");

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-lg font-medium">
        {instanceMoment.format("DD MMMM YYYY")}
      </h1>
      <div className="bg-[var(--foreground)]/10 backdrop-blur-sm p-4 rounded-md border border-[var(--foreground)]/20 flex gap-4">
        <div className="flex flex-col gap-4">
          {[...Array(24)].map((_, time) => (
            <div key={`day-${time}`}>{`${time + 1}`.padStart(2, "0")}</div>
          ))}
        </div>
        <div className="flex flex-col flex-1 gap-4">
          {[...Array(24)].map((_, time) => (
            <div key={`day-${time}`}></div>
          ))}
        </div>
      </div>
    </div>
  );
}
