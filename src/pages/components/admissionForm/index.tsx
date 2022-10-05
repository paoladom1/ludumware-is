import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import StudentInfo from "./studentInfo";
import AcademicInfo from "./academicInfo";

import { MUNICIPALITIES, DEPARTMENTS } from "./utils";

export const formSchema = z.object({
  firstName: z.string().min(5),
  lastName: z.string().min(5),
  email: z.string().email().min(5),
  dateOfBirth: z.date(),
  municipality: z.enum(MUNICIPALITIES).nullable(),
  department: z.enum(DEPARTMENTS).nullable(),
  address: z.string().min(1),
  facebookURL: z.string().url().optional(),
  hasJob: z.enum(["yes", "no"]),
  placeOfWork: z.string().optional(),
  salary: z.number().optional(),
  workAddress: z.string().optional(),
  workPhoneNumber: z
    .string()
    .regex(/^[0-9]{4}[-]?[0-9]{4}$/, "insert a valid phone number")
    .optional(),
  levelOfStudy: z.string().min(1),
  yearOfStudy: z.string().min(1),
  tuition: z.number().min(1),
  institution: z.string().min(1),
  career: z.string().min(1),
  institutionAddress: z.string().min(1),
  institutionPhoneNumber: z
    .string()
    .regex(/^[0-9]{4}[-]?[0-9]{4}$/, "insert a valid phone number")
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
