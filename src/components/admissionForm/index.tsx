import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Gender, LevelOfStudy } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { subYears } from "date-fns";

import { trpc } from "@/utils/trpc";
import { Loading, LoadingOverlay } from "@/components/loading";
import StudentInfo from "./studentInfo";
import AcademicInfo from "./academicInfo";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const HasJobValues = ["yes", "no"] as const;
const HasJobEnum = z.enum(HasJobValues);

const StudentInfoSchema = z.object({
  firstName: z.string().min(5, "Este campo es requerido"),
  lastName: z.string().min(5, "Este campo es requerido"),
  gender: z.nativeEnum(Gender, {
    invalid_type_error: "Este campo es requerido",
  }),
  email: z.string().email("Este campo es requerido"),
  dui: z
    .union([
      z.string().length(0),
      z.string().regex(/^\d{8}-\d{1}$/, "Formato incorrecto"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
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
  hasJob: HasJobEnum,
  placeOfWork: z.string().optional(),
  salary: z.number().optional(),
  workAddress: z.string().optional(),
  workPhoneNumber: z
    .union([z.string().length(0), z.string().regex(/^[0-9]{4}[-]?[0-9]{4}$/)])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  photoUrl: z.string().optional(),
});

const AcademicInfoSchema = z.object({
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
});

export const FormSchema = z
  .object({})
  .merge(StudentInfoSchema)
  .merge(AcademicInfoSchema);

type FormData = z.infer<typeof FormSchema>;

interface AdmissionFormProps {
  isEdit: boolean;
}

export const AdmissionForm: React.FC<AdmissionFormProps> = ({ isEdit }) => {
  const router = useRouter();
  const session = useSession();

  const methods = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const { isLoading, data: savedAdmission } = trpc.useQuery(
    ["admissionForm.findByUser", { id: session?.data?.user?.id as string }],
    {
      enabled: isEdit,
      onSuccess: (data) => {
        if (data) {
          Object.entries(data).forEach(([field, value]) => {
            switch (field) {
              case "department":
                break;
              case "municipality":
                break;
              case "photoUrl":
                break;
              case "salary":
                methods.setValue("salary", (value as number) || undefined);
                break;
              case "hasJob":
                methods.setValue(field as keyof FormData, value ? "yes" : "no");
                break;
              case "dateOfBirth":
                methods.setValue(
                  field as keyof FormData,
                  new Date(value as string).toLocaleDateString("en-CA")
                );
                break;
              default:
                methods.setValue(
                  field as keyof FormData,
                  (value as string | number) || undefined
                );
            }
          });
        }
      },
    }
  );

  const { mutate: update, isLoading: isUpdating } = trpc.useMutation(
    ["admissionForm.updateApplication"],
    {
      onSuccess: () => {
        router.push("/");
      },
    }
  );

  const { mutate: create, isLoading: isCreating } = trpc.useMutation(
    ["admissionForm.createApplication"],
    {
      onSuccess: () => {
        router.push("/");
      },
    }
  );

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (isEdit) update({ data, id: savedAdmission?.id as string });
    else create({ ...data });
  };

  if (isLoading) return <Loading />;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit, (errors) =>
          console.error(errors)
        )}
      >
        {(isCreating || isUpdating) && (
          <LoadingOverlay
            isLoading={isCreating || isUpdating}
            isSuccess={false}
          />
        )}
        <StudentInfo
          defaultValues={
            isEdit
              ? {
                  department: savedAdmission?.municipality?.department
                    ?.id as string,
                  municipality: savedAdmission?.municipalityId as string,
                }
              : undefined
          }
        />
        <AcademicInfo />

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
};
