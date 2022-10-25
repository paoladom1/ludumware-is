import React from "react";
import { Button } from "@react-pdf-viewer/core";

import SearchSidebarDefaultLayout from "./SearchSidebarDefaultLayout";

interface FileKeywords {
  fileUrl: string;
  keywords: string[];
}

const ComponentFile = () => {
  const [fileKeywords, setFileKeywords] = React.useState<FileKeywords>({
    fileUrl: "/pdf-open-parameters.pdf",
    keywords: []
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "75%",
        margin: "0 auto"
      }}
    >
      <div style={{ flex: 1, overflow: "hidden" }}>
        <SearchSidebarDefaultLayout
          fileUrl={fileKeywords.fileUrl}
          keywords={fileKeywords.keywords}
        />
      </div>
    </div>
  );
};

export default ComponentFile;
