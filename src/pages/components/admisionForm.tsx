import {
  FieldValues,
  useForm,
  UseFormRegister,
  useFormState,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const departments = [
  "Ahuachapán",
  "Cabañas",
  "Chalatenango",
  "Cuscatlán",
  "La Libertad",
  "La Paz",
  "La Unión",
  "Morazán",
  "San Miguel",
  "San Salvador",
  "San Vicente",
  "Santa Ana",
  "Sonsonate",
  "Usulután",
] as const;

const municipalities = [
  "Santa Tecla",
  "Antiguo Cuscatlán",
  "Zaragoza",
] as const;

const formSchema = z.object({
  firstName: z.string({ required_error: "Este campo es requerido" }),
  lastName: z.string({ required_error: "Este campo es requerido" }),
  email: z.string({ required_error: "Este campo es requerido" }),
  dateOfBirth: z.date({ required_error: "Este campo es requerido" }),
  municipality: z.enum(municipalities),
  department: z.enum(departments),
  address: z.string({ required_error: "Este campo es requerido" }),
  facebookURL: z.string({ required_error: "Este campo es requerido" }),
  hasJob: z.string(),
  placeOfWork: z.string({ required_error: "Este campo es requerido" }),
  salary: z.number().optional(),
  workAddress: z.string().optional(),
  workPhoneNumber: z.string().optional(),
  levelOfStudy: z.string({ required_error: "Este campo es requerido" }),
  yearOfStudy: z.string({ required_error: "Este campo es requerido" }),
  tuition: z.number({ required_error: "Este campo es requerido" }),
  institution: z.string({ required_error: "Este campo es requerido" }),
  career: z.string({ required_error: "Este campo es requerido" }),
  institutionAddress: z.string({ required_error: "Este campo es requerido" }),
  institutionPhoneNumber: z.string({
    required_error: "Este campo es requerido",
  }),
});

const defaultValues: FieldValues = { hasJob: "no" };

function AdmisionForm() {
  const { formState: { isValid, errors }, register, handleSubmit } = useForm({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  console.log(isValid);
  console.log(errors);

  const onSubmit = (data: FieldValues) => console.log(data);


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StudentData register={register} />
      <AcademicData register={register} />
      {errors && <p>there are some errors</p>}
      <button
        type="submit"
        disabled={!isValid}
        className={`w-50 ${
          isValid ? "bg-blue-400" : "bg-blue-200"
        } text-white text-l py-2 px-5 m-8`}
      >
        Enviar Solicitud
      </button>
    </form>
  );
}

interface FormSectionProps {
  register: UseFormRegister<FieldValues>;
}

function StudentData({ register }: FormSectionProps) {
  return (
    <div className="m-5 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Datos del solicitante
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Favor llenar todos los campos.
            </p>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-9">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nombres
                  </label>
                  <input
                    autoComplete="given-name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    {...register("firstName")}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Apellidos
                  </label>
                  <input
                    autoComplete="family-name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    {...register("lastName")}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    autoComplete="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    {...register("email")}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label
                    htmlFor="birthday"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Fecha de nacimiento
                  </label>
                  <div className="flex items-center justify-center">
                    <div className="datepicker relative form-floating mb-3 xl:w-96">
                      <input
                        type="date"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Select a date"
                        {...register("dateOfBirth", { valueAsDate: true })}
                      />
                      <label htmlFor="floatingInput" className="text-gray-700">
                        Select a date
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="deparamento"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Departamento
                  </label>
                  <select
                    autoComplete="departamento-name"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    {...register("departments")}
                  >
                    {departments.map((department) => {
                      return (
                        <option key={department} value={department}>
                          {department}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="municipio"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Munincipio
                  </label>
                  <select
                    autoComplete="municipio-name"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    {...register("municipality")}
                  >
                    {municipalities.map((municipality) => {
                      return (
                        <option key={municipality} value={municipality}>
                          {municipality}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Dirección de vivienda
                  </label>
                  <input
                    autoComplete="street-address"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    {...register("address")}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="company-website"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Facebook
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                      http://
                    </span>
                    <input
                      className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="www.example.com"
                      {...register("facebookURL")}
                    />
                  </div>
                </div>
                <div className="col-span-3">
                  <fieldset>
                    <legend className="contents text-base font-medium text-gray-900">
                      Actualmente trabaja
                    </legend>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center">
                        <label className="ml-3 block text-sm font-medium text-gray-700 center">
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
                        <label className="ml-3 block text-sm font-medium text-gray-700">
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
                <div className="col-span-3">
                  <>
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      ¿Dónde trabaja?
                    </label>
                    <input
                      autoComplete="work-place"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="UCA"
                      {...register("placeOfWork")}
                    />
                    <br />
                  </>
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sueldo actual:
                  </label>
                  <input
                    type="number"
                    autoComplete="work-salary"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="$xxxx"
                    {...register("salary", { valueAsNumber: true })}
                  />
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Dirección de trabajo
                  </label>
                  <input
                    autoComplete="work-street-address"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    {...register("workAddress")}
                  />
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Teléfono de trabajo
                  </label>
                  <input
                    type="number"
                    autoComplete="work-phone"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="XXXX-XXXX"
                    {...register("workPhoneNumber", { valueAsNumber: true })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AcademicData({ register }: FormSectionProps) {
  return (
    <div className="my-5 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Datos académicos
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Favor llenar todos los campos.
            </p>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0 flex flex-col">
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-9">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-3">
                  <fieldset>
                    <legend className="contents text-base font-medium text-gray-900">
                      Tipo de estudio
                    </legend>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          {...register("levelOfStudy")}
                        />
                        <label
                          htmlFor="highschool-selection"
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          Bachillerato Técnico
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          {...register("levelOfStudy")}
                        />
                        <label
                          htmlFor="highschool-selection"
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          Bachillerato General
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          {...register("levelOfStudy")}
                        />
                        <label
                          htmlFor="college-selection"
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          Universidad
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          {...register("levelOfStudy")}
                        />
                        <label
                          htmlFor="technical-selection"
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          Técnico
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div className="col-span-3">
                  <>
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Año o ciclo universitario a cursar:
                    </label>
                    <input
                      autoComplete="cicle"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Ciclo 01"
                      {...register("yearOfStudy")}
                    />
                    <br />
                  </>
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cuota mensual a pagar:
                  </label>
                  <input
                    type="number"
                    autoComplete="work-salary"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="$xxxx"
                    {...register("tuition", { valueAsNumber: true })}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="deparamento"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Institución:
                  </label>
                  <select
                    autoComplete="departamento-name"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    {...register("department")}
                  >
                    {departments.map((department) => {
                      return (
                        <option key={department} value={department}>
                          {department}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="deparamento"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Carrera o técnico:
                  </label>
                  <select
                    autoComplete="departamento-name"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    {...register("career")}
                  >
                    {departments.map((department) => {
                      return (
                        <option key={department} value={department}>
                          {department}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Dirección de la institución
                  </label>
                  <input
                    autoComplete="work-street-address"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    {...register("institutionAddress")}
                  />
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Teléfono de institución:
                  </label>
                  <input
                    autoComplete="work-phone"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="XXXX-XXXX"
                    {...register("institutionPhoneNumber")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdmisionForm;
