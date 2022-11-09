import React from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

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

export const DonutGraph: React.FC<Props> = ({ data }) => {
  const formattedData = data?.map(
    ({ gender, _count: { gender: genderCount } }) => ({
      name: gender,
      count: genderCount,
    })
  );

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
      </PieChart>
    </ResponsiveContainer>
  );
};
