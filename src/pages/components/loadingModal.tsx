import { CheckIcon } from "@heroicons/react/24/solid";
import { Loading as LoadingSVG } from "./loading";

interface LoadingFormProps {
  isLoading: boolean;
  isSuccess: boolean;
}

const Success: React.FC = () => {
  return (
    <div className="p-6 text-center sm:w-full">
      <CheckIcon className="text-green-400 w-8 h-8 mx-auto my-4" />
      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
        Solicitud enviada con exito
      </h3>
    </div>
  );
};

const Loading: React.FC = () => (
  <div className="p-6 text-center sm:w-full">
    <LoadingSVG />
    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
      Enviando solicitud
    </h3>
  </div>
);

export const Modal: React.FC<LoadingFormProps> = ({ isLoading, isSuccess }) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                {isLoading && <Loading />}
                {isSuccess && <Success />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
