import { useFormContext } from "react-hook-form";

function AcademicInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="m-5 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Datos académicos
            </h3>
            <p className=" text-sm text-gray-600">
              Favor llenar todos los campos.
            </p>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0 flex flex-col">
          <div className="overflow-hidden shadow sm:">
            <div className="bg-white px-4 py-5 sm:p-9">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-3">
                  <fieldset>
                    <legend className="contents text-base font-medium text-gray-900">
                      Tipo de estudio
                    </legend>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center">
                        <label className="ml-3  text-sm font-medium text-gray-700">
                          <input
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            {...register("levelOfStudy")}
                          />
                          Bachillerato Técnico
                        </label>
                      </div>
                      <div className="flex items-center">
                        <label className="ml-3  text-sm font-medium text-gray-700">
                          <input
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            {...register("levelOfStudy")}
                          />
                          Bachillerato General
                        </label>
                      </div>
                      <div className="flex items-center">
                        <label className="ml-3  text-sm font-medium text-gray-700">
                          <input
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            {...register("levelOfStudy")}
                          />
                          Universidad
                        </label>
                      </div>
                      <div className="flex items-center">
                        <label className="ml-3  text-sm font-medium text-gray-700">
                          <input
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            {...register("levelOfStudy")}
                          />
                          Técnico
                        </label>
                      </div>
                    </div>
                    {errors.levelOfStudy && (
                      <i className="text-red-300">
                        {errors.levelOfStudy?.message as string}
                      </i>
                    )}
                  </fieldset>
                </div>
                <div className="col-span-3">
                  <>
                    <label
                      htmlFor="street-address"
                      className=" text-sm font-medium text-gray-700"
                    >
                      Año o ciclo universitario a cursar:
                    </label>
                    <input
                      autoComplete="cicle"
                      className="w-full  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Ciclo 01"
                      {...register("yearOfStudy")}
                    />
                    {errors.yearOfStudy && (
                      <i className="text-red-300">
                        {errors.yearOfStudy?.message as string}
                      </i>
                    )}
                    <br />
                  </>
                  <label
                    htmlFor="street-address"
                    className=" text-sm font-medium text-gray-700"
                  >
                    Cuota mensual a pagar:
                  </label>
                  <input
                    type="number"
                    autoComplete="work-salary"
                    className="w-full  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="$xxxx"
                    {...register("tuition", {
                      setValueAs: (v) => (v === "" ? -1 : parseInt(v)),
                    })}
                  />
                  {errors.tuition && (
                    <i className="text-red-300">
                      {errors.tuition?.message as string}
                    </i>
                  )}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="deparamento"
                    className=" text-sm font-medium text-gray-700"
                  >
                    Institución:
                    <select
                      autoComplete="departamento-name"
                      className="w-full  border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      {...register("institutionName")}
                    >
                      {["UCA"].map((institution) => {
                        return (
                          <option key={institution} value={institution}>
                            {institution}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className=" text-sm font-medium text-gray-700">
                    Carrera o técnico:
                    <select
                      className="w-full border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      {...register("careerName")}
                    >
                      {["Ing. Informatica", "Arquitectura"].map((career) => {
                        return (
                          <option key={career} value={career}>
                            {career}
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
                    Dirección de la institución
                  </label>
                  <input
                    autoComplete="work-street-address"
                    className="w-full border-bottom border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    {...register("institutionAddress")}
                  />
                  {errors.institutionAddress && (
                    <i className="text-red-300">
                      {errors.institutionAddress?.message as string}
                    </i>
                  )}
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="phone-number"
                    className="text-sm font-medium text-gray-700"
                  >
                    Teléfono de institución:
                  </label>
                  <input
                    type="tel"
                    autoComplete="work-phone"
                    className="w-full border-bottom  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    {...register("institutionPhoneNumber")}
                  />
                  {errors.institutionPhoneNumber && (
                    <i className="text-red-300">
                      {errors.institutionPhoneNumber?.message as string}
                    </i>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcademicInfo;
