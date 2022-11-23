import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { subYears, isAfter, isDate } from "date-fns";

import { trpc } from "@/utils/trpc";
import { Gender, Municipality } from "@prisma/client";
import Image from "next/image";
import { Loading } from "@/components/loading";

const imageMimeType = /image\/(png|jpg|jpeg)/i;
type GenderLabels = { MALE: string; FEMALE: string; OTHER: string };

const GENDER_LABEL: GenderLabels = {
  MALE: "Masculino",
  FEMALE: "Femenino",
  OTHER: "Otro",
};

type GenderKey = keyof typeof Gender;

interface StudentInfoProps {
  defaultValues?: { department: string; municipality: string };
}

const StudentInfo: React.FC<StudentInfoProps> = ({ defaultValues }) => {
  const [municipalitiesByDepartment, setMunicipalitiesByDepartment] = useState<
    Municipality[]
  >([]);

  const { data: session } = useSession();
  const {
    watch,
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const departmentId = watch("department");

  const { data: departmentsData, isLoading: isLoadingDepartments } =
    trpc.useQuery(["departments.getAll"], {
      onSuccess: () => {
        if (defaultValues?.department) {
          setValue("department", defaultValues?.department);
        }
      },
    });

  const { data: municipalitiesData, isLoading: isLoadingMunicipalities } =
    trpc.useQuery(["municipalities.getAll"], {
      onSuccess: () => {
        if (defaultValues?.municipality) {
          setValue("municipality", defaultValues?.municipality);
        }
      },
    });

  useEffect(() => {
    if (departmentId && !isLoadingMunicipalities && municipalitiesData)
      setMunicipalitiesByDepartment(
        municipalitiesData?.filter(
          (municipality) => municipality.departmentId === departmentId
        )
      );
  }, [departmentId, isLoadingMunicipalities, municipalitiesData]);

  const hasJob = watch("hasJob") === "yes";
  const dateOfBirth = watch("dateOfBirth");
  const majorityDate = subYears(new Date(), 18);
  const majority = isDate(dateOfBirth)
    ? isAfter(majorityDate, dateOfBirth)
    : false;

  const [file, setFile] = useState<File | undefined>();
  const [fileDataURL, setFileDataURL] = useState<
    string | ArrayBuffer | undefined
  >();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (!file?.type.match(imageMimeType)) {
      alert("El formato de la imagen no es válido");
      return;
    }
    setFile(file);
  };

  useEffect(() => {
    let fileReader: FileReader;
    let isCancel = false;

    if (file) {
      fileReader = new FileReader();

      fileReader.onload = (e) => {
        if (e?.target?.result && !isCancel) {
          setFileDataURL(e?.target?.result);
          setValue("photoUrl", fileDataURL);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;

      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file, fileDataURL, setValue]);

  const removeSelectedImage = () => {
    setFileDataURL(undefined);
    setFile(undefined);
    setValue("photoUrl", undefined);
  };

  if (isLoadingDepartments || isLoadingMunicipalities) return <Loading />;

  return (
    <div className="m-5 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Datos del solicitante
            </h3>
            <p className=" text-sm text-gray-600">
              Favor llenar todos los campos.
            </p>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-9">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label className=" text-sm font-medium text-gray-700">
                    Nombres
                    <input
                      autoComplete="given-name"
                      className="w-full border-bottom border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      {...register("firstName")}
                    />
                    {errors.firstName && (
                      <i className="text-red-300">
                        {errors.firstName?.message as string}
                      </i>
                    )}
                  </label>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className=" text-sm font-medium text-gray-700">
                    Apellidos
                    <input
                      autoComplete="family-name"
                      className="  w-full  border-bottom border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      {...register("lastName")}
                    />
                    {errors.lastName && (
                      <i className="text-red-300">
                        {errors.lastName?.message as string}
                      </i>
                    )}
                  </label>
                </div>
                <div className="col-span-6 flex-row">
                  <legend className="contents text-base font-medium text-gray-900">
                    Genero
                  </legend>
                  <div className="flex flex-row mt-2">
                    {Object.keys(Gender).map((gender) => {
                      const label = GENDER_LABEL[gender as GenderKey];

                      return (
                        <div key={gender} className="flex items-center mr-8">
                          <label className="text-sm font-medium text-gray-700">
                            <input
                              type="radio"
                              value={gender}
                              className="mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              {...register("gender")}
                            />
                            {label}
                          </label>
                        </div>
                      );
                    })}
                    {errors.gender && (
                      <i className="text-red-300">
                        {errors.gender?.message as string}
                      </i>
                    )}
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className=" text-sm font-medium text-gray-700">
                    Correo Electronico
                    <input
                      autoComplete="email"
                      defaultValue={session?.user?.email || ""}
                      className="w-full border-bottom border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      {...register("email")}
                    />
                    {errors.email && (
                      <i className="text-red-300">
                        {errors.email?.message as string}
                      </i>
                    )}
                  </label>
                </div>
                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label
                    htmlFor="birthday"
                    className=" text-sm font-medium text-gray-700"
                  >
                    Fecha de nacimiento
                    <input
                      type="date"
                      className="form-control w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border-bottom border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      {...register("dateOfBirth", {
                        valueAsDate: true,
                        required: true,
                      })}
                    />
                    {errors.dateOfBirth && (
                      <i className="text-red-300">
                        {errors?.dateOfBirth?.message as string}
                      </i>
                    )}
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
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      {...register("dui")}
                    />
                    {errors.dui && (
                      <i className="text-red-300">
                        {errors.dui.message as string}
                      </i>
                    )}
                  </div>
                )}
                <div className="col-span-6 sm:col-span-3">
                  <label className=" text-sm font-medium text-gray-700">
                    Departamento
                    <select
                      defaultValue=""
                      className="w-full border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      {...register("department")}
                    >
                      <option disabled hidden value="">
                        ----
                      </option>
                      {departmentsData?.map(({ id, name }) => {
                        return (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        );
                      })}
                    </select>
                    {errors.department && (
                      <i className="text-red-300">
                        {errors.department?.message as string}
                      </i>
                    )}
                  </label>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className=" text-sm font-medium text-gray-700">
                    Munincipio
                    <select
                      defaultValue=""
                      disabled={municipalitiesByDepartment?.length === 0}
                      autoComplete="municipio-name"
                      className="w-full border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      {...register("municipality")}
                    >
                      <option disabled hidden value="">
                        ----
                      </option>
                      {municipalitiesByDepartment?.map(({ id, name }) => {
                        return (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="street-address"
                    className=" text-sm font-medium text-gray-700"
                  >
                    Dirección de vivienda
                    <input
                      autoComplete="street-address"
                      className="w-full border-bottom border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      {...register("address")}
                    />
                    {errors.address && (
                      <i className="text-red-300">
                        {errors.address?.message as string}
                      </i>
                    )}
                  </label>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="company-website"
                    className=" text-sm font-medium text-gray-700"
                  >
                    Facebook
                    <input
                      type="text"
                      className="w-full flex-1 border-bottom border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      {...register("facebookUrl")}
                    />
                    {errors.facebookURL && (
                      <i className="text-red-300">
                        {errors.facebookURL?.message as string}
                      </i>
                    )}
                  </label>
                </div>
                <div className="col-span-3">
                  <fieldset>
                    <legend className="contents text-base font-medium text-gray-900">
                      Actualmente trabaja
                    </legend>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center">
                        <label className="ml-3  text-sm font-medium text-gray-700 center">
                          <input
                            value="yes"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            {...register("hasJob")}
                          />
                          <span className="ml-4">Si</span>
                        </label>
                      </div>
                      <div className="flex items-center">
                        <label className="ml-3  text-sm font-medium text-gray-700">
                          <input
                            value="no"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            {...register("hasJob")}
                          />
                          <span className="ml-4">No</span>
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
                {hasJob && (
                  <div className="col-span-3">
                    <label
                      htmlFor="street-address"
                      className=" text-sm font-medium text-gray-700"
                    >
                      ¿Dónde trabaja?
                      <input
                        autoComplete="work-place"
                        className="w-full  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="UCA"
                        {...register("placeOfWork")}
                      />
                      {errors.placeOfWork && (
                        <i className="text-red-300">
                          {errors.placeOfWork?.message as string}
                        </i>
                      )}
                    </label>
                    <label className=" text-sm font-medium text-gray-700">
                      Sueldo actual:
                      <input
                        type="number"
                        autoComplete="work-salary"
                        className="w-full  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="$"
                        {...register("salary", {
                          setValueAs: (v) => (v === "" ? 0 : parseInt(v)),
                        })}
                      />
                      {errors.salary && (
                        <i className="text-red-300">
                          {errors.salary?.message as string}
                        </i>
                      )}
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
                      <input
                        autoComplete="work-street-address"
                        className="w-full  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        {...register("workAddress")}
                      />
                      {errors.workAddress && (
                        <i className="text-red-300">
                          {errors.workAddress?.message as string}
                        </i>
                      )}
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
                      <input
                        type="tel"
                        autoComplete="work-phone"
                        className="w-full  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        {...register("workPhoneNumber", { required: false })}
                      />
                      {errors.workPhoneNumber && (
                        <i className="text-red-300">
                          {errors.workPhoneNumber?.message as string}
                        </i>
                      )}
                    </label>
                  </div>
                )}
              </div>
              <div className="mt-5 md:col-span-6 md:mt-0">
                <legend className="block text-md font-medium text-gray-700 mt-4">
                  Foto de perfil (no selfies)
                </legend>
                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="space-y-1 text-center">
                    {fileDataURL ? (
                      <div className="relative img-preview-wrapper">
                        {
                          <Image
                            src={fileDataURL as string}
                            width={300}
                            height={300}
                            alt="preview"
                          />
                        }
                        <button
                          onClick={removeSelectedImage}
                          className="absolute -right-4 -top-3"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <>
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="photoUrl"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <Controller
                              name="photoUrl"
                              control={control}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="file"
                                  id="photoUrl"
                                  className="sr-only"
                                  accept=".png, .jpg, .jpeg"
                                  onChange={changeHandler}
                                />
                              )}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG,JPG</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
