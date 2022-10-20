import { subYears, isAfter, isDate } from "date-fns";

interface ApplicationRowProps {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  levelOfStudy: string;
  createdAt: Date;
  dui: string;
  email: string;
  address: string;
  facebookUrl: string;
  tuition: number;
  enrollment: number;
  semester: number;
  yearOfStudy: string;
  hasJob: boolean;
  institutionName: string;
  institutionAddress: string;
  institutionPhoneNumber: string;
  careerName: string;
  placeOfWork: string;
  salary: number;
  position: string;
  workAddress: string;
  workPhoneNumber: string;
  academicReferenceName: string;
  academicReferenceNumber: string;
  municipalityId: number;
}

const ApplicationView: React.FC<ApplicationRowProps> = ({
  id,
  firstName,
  lastName,
  dateOfBirth,
  levelOfStudy,
  createdAt,
  dui,
  email,
  address,
  facebookUrl,
  tuition,
  enrollment,
  semester,
  yearOfStudy,
  hasJob,
  institutionName,
  institutionAddress,
  institutionPhoneNumber,
  careerName,
  placeOfWork,
  salary,
  position,
  workAddress,
  workPhoneNumber,
  academicReferenceName,
  academicReferenceNumber,
  municipalityId,
}) => {
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
                      disabled
                      className="w-full border-bottom border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={firstName}
                    />
                  </label>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className=" text-sm font-medium text-gray-700">
                    Apellidos
                    <input
                      disabled
                      className="  w-full  border-bottom border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={lastName}
                    />
                  </label>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className=" text-sm font-medium text-gray-700">
                    Email address
                    <input
                      disabled
                      value={email}
                      className="w-full border-bottom border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </label>
                </div>
                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label
                    htmlFor="birthday"
                    className=" text-sm font-medium text-gray-700"
                  >
                    Fecha de nacimiento
                    <input
                      disabled
                      value={dateOfBirth.toLocaleDateString("es-ES")}
                      className="form-control w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border-bottom border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
                    <input
                      disabled
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={dui}
                    />
                  </div>
                )}
                <div className="col-span-6 sm:col-span-3">
                  <label className=" text-sm font-medium text-gray-700">
                    Departamento
                    <input
                      disabled
                      value={municipalityId}
                      className="w-full  border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </label>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className=" text-sm font-medium text-gray-700">
                    Munincipio
                    <input
                      disabled
                      value={municipalityId}
                      className="w-full  border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </label>
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="street-address"
                    className=" text-sm font-medium text-gray-700"
                  >
                    Dirección de vivienda
                    <input
                      disabled
                      value={address}
                      className="w-full border-bottom border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </label>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="company-website"
                    className=" text-sm font-medium text-gray-700"
                  >
                    Facebook URL
                    <input
                      disabled
                      className="w-full flex-1 border-bottom border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={facebookUrl}
                    />
                  </label>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="company-website"
                    className=" text-sm font-medium text-gray-700"
                  >
                    Actualmente Trabaja
                    <input
                      disabled
                      className="w-full flex-1 border-bottom border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={hasJob ? "Si" : "No"}
                    />
                  </label>
                </div>
                {hasJob && (
                  <div className="col-span-3">
                    <label
                      htmlFor="street-address"
                      className=" text-sm font-medium text-gray-700"
                    >
                      ¿Dónde trabaja?
                      <input
                        disabled
                        value={placeOfWork}
                        className="w-full  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </label>
                    <label className=" text-sm font-medium text-gray-700">
                      Sueldo actual:
                      <input
                        value={"$" + salary}
                        disabled
                        className="w-full  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
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
                        disabled
                        className="w-full  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={workAddress}
                      />
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
                        disabled
                        className="w-full  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={workPhoneNumber}
                      />
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
};

export default ApplicationView;
