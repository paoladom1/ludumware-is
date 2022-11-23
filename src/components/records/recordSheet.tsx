import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import * as React from "react";
import { Loading } from "../loading";
import styled from "styled-components";
import Head from "next/head";

const Container = styled.div`
  font-size: 10pt;

  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .clearfix {
    clear: both;
  }

  .title {
    text-align: center;
    font-weight: normal;
    font-size: 16pt;
    margin: 5mm 0 0;
  }

  .main-title {
    text-align: center;
    font-weight: normal;
    font-size: 18pt;
    margin: 5mm 0 0;
  }

  .info {
    text-align: center;
    font-size: 9pt;

    & span {
      margin-left: 4mm;
    }
  }

  .data {
    margin-top: 32px;

    & span {
      font-size: 14px;
      font-weight: normal;
      margin: 0;
    }
  }
`;

export const RecordSheet = () => {
  const {
    query: { aid },
  } = useRouter();

  const { data, isLoading, isError } = trpc.useQuery([
    "admissionForm.findById",
    { id: aid as string },
  ]);

  if (isError) return <h1>Un error ha ocurrido</h1>;
  if (isLoading) return <Loading />;

  return (
    <Container>
      <Head>
        <title>Expediente de {data?.firstName}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <h1 className="main-title">Expediente de {data?.firstName}</h1>

      <div className="info">
        <span>Fecha de aplicación: </span>
        <span>{data?.createdAt?.toLocaleDateString("es-ES")}</span>
      </div>

      <div className="title">Datos Personales</div>
      <div className="data">
        <span>Nombre completo: </span>
        <span>
          {data?.firstName} {data?.lastName}
        </span>
      </div>

      <div className="data">
        <span>Fecha de nacimiento: </span>
        <span>{data?.dateOfBirth?.toLocaleDateString("es-ES")}</span>
      </div>

      <div className="data">
        <span>Departamento: </span>
        <span>{data?.municipality.department.name}</span>
      </div>

      <div className="data">
        <span>Municipio: </span>
        <span>{data?.municipality.name}</span>
      </div>

      <div className="data">
        <span>Dirección de vivienda: </span>
        <span>{data?.address}</span>
      </div>

      <div className="data">
        <span>Facebook URL: </span>
        <span>{data?.facebookUrl || "No indica"}</span>
      </div>

      <div className="data">
        <span>¿Trabaja?: </span>
        <span>{data?.hasJob ? "Si" : "No"}</span>
      </div>

      {data?.hasJob && (
        <>
          <div className="data">
            <span>Lugar de trabajo: </span>
            <span>{data?.placeOfWork || "no aplica"}</span>
          </div>

          <div className="data">
            <span>Número de trabajo: </span>
            <span>{data?.workPhoneNumber || "no aplica"}</span>
          </div>

          <div className="data">
            <span>Dirección de trabajo: </span>
            <span>{data?.workAddress || "no aplica"}</span>
          </div>
        </>
      )}

      <div className="title">Datos Académicos</div>
      <div className="data">
        <span>Tipo de estudio: </span>
        <span>{data?.levelOfStudy}</span>
      </div>

      <div className="data">
        <span>Año o ciclo universitario a cursar: </span>
        <span>{data?.yearOfStudy}</span>
      </div>

      <div className="data">
        <span>Cuota mensual a pagar: </span>
        <span>{data?.tuition}</span>
      </div>

      <div className="data">
        <span>Referencia Académica (Nombre Completo): </span>
        <span>{data?.academicReferenceName || "no aplica"}</span>
      </div>

      <div className="data">
        <span>Número de teléfono de referencia académica: </span>
        <span>{data?.academicReferenceNumber || "no aplica"}</span>
      </div>

      <div className="data">
        <span>Institución: </span>
        <span>{data?.institutionName}</span>
      </div>

      <div className="data">
        <span>Dirección de la institución: </span>
        <span>{data?.institutionAddress}</span>
      </div>

      <div className="data">
        <span>Teléfono de institución: </span>
        <span>{data?.institutionPhoneNumber}</span>
      </div>

      <div className="data">
        <span>Carrera o técnico: </span>
        <span>{data?.careerName}</span>
      </div>
    </Container>
  );
};
