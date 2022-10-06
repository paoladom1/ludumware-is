import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { LevelOfStudy } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import StudentInfo from "./studentInfo";
import AcademicInfo from "./academicInfo";
import { trpc } from "../../../utils/trpc";

export const formSchema = z.object({
  firstName: z.string().min(5, "Este campo es requerido"),
  lastName: z.string().min(5, "Este campo es requerido"),
  email: z.string().email("Este campo es requerido"),
  dateOfBirth: z.date(),
  municipality: z.string().min(1),
  department: z.string().min(1),
  address: z.string().min(1, "Este campo es requerido"),
  facebookUrl: z.string().optional(),
  hasJob: z.enum(["yes", "no"]),
  placeOfWork: z.string().optional(),
  salary: z.number().optional(),
  workAddress: z.string().optional(),
  workPhoneNumber: z
    .string()
    .regex(/^[0-9]{4}[-]?[0-9]{4}$/)
    .optional(),
  levelOfStudy: z.nativeEnum(LevelOfStudy),
  yearOfStudy: z.string().min(1, "Este campo es requerido"),
  tuition: z.number().nonnegative("Este campo es requerido"),
  careerName: z.string().min(1, "Este campo es requerido"),
  institutionName: z.string().min(1, "Este campo es requerido"),
  institutionAddress: z.string().min(1, "Este campo es requerido"),
  institutionPhoneNumber: z
    .string()
    .regex(/^[0-9]{4}[-]?[0-9]{4}$/, "Ingresar un número de teléfono válido")
    .min(1),
});

const defaultValues: FieldValues = {
  hasJob: "no",
};

type FormData = z.infer<typeof formSchema>;

function AdmisionForm() {
  const submitForm = trpc.useMutation(["admissionForm.submit"]);

  const methods = useForm<FormData>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormData> = (data) => {
    submitForm.mutate(data);
  };

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
