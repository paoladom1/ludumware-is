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
  CartesianGrid,
  Tooltip,
  TooltipProps,
} from "recharts";
import { Loading } from "@/components/loading";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

const STUDY_LEVEL_COLOR = {
  [LevelOfStudy.BACHILLERATO_GENERAL]: "#FFD6EB",
  [LevelOfStudy.BACHILLERATO_TECNICO]: "#D6E0FF",
  [LevelOfStudy.TECNICO]: "#FFF1D6",
  [LevelOfStudy.UNIVERSIDAD]: "#D1EFF0",
  [LevelOfStudy.OTHER]: "#FFEBEB",
};

const STUDY_LEVEL_LABEL = {
  BACHILLERATO_GENERAL: "Bach_G",
  BACHILLERATO_TECNICO: "Bach_T",
  TECNICO: "Técnico",
  UNIVERSIDAD: "Uni",
  OTHER: "Otro"
};

type StudyLevelColors = keyof typeof STUDY_LEVEL_COLOR;
type StudyLevelLabel = keyof typeof STUDY_LEVEL_LABEL;


const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload) return null;

  return (
    <div className="bg-white p-4">
      <span className="text-sm">
        {STUDY_LEVEL_LABEL[label as StudyLevelLabel]}: {payload?.[0]?.value}
      </span>
    </div>
  );
};

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
        Becarios por nivel de estudio.
      </h1>
      <ResponsiveContainer height={500}>
        <BarChart
          data={formattedData}
          layout="vertical"
          margin={{ top: 50, right: 80, bottom: 0, left: 0 }}
        >
          <Bar dataKey="count">
            {formattedData?.map(({ name }) => (
              <Cell
                key={name}
                fill={STUDY_LEVEL_COLOR[name as StudyLevelColors]}
              />
            ))}
          </Bar>
          <CartesianGrid strokeDasharray="8" stroke="#DFE2E6" />
          <XAxis type="number" tick={{ fontSize: 13 }} allowDecimals={false} />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 13 }}
            tickFormatter={(value) => STUDY_LEVEL_LABEL[value as StudyLevelLabel]}
          />
          <Tooltip content={<CustomTooltip />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
