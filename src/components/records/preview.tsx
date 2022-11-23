import * as React from "react";
import styled, { createGlobalStyle, css } from "styled-components";
import { DownloadButton } from "./downloadButton";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const GlobalStyles = createGlobalStyle`
  @media screen {
    body {
      background: #E0E0E0;
      height: 100%;
    }
  }
`;

type ContainerProps = {
  scale: number;
};

const Container = styled.div`
  margin: 0;
  font-family: "IPAexGothic", sans-serif;

  @media screen {
    padding: 30px;
    transform: scale(${({ scale }: ContainerProps) => scale / 100});
    transform-origin: top left;
  }
`;

type SheetProps = {
  page?: number;
  preview?: boolean;
};

export const Sheet = styled.div<SheetProps>`
  display: block;
  background: white;
  padding: 15mm;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  width: 210mm;
  min-height: 296mm;

  @media screen {
    margin: 0 auto;
    box-shadow: 0 0.5mm 2mm rgba(0, 0, 0, 0.3);
  }

  @media print {
    ${({ page = 1 }) =>
      page !== 1 &&
      css`
        display: none;
      `}
  }

  ${({ preview = true }) =>
    preview
      ? css`
          @media screen {
            height: 296mm;
            margin: 0 auto 30px;
          }
        `
      : ""}
`;

type SheetViewportProps = {
  page?: number;
};

const SheetViewport = styled.div<SheetViewportProps>`
  height: 100%;

  @media print {
    ${({ page = 1 }) =>
      page !== 1 &&
      css`
        display: none;
      `}
  }

  @media screen {
    overflow: hidden;

    > * {
      transform: translateY(-${({ page = 1 }) => (page - 1) * 266}mm);
    }
  }
`;

const StyledDownloadButton = styled(DownloadButton)`
  position: fixed;
  bottom: 100px;
  right: 30px;
`;

const ScalePlusButton = styled.button`
  position: fixed;
  bottom: 30px;
  left: 125px;

  @media print {
    display: none;
  }
`;

const ScaleDiv = styled.div`
  position: fixed;
  bottom: 28px;
  left: 70px;

  @media print {
    display: none;
  }
`;

const ScaleMinusButton = styled.button`
  position: fixed;
  bottom: 30px;
  left: 40px;

  @media print {
    display: none;
  }
`;

const SHEET_HEIGHT = 1005.344;

export const Preview = ({ children }: any) => {
  const printContentRef = React.useRef(null);
  const printInnerContentRef = React.useRef<any>(null);
  const [pages, setPages] = React.useState([1]);
  const [scale, setScale] = React.useState(100);

  const handleDownload = React.useCallback(async () => {
    if (printContentRef.current === null) return;
    const canvas = await html2canvas(printContentRef.current, { scale: 2 });
    const baseImageDataUrl = canvas.toDataURL("image/png");
    const baseWidth = canvas.width;
    const baseHeight = canvas.height;
    const pageMargin = 15;
    const contentHeight = 296;
    const contentWidth = 210;

    const img = await new Promise<HTMLImageElement>((resolve) => {
      const tmpImg = new Image();
      tmpImg.src = baseImageDataUrl;
      tmpImg.height = baseHeight;
      tmpImg.width = baseWidth;
      tmpImg.onload = () => resolve(tmpImg);
    });

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    pages.forEach((page, i) => {
      const pageCanvas = document.createElement("canvas");
      const ctx = pageCanvas.getContext("2d");

      const imgHeight = Math.ceil(
        baseHeight / pages.length +
          (baseHeight / pages.length) * ((pageMargin * 2) / contentHeight)
      );

      pageCanvas.width = baseWidth;
      pageCanvas.height = imgHeight;

      ctx?.drawImage(
        img,
        0,
        (page - 1) * imgHeight,
        baseWidth,
        imgHeight,
        0,
        0,
        baseWidth,
        imgHeight
      );

      const pageDataUrl = pageCanvas.toDataURL("image/png");

      doc.addImage(
        pageDataUrl,
        "PNG",
        0,
        i !== 0 ? pageMargin : 0,
        contentWidth,
        contentHeight - pageMargin
      );

      if (i + 1 < pages.length) {
        doc.addPage();
      }
    });

    doc.save("expediente_becario.pdf");
  }, [pages, printContentRef]);

  React.useEffect(() => {
    if (printInnerContentRef.current === null) return;
    const contentHeight = printInnerContentRef.current.clientHeight;
    const pageCount = Math.ceil(contentHeight / SHEET_HEIGHT);
    setPages(Array.from(Array(pageCount)).map((p, i) => i + 1));
  }, [printInnerContentRef, setPages]);

  const handleScaleDown = React.useCallback(() => {
    const newScale = scale - 10;
    if (newScale < 10) {
      setScale(10);
    } else {
      setScale(newScale);
    }
  }, [scale, setScale]);

  const handleScaleUp = React.useCallback(() => {
    const newScale = scale + 10;
    if (newScale > 200) {
      setScale(200);
    } else {
      setScale(newScale);
    }
  }, [scale, setScale]);

  return (
    <>
      <GlobalStyles />
      <Container scale={scale}>
        {/* <PreviewView> */}
        {pages.map((page) => (
          <Sheet key={page} page={page} preview={true}>
            <SheetViewport page={page}>{children}</SheetViewport>
          </Sheet>
        ))}
        {/* </PreviewView> */}
      </Container>

      <ScalePlusButton onClick={handleScaleUp}>+</ScalePlusButton>
      <ScaleDiv>{scale}%</ScaleDiv>
      <ScaleMinusButton onClick={handleScaleDown}>-</ScaleMinusButton>
      <StyledDownloadButton onClick={handleDownload} />

      {/* render off-screen */}
      <div style={{ position: "fixed", top: "-9000vh" }}>
        <div ref={printContentRef}>
          <Sheet preview={false}>
            <div ref={printInnerContentRef}>{children}</div>
          </Sheet>
        </div>
      </div>
    </>
  );
};
