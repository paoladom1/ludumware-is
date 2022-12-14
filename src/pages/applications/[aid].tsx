import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { unstable_getServerSession } from "next-auth/next";
import { ApplicationStatus, UserRole } from "@prisma/client";
import { subYears, isAfter, isDate } from "date-fns";

import { trpc } from "@/utils/trpc";
import { authOptions } from "../api/auth/[...nextauth]";

import { Loading, LoadingOverlay } from "@/components/loading";
import { TextInput } from "@/components/textInput";
import { STATUS_MAPPER } from "@/utils/applications";
import { Modal } from "@/components/modal";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const ApplicationDetails: NextPage = () => {
  const {
    push: navigate,
    query: { aid },
  } = useRouter();

  const { data, isLoading, isError } = trpc.useQuery([
    "admissionForm.findById",
    { id: aid as string },
  ]);

  const {
    mutate: acceptApplication,
    isSuccess: applicationAccepted,
    isLoading: isAccepting,
  } = trpc.useMutation(["admin.acceptApplication"], {
    onSuccess: () => {
      navigate("/applications");
    },
  });

  const [declieApplicationOpen, setDeclineApplicationOpen] = useState(false);
  const [pendingApplicationOpen, setPendingApplicationOpen] = useState(false);

  if (isError) return <h1>Un error ha ocurrido</h1>;
  if (isLoading) return <Loading />;

  const majorityDate = subYears(new Date(), 18);
  const majority = isDate(data?.dateOfBirth)
    ? isAfter(majorityDate, data?.dateOfBirth as Date)
    : false;

  const showDeclineApplicationModal = () => setDeclineApplicationOpen(true);
  const hideDeclineApplicationModal = () => setDeclineApplicationOpen(false);
  const showPendingApplicationModal = () => setPendingApplicationOpen(true);
  const hidePendingApplicationModal = () => setPendingApplicationOpen(false);

  return (
    <>
      <Head>
        <title>Solicitud de {data?.firstName}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {isAccepting && (
        <LoadingOverlay
          isSuccess={applicationAccepted}
          isLoading={isAccepting}
        />
      )}

      <div className="pb-8">
        <div className="m-5 sm:mt-0">
          <h2 className="flex justify-center uppercase text-xl font-bold my-8">
            Datos de la solicitud (
            <span
              className={
                STATUS_MAPPER[data?.status as keyof typeof ApplicationStatus]
                  .color
              }
            >
              {
                STATUS_MAPPER[data?.status as keyof typeof ApplicationStatus]
                  .label
              }
            </span>
            )
          </h2>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900 flex justify-end mr-6">
                  Datos del solicitante
                </h3>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-9">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label className=" text-sm font-medium text-gray-700">
                        Nombres
                        <TextInput disabled value={data?.firstName} />
                      </label>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className=" text-sm font-medium text-gray-700">
                        Apellidos
                        <TextInput disabled value={data?.lastName} />
                      </label>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className=" text-sm font-medium text-gray-700">
                        Email address
                        <TextInput disabled value={data?.email} />
                      </label>
                    </div>
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="birthday"
                        className=" text-sm font-medium text-gray-700"
                      >
                        Fecha de nacimiento
                        <TextInput
                          disabled
                          value={data?.dateOfBirth?.toLocaleDateString("es-ES")}
                        />
                      </label>
                    </div>
                    {majority && (
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          N??mero de DUI
                        </label>
                        <TextInput disabled value={data?.dui || ""} />
                      </div>
                    )}
                    <div className="col-span-6 sm:col-span-3">
                      <label className=" text-sm font-medium text-gray-700">
                        Departamento
                        <TextInput
                          disabled
                          value={data?.municipality.department.name}
                        />
                      </label>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label className=" text-sm font-medium text-gray-700">
                        Munincipio
                        <TextInput disabled value={data?.municipality.name} />
                      </label>
                    </div>
                    <div className="col-span-3">
                      <label
                        htmlFor="street-address"
                        className=" text-sm font-medium text-gray-700"
                      >
                        Direcci??n de vivienda
                        <TextInput disabled value={data?.address} />
                      </label>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="company-website"
                        className=" text-sm font-medium text-gray-700"
                      >
                        Facebook URL
                        <TextInput disabled value={data?.facebookUrl || ""} />
                      </label>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="company-website"
                        className=" text-sm font-medium text-gray-700"
                      >
                        Actualmente Trabaja
                        <TextInput
                          disabled
                          value={data?.hasJob ? "Si" : "No"}
                        />
                      </label>
                    </div>
                    {data?.hasJob && (
                      <div className="col-span-3">
                        <label
                          htmlFor="street-address"
                          className=" text-sm font-medium text-gray-700"
                        >
                          ??D??nde trabaja?
                          <TextInput disabled value={data?.placeOfWork || ""} />
                        </label>
                        <label className=" text-sm font-medium text-gray-700">
                          Sueldo actual:
                          <TextInput value={"$" + data?.salary} disabled />
                        </label>
                      </div>
                    )}
                    {data?.hasJob && (
                      <div className="col-span-3">
                        <label
                          htmlFor="street-address"
                          className=" text-sm font-medium text-gray-700"
                        >
                          Direcci??n de trabajo
                          <TextInput disabled value={data?.workAddress || ""} />
                        </label>
                      </div>
                    )}
                    {data?.hasJob && (
                      <div className="col-span-3">
                        <label
                          htmlFor="street-address"
                          className=" text-sm font-medium text-gray-700"
                        >
                          Tel??fono de trabajo
                          <TextInput
                            disabled
                            value={data?.workPhoneNumber || ""}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="m-5 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900 flex justify-end mr-6">
                  Datos acad??micos
                </h3>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0 flex flex-col">
              <div className="overflow-hidden shadow sm:">
                <div className="bg-white px-4 py-5 sm:p-9">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-3">
                      <label className="contents text-base font-medium text-gray-900">
                        Tipo de estudio
                      </label>
                      <TextInput value={data?.levelOfStudy} disabled />
                    </div>
                    <div className="col-span-3">
                      <label
                        htmlFor="street-address"
                        className=" text-sm font-medium text-gray-700"
                      >
                        A??o o ciclo universitario a cursar:
                      </label>
                      <TextInput value={data?.yearOfStudy} disabled />
                      <label
                        htmlFor="street-address"
                        className=" text-sm font-medium text-gray-700"
                      >
                        Cuota mensual a pagar:
                      </label>
                      <TextInput disabled value={data?.tuition} />
                      <label
                        htmlFor="academic-reference-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Referencia Acad??mica (Nombre Completo):
                      </label>
                      <TextInput
                        disabled
                        value={data?.academicReferenceName || ""}
                      />
                      <label
                        htmlFor="academic-reference-phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        N??mero de tel??fono de referencia acad??mica:
                      </label>
                      <TextInput
                        disabled
                        value={data?.academicReferenceNumber || ""}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label className=" text-sm font-medium text-gray-700">
                        Instituci??n:
                        <TextInput disabled value={data?.institutionName} />
                      </label>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label className=" text-sm font-medium text-gray-700">
                        Carrera o t??cnico:
                        <TextInput disabled value={data?.careerName} />
                      </label>
                    </div>
                    <div className="col-span-3">
                      <label
                        htmlFor="street-address"
                        className=" text-sm font-medium text-gray-700"
                      >
                        Direcci??n de la instituci??n
                      </label>
                      <TextInput disabled value={data?.institutionAddress} />
                    </div>
                    <div className="col-span-3">
                      <label
                        htmlFor="phone-number"
                        className="text-sm font-medium text-gray-700"
                      >
                        Tel??fono de instituci??n:
                      </label>
                      <TextInput
                        disabled
                        value={data?.institutionPhoneNumber}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {data?.declineReason && (
          <div className="m-5 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 flex justify-end mr-6">
                    Notas
                  </h3>
                </div>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0 flex flex-col">
                <div className="overflow-hidden shadow sm:">
                  <div className="bg-white px-4 py-5 sm:p-9">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6">
                        <TextInput
                          disabled
                          value={data?.declineReason || undefined}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {data?.pendingReason && (
          <div className="m-5 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 flex justify-end mr-6">
                    Notas
                  </h3>
                </div>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0 flex flex-col">
                <div className="overflow-hidden shadow sm:">
                  <div className="bg-white px-4 py-5 sm:p-9">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6">
                        <TextInput
                          disabled
                          value={data?.pendingReason || undefined}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {(data?.status === ApplicationStatus.PENDING ||
          data?.status === ApplicationStatus.DENIED) && (
          <div className="flex flex-col mt-8">
            <div className="flex justify-end">
              <button
                onClick={() => {
                  acceptApplication({ id: aid as string });
                }}
                className="w-96 rounded bg-blue-400 text-white text-l py-2 px-5 mr-4"
              >
                Aceptar Solicitud
              </button>
              {data?.status !== ApplicationStatus.DENIED && (
                <button
                  onClick={showDeclineApplicationModal}
                  className="w-96 rounded bg-red-400 text-white text-l py-2 px-5 mr-4"
                >
                  Denegar Solicitud
                </button>
              )}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={showPendingApplicationModal}
                className="w-96 rounded bg-gray-400 text-white text-l py-2 px-5 mr-4"
              >
                Solicitar Cambios
              </button>
            </div>
          </div>
        )}
      </div>
      {declieApplicationOpen && (
        <DeclineApplicationModal hideModal={hideDeclineApplicationModal} />
      )}
      {pendingApplicationOpen && (
        <PendingApplicationModal hideModal={hidePendingApplicationModal} />
      )}
    </>
  );
};

type DeclineApplicationModalProps = { hideModal: () => void };
type DeclineApplicationFieldValues = { declineReason: string };
const DeclineApplicationModal: React.FC<DeclineApplicationModalProps> = ({
  hideModal,
}) => {
  const {
    push: navigate,
    query: { aid },
  } = useRouter();

  const { register, handleSubmit } = useForm<DeclineApplicationFieldValues>();

  const {
    mutate: declineApplication,
    isSuccess: applicationDeclined,
    isLoading: isDeclining,
  } = trpc.useMutation(["admin.declineApplication"], {
    onSuccess: () => {
      navigate("/applications");
    },
  });

  const onSubmit: SubmitHandler<DeclineApplicationFieldValues> = (data) => {
    declineApplication({
      id: aid as string,
      declineReason: data?.declineReason,
    });
    hideModal();
  };

  return (
    <>
      <Modal>
        <div className="w-full flex flex-col">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h4 className="uppercase text-m font-bold">Agregar motivo</h4>
            <textarea
              rows={6}
              className="border my-6 w-full"
              {...register("declineReason")}
            ></textarea>
            <div className="flex flex-row justify-end">
              <button
                type="submit"
                className="rounded bg-blue-400 text-white text-l py-2 px-5 mr-4"
              >
                Guardar
              </button>
              <button type="button" onClick={hideModal}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </Modal>
      {isDeclining && (
        <LoadingOverlay
          isSuccess={applicationDeclined}
          isLoading={isDeclining}
        />
      )}
    </>
  );
};

type PendingApplicationModalProps = { hideModal: () => void };
type PendingApplicationFieldValues = { pendingReason: string };
const PendingApplicationModal: React.FC<PendingApplicationModalProps> = ({
  hideModal,
}) => {
  const {
    push: navigate,
    query: { aid },
  } = useRouter();

  const { register, handleSubmit } = useForm<PendingApplicationFieldValues>();

  const {
    mutate: pendingApplication,
    isSuccess: applicationPending,
    isLoading: isPending,
  } = trpc.useMutation(["admin.pendingApplication"], {
    onSuccess: () => {
      navigate("/applications");
    },
  });

  const onSubmit: SubmitHandler<PendingApplicationFieldValues> = (data) => {
    pendingApplication({
      id: aid as string,
      pendingReason: data?.pendingReason,
    });
    hideModal();
  };

  return (
    <>
      <Modal>
        <div className="w-full flex flex-col">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h4 className="uppercase text-m font-bold">Agregar motivo</h4>
            <textarea
              rows={6}
              className="border my-6 w-full"
              {...register("pendingReason")}
            ></textarea>
            <div className="flex flex-row justify-end">
              <button
                type="submit"
                className="rounded bg-blue-400 text-white text-l py-2 px-5 mr-4"
              >
                Guardar
              </button>
              <button type="button" onClick={hideModal}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </Modal>
      {isPending && (
        <LoadingOverlay isSuccess={applicationPending} isLoading={isPending} />
      )}
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

export default ApplicationDetails;
