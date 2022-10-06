import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import StudentInfo from "./studentInfo";
import AcademicInfo from "./academicInfo";

import { MUNICIPALITIES, DEPARTMENTS } from "./utils";

export const formSchema = z.object({
  firstName: z.string().min(5, "Este campo es requerido"),
  lastName: z.string().min(5, "Este campo es requerido"),
  email: z.string().email("Este campo es requerido"),
  dateOfBirth: z.date(),
  municipality: z.enum(MUNICIPALITIES).nullable(),
  department: z.enum(DEPARTMENTS).nullable(),
  address: z.string().min(1, "Este campo es requerido"),
  facebookURL: z.string().url("URL inválido"),
  hasJob: z.enum(["yes", "no"]),
  placeOfWork: z.string().optional(),
  salary: z.number().optional(),
  workAddress: z.string().optional(),
  workPhoneNumber: z
    .string()
    .regex(/^[0-9]{4}[-]?[0-9]{4}$/)
    .optional(),
  levelOfStudy: z.string().min(1, "Este campo es requerido"),
  yearOfStudy: z.string().min(1, "Este campo es requerido"),
  tuition: z.number().nonnegative("Este campo es requerido"),
  institution: z.string().min(1, "Este campo es requerido"),
  career: z.string().min(1, "Este campo es requerido"),
  institutionAddress: z.string().min(1, "Este campo es requerido"),
  institutionPhoneNumber: z
    .string()
    .regex(/^[0-9]{4}[-]?[0-9]{4}$/, "Ingresar un número de teléfono válido")
    .min(1),
});

const defaultValues: FieldValues = {
  hasJob: "no",
  municipality: null,
  department: null,
};

function AdmisionForm() {
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(formSchema),
  });
  const { handleSubmit } = methods;

  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StudentInfo />
        <AcademicInfo />
        <button
          type="submit"
          className={`w-50 bg-blue-400 text-white text-l py-2 px-5 m-8`}
        >
          Enviar Solicitud
        </button>
      </form>
    </FormProvider>
  );
}

export default AdmisionForm;
