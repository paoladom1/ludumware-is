import { trpc } from "@/utils/trpc";
import { UserRole, LevelOfStudy } from "@prisma/client";
import { useSession } from "next-auth/react";
import {
  ResponsiveContainer,
  Bar,
  BarChart,
  Cell,
  XAxis,
  YAxis,
} from "recharts";
import { Loading } from "@/components/loading";

const STUDY_LEVEL_COLOR = {
  [LevelOfStudy.BACHILLERATO_GENERAL]: "red",
  [LevelOfStudy.BACHILLERATO_TECNICO]: "green",
  [LevelOfStudy.TECNICO]: "blue",
  [LevelOfStudy.UNIVERSIDAD]: "yellow",
  [LevelOfStudy.OTHER]: "grey",
};

type StudyLevelColors = keyof typeof STUDY_LEVEL_COLOR;

export const ScholarsByLevelOfStudy: React.FC = () => {
  const { data: session } = useSession({ required: true });
  const { isLoading, data } = trpc.useQuery([
    "dashboard.scholarsByLevelOfStudy",
  ]);

  if (session?.user?.role !== UserRole.ADMIN) return null;

  if (isLoading) return <Loading />;

  const formattedData = Object.keys(LevelOfStudy).map((name) => {
    const levelData = data?.find(({ levelOfStudy }) => name === levelOfStudy);

    return {
      name,
      count: levelData?._count?.levelOfStudy || 0,
    };
  });

  return (
    <div className="col-span-2 row-span-2 h-full bg-white rounded p-9 shadow-lg">
      <h1 className="text-lg text-center font-bold">
        Becarios por institución de estudio.
      </h1>
      <ResponsiveContainer height={500}>
        <BarChart data={formattedData} layout="vertical">
          <Bar dataKey="count">
            {formattedData?.map(({ name }) => (
              <Cell
                key={name}
                fill={STUDY_LEVEL_COLOR[name as StudyLevelColors]}
              />
            ))}
          </Bar>
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" width={200} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
