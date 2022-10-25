import { NextPage } from "next";
import { useRouter } from "next/router";
import { Application } from "@prisma/client";
import { subYears, isAfter, isDate } from "date-fns";

import { trpc } from "@/utils/trpc";
import { Loading } from "@/components/loading";
import { TextInput } from "@/components/textInput";

const ApplicationDetails: NextPage = () => {
  const {
    query: { id },
  } = useRouter();

  const { data, isLoading, isError } = trpc.useQuery([
    "admissionForm.findById",
    { id: id as string },
  ]);

  if (isError) return <h1>Un error ha ocurrido</h1>;
  if (isLoading) return <Loading />;

  const {
    firstName,
    lastName,
    dateOfBirth,
    dui,
    email,
    address,
    facebookUrl,
    hasJob,
    placeOfWork,
    salary,
    workAddress,
    workPhoneNumber,
    municipality,
    levelOfStudy,
    yearOfStudy,
    tuition,
    academicReferenceName,
    academicReferenceNumber,
    institutionName,
    institutionAddress,
    institutionPhoneNumber,
    careerName,
  } = data as Application;

  const majorityDate = subYears(new Date(), 18);
  const majority = isDate(dateOfBirth)
    ? isAfter(majorityDate, dateOfBirth as Date)
    : false;

  return (
    <div>
      <div className="m-5 sm:mt-0">
        <h2 className="flex justify-center uppercase text-xl font-bold my-8">
          Datos de la solicitud
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
                      <TextInput disabled value={firstName} />
                    </label>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label className=" text-sm font-medium text-gray-700">
                      Apellidos
                      <TextInput disabled value={lastName} />
                    </label>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label className=" text-sm font-medium text-gray-700">
                      Email address
                      <TextInput disabled value={email} />
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
                        value={dateOfBirth?.toLocaleDateString("es-ES")}
                      />
                    </label>
                  </div>
                  {majority && (
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Número de DUI
                      </label>
                      <TextInput disabled value={dui || ""} />
                    </div>
                  )}
                  <div className="col-span-6 sm:col-span-3">
                    <label className=" text-sm font-medium text-gray-700">
                      Departamento
                      <TextInput
                        disabled
                        value={municipality.department.name}
                      />
                    </label>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label className=" text-sm font-medium text-gray-700">
                      Munincipio
                      <TextInput disabled value={municipality.name} />
                    </label>
                  </div>
                  <div className="col-span-3">
                    <label
                      htmlFor="street-address"
                      className=" text-sm font-medium text-gray-700"
                    >
                      Dirección de vivienda
                      <TextInput disabled value={address} />
                    </label>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="company-website"
                      className=" text-sm font-medium text-gray-700"
                    >
                      Facebook URL
                      <TextInput disabled value={facebookUrl || ""} />
                    </label>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="company-website"
                      className=" text-sm font-medium text-gray-700"
                    >
                      Actualmente Trabaja
                      <TextInput disabled value={hasJob ? "Si" : "No"} />
                    </label>
                  </div>
                  {hasJob && (
                    <div className="col-span-3">
                      <label
                        htmlFor="street-address"
                        className=" text-sm font-medium text-gray-700"
                      >
                        ¿Dónde trabaja?
                        <TextInput disabled value={placeOfWork || ""} />
                      </label>
                      <label className=" text-sm font-medium text-gray-700">
                        Sueldo actual:
                        <TextInput value={"$" + salary} disabled />
                      </label>
                    </div>
                  )}
                  {hasJob && (
                    <div className="col-span-3">
                      <label
                        htmlFor="street-address"
                        className=" text-sm font-medium text-gray-700"
                      >
                        Dirección de trabajo
                        <TextInput disabled value={workAddress || ""} />
                      </label>
                    </div>
                  )}
                  {hasJob && (
                    <div className="col-span-3">
                      <label
                        htmlFor="street-address"
                        className=" text-sm font-medium text-gray-700"
                      >
                        Teléfono de trabajo
                        <TextInput disabled value={workPhoneNumber || ""} />
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
                Datos académicos
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
                    <TextInput value={levelOfStudy} disabled />
                  </div>
                  <div className="col-span-3">
                    <label
                      htmlFor="street-address"
                      className=" text-sm font-medium text-gray-700"
                    >
                      Año o ciclo universitario a cursar:
                    </label>
                    <TextInput value={yearOfStudy} disabled />
                    <label
                      htmlFor="street-address"
                      className=" text-sm font-medium text-gray-700"
                    >
                      Cuota mensual a pagar:
                    </label>
                    <TextInput disabled value={tuition} />
                    <label
                      htmlFor="academic-reference-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Referencia Académica (Nombre Completo):
                    </label>
                    <TextInput disabled value={academicReferenceName || ""} />
                    <label
                      htmlFor="academic-reference-phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Número de teléfono de referencia académica:
                    </label>
                    <TextInput disabled value={academicReferenceNumber || ""} />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label className=" text-sm font-medium text-gray-700">
                      Institución:
                      <TextInput disabled value={institutionName} />
                    </label>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label className=" text-sm font-medium text-gray-700">
                      Carrera o técnico:
                      <TextInput disabled value={careerName} />
                    </label>
                  </div>
                  <div className="col-span-3">
                    <label
                      htmlFor="street-address"
                      className=" text-sm font-medium text-gray-700"
                    >
                      Dirección de la institución
                    </label>
                    <TextInput disabled value={institutionAddress} />
                  </div>
                  <div className="col-span-3">
                    <label
                      htmlFor="phone-number"
                      className="text-sm font-medium text-gray-700"
                    >
                      Teléfono de institución:
                    </label>
                    <TextInput disabled value={institutionPhoneNumber} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <button
          type="submit"
          className="w-96 rounded bg-blue-400 text-white text-l py-2 px-5 m-8"
        >
          Aceptar Solicitud
        </button>
        <button
          type="submit"
          className="w-96 rounded bg-red-400 text-white text-l py-2 px-5 m-8"
        >
          Denegar Solicitud
        </button>
      </div>
    </div>
  );
};

export default ApplicationDetails;
