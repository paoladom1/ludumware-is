import { useSession } from "next-auth/react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { trpc } from "../../../utils/trpc";

import { subYears, isAfter, isDate } from "date-fns";

function StudentInfo() {
  const { data: session } = useSession();
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext();

  const [selectedDepartment, setSelectedDepartment] = useState("");

  const { data: departmentsData } = trpc.useQuery(["departments.getAll"]);
  const { data: municipalitiesData } = trpc.useQuery([
    "municipalities.findByDepartment",
    { id: selectedDepartment },
  ]);

  const hasJob = watch("hasJob") === "yes";
  const dateOfBirth = watch("dateOfBirth");
  const majorityDate = subYears(new Date(), 18);
  const majority = isDate(dateOfBirth)
    ? isAfter(majorityDate, dateOfBirth)
    : false;

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
                      className="  w-full border-bottom border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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

                <div className="col-span-6 sm:col-span-3">
                  <label className=" text-sm font-medium text-gray-700">
                    Email address
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
                      required
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
                      {...register("department", {
                        onChange: (e: React.FormEvent<HTMLSelectElement>) => {
                          e.preventDefault();
                          setSelectedDepartment(e.currentTarget.value);
                        },
                      })}
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
                      disabled={municipalitiesData?.length === 0}
                      defaultValue=""
                      autoComplete="municipio-name"
                      className="w-full border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      {...register("municipality")}
                    >
                      <option disabled hidden value="">
                        ----
                      </option>
                      {municipalitiesData?.map(({ id, name }) => {
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
                        {...register("workPhoneNumber")}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentInfo;
