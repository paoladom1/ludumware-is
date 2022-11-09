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

type SeggregatedGenderCount = { gender: string; _count: { gender: number } };

type Props = { data: SeggregatedGenderCount[] | undefined };

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

export const DonutGraph: React.FC<Props> = ({ data }) => {
  const formattedData = data
    ?.map(({ gender, _count: { gender: genderCount } }) => ({
      name: gender,
      count: genderCount,
    }))
    .filter(Boolean);

  console.log(formattedData);

  return (
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
  );
};
