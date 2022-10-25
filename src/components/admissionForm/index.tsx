import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useSession } from "next-auth/react";
import { LevelOfStudy } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { subYears } from "date-fns";

import { trpc } from "@/utils/trpc";
import { LoadingOverlay } from "@/components/loading";
import StudentInfo from "./studentInfo";
import AcademicInfo from "./academicInfo";

export const formSchema = z.object({
  firstName: z.string().min(5, "Este campo es requerido"),
  lastName: z.string().min(5, "Este campo es requerido"),
  email: z.string().email("Este campo es requerido"),
  dui: z
    .string()
    .regex(/^\d{8}-\d{1}$/, "Formato incorrecto")
    .optional(),
  dateOfBirth: z
    .date({
      required_error: "Campo requerido ",
      invalid_type_error: "Campo invalido",
    })
    .max(subYears(new Date(), 15), { message: "Muy joven para aplicar " }),
  municipality: z.string().min(1),
  department: z.string().min(1, { message: "Este campo es requerido" }),
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
  levelOfStudy: z.nativeEnum(LevelOfStudy, {
    invalid_type_error: "Este campo es requerido",
  }),
  yearOfStudy: z.string().min(1, "Este campo es requerido"),
  tuition: z.number().nonnegative("Este campo es requerido"),
  careerName: z.string().min(1, "Este campo es requerido"),
  institutionName: z.string().min(1, "Este campo es requerido"),
  institutionAddress: z.string().min(1, "Este campo es requerido"),
  institutionPhoneNumber: z
    .string()
    .regex(/^[0-9]{4}[-]?[0-9]{4}$/, "Ingresar un número de teléfono válido")
    .min(1),
  academicReferenceName: z.string().optional(),
  academicReferenceNumber: z.string().optional(),
  user: z.string().optional(),
});

const defaultValues: FieldValues = {
  hasJob: "no",
};

type FormData = z.infer<typeof formSchema>;

export function AdmissionForm() {
  const utils = trpc.useContext();
  const { data: session } = useSession();

  const methods = useForm<FormData>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });
  const { handleSubmit } = methods;

  const {
    mutate: submitFormMutation,
    isLoading: isSubmitting,
    isSuccess,
  } = trpc.useMutation(["admissionForm.submit"], {
    onSuccess: () => {
      setTimeout(() => {
        utils.invalidateQueries(["admissionForm.hasActiveApplication"]);
      }, 2000);
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    submitFormMutation({ ...data, user: session?.user?.id });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StudentInfo />
        <AcademicInfo />
        {(isSubmitting || isSuccess) && (
          <LoadingOverlay isLoading={isSubmitting} isSuccess={isSuccess} />
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            className={`w-96 rounded bg-blue-400 text-white text-l py-2 px-5 m-8`}
          >
            Enviar Solicitud
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
