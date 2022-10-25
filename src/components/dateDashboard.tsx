import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type FechaDashboardProps = {
  date: Date;
};

export const FechaDashboard: React.FC<FechaDashboardProps> = ({ date }) => {
  return (
    <>
      <FontAwesomeIcon icon="calendar" />
      {date}
    </>
  );
};
