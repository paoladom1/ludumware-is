import { trpc } from "@/utils/trpc";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { Loading } from "@/components/loading";

const GENDER_COLOR = {
  FEMALE: {
    fill: "#ff638466",
    stroke: "#ff6384cc",
  },
  MALE: { fill: "#36a2eb66", stroke: "#36a2ebcc" },
  OTHER: { fill: "#ffce5666", stroke: "#ffce56cc" },
};

const GENDER_LABEL = {
  FEMALE: "Femenino",
  MALE: "Masculino",
  OTHER: "Otro",
};

type GenderLabel = keyof typeof GENDER_LABEL;
type GenderColors = keyof typeof GENDER_COLOR;

const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({
  active,
  payload,
}) => {
  if (!active || !payload) return null;

  return (
    <div className="bg-white p-4">
      <span className="text-sm">
        {GENDER_LABEL[payload?.[0]?.name as GenderLabel]}: {payload?.[0]?.value}
      </span>
    </div>
  );
};

export const ScholarsByGender: React.FC = () => {
  const { data: session } = useSession({ required: true });

  const { isLoading, data } = trpc.useQuery(["dashboard.scholarsByGender"]);

  if (session?.user?.role !== UserRole.ADMIN) return null;

  if (isLoading) return <Loading />;

  const formattedData = data?.map(
    ({ gender, _count: { gender: genderCount } }) => ({
      name: gender,
      count: genderCount,
    })
  );

  return (
    <div className="h-auto bg-white rounded p-9 shadow-lg">
      <h1 className="text-lg text-center font-bold pb-3">
        Becarios por género.
      </h1>
      <ResponsiveContainer maxHeight={300}>
        <PieChart>
          <Pie nameKey="name" dataKey="count" data={formattedData}>
            {formattedData?.map(({ name }) => (
              <Cell
                key={name}
                stroke={GENDER_COLOR[name as GenderColors].stroke}
                fill={GENDER_COLOR[name as GenderColors].fill}
              />
            ))}
          </Pie>
          <Legend
            formatter={(value) => (
              <span className="text-black capitalize">
                {GENDER_LABEL[value as GenderLabel]}
              </span>
            )}
          />
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};