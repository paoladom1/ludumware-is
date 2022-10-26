import { NextPage } from "next";
import Head from "next/head";

import { AdmissionForm } from "@/components/admissionForm";

const SubmissionForm: NextPage = () => {
  return (
    <>
      <Head>
        <title>Formulario de solicitud</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <AdmissionForm />
    </>
  );
};

export default SubmissionForm;
