import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { unstable_getServerSession } from "next-auth/next";
import { UserRole } from "@prisma/client";
import {
  Document,
  Page,
  Text,
  View,
  PDFViewer,
  StyleSheet,
} from "@react-pdf/renderer";

import { trpc } from "@/utils/trpc";
import { authOptions } from "../api/auth/[...nextauth]";

import { Loading } from "@/components/loading";

const ApplicationDetailsExp: NextPage = () => {
  const {
    query: { aid },
  } = useRouter();

  const { data, isLoading, isError } = trpc.useQuery([
    "admissionForm.findById",
    { id: aid as string },
  ]);

  if (isError) return <h1>Un error ha ocurrido</h1>;
  if (isLoading) return <Loading />;

  const styles = StyleSheet.create({
    page: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: "white",
    },

    view: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      backgroundColor: "white",
    },

    view1: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
    },

    view2: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      backgroundColor: "white",
      padding: 5,
    },

    text: {
      color: "gray",
      fontStyle: "italic",
      fontSize: "12px",
      padding: 5,
    },

    text2: {
      color: "#4B4B4B",
      fontStyle: "italic",
      fontSize: "22px",
      padding: 40,
      fontWeight: 600,
    },

    text3: {
      color: "#4B4B4B",
      fontStyle: "italic",
      fontSize: "17px",
      padding: 20,
      fontWeight: 600,
    },
  });
  return (
    <>
      <Head>
        <title>Expediente de {data?.firstName}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <PDFViewer style={{ width: "100%", height: "90vh" }}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.view}>
              <Text style={styles.text2}>Expediente Becario</Text>
              <View style={styles.view2}>
                <Text style={styles.text}>Nombre: {data?.firstName}</Text>
                <Text style={styles.text}>Apellido: {data?.lastName}</Text>
              </View>
              <View style={styles.view2}>
                <Text style={styles.text}>
                  Fecha nacimiento:{" "}
                  {data?.dateOfBirth?.toLocaleDateString("es-ES")}
                </Text>
              </View>
              <View style={styles.view2}>
                {" "}
                <Text style={styles.text}>
                  Departamento: {data?.municipality.department.name}
                </Text>
                <Text style={styles.text}>
                  Municipio: {data?.municipality.name}
                </Text>
              </View>
              <View style={styles.view2}>
                {" "}
                <Text style={styles.text}>Direccion: {data?.address}</Text>
                <Text style={styles.text}>
                  Facebook URL: {data?.facebookUrl || "no tiene"}
                </Text>
              </View>
              <View style={styles.view2}>
                {" "}
                <Text style={styles.text}>
                  Trabaja: {data?.hasJob ? "Si" : "No"}
                </Text>
                <Text style={styles.text}>
                  Lugar de trabajo: {data?.placeOfWork || "no aplica"}
                </Text>
              </View>
              <View style={styles.view2}>
                <Text style={styles.text}>
                  Número de trabajo: {data?.workPhoneNumber || "no aplica"}
                </Text>
                <Text style={styles.text}>
                  Dirección de trabajo: {data?.workAddress || "no aplica"}
                </Text>
              </View>
              <View style={styles.view1}>
                <Text style={styles.text3}>Datos Académicos</Text>
              </View>
              <View style={styles.view2}>
                {" "}
                <Text style={styles.text}>
                  Tipo de estudio: {data?.levelOfStudy}
                </Text>
                <Text style={styles.text}>
                  Municipio: {data?.municipality.name}
                </Text>
              </View>
              <View style={styles.view2}>
                {" "}
                <Text style={styles.text}>
                  Año o ciclo universitario a cursar: {data?.yearOfStudy}
                </Text>
                <Text style={styles.text}>
                  Cuota mensual a pagar: {data?.tuition}
                </Text>
              </View>
              <View style={styles.view2}>
                {" "}
                <Text style={styles.text}>
                  Referencia Académica (Nombre Completo):{" "}
                  {data?.academicReferenceName || "no aplica"}
                </Text>
              </View>
              <View style={styles.view2}>
                <Text style={styles.text}>
                  Número de teléfono de referencia académica:{" "}
                  {data?.academicReferenceNumber || "no aplica"}
                </Text>
              </View>
              <View style={styles.view2}>
                <Text style={styles.text}>
                  Institución: {data?.institutionName}
                </Text>
                <Text style={styles.text}>
                  Carrera o técnico: {data?.careerName}
                </Text>
              </View>
              <View style={styles.view2}>
                <Text style={styles.text}>
                  Dirección de la institución: {data?.institutionAddress}
                </Text>
              </View>
              <View style={styles.view2}>
                <Text style={styles.text}>
                  Teléfono de institución:{data?.institutionPhoneNumber}
                </Text>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (session.user?.role !== UserRole.ADMIN) {
    return {
      redirect: {
        destination: "/unauthorized",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default ApplicationDetailsExp;
