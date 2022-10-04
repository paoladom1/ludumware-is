
function admisionForm() {
    return (
        <>
            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200" />
                </div>
            </div>

            <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Datos del solicitante</h3>
                            <p className="mt-1 text-sm text-gray-600">Favor llenar todos los campos.</p>
                        </div>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <form action="#" method="POST">
                            <div className="overflow-hidden shadow sm:rounded-md">
                                <div className="bg-white px-4 py-5 sm:p-9">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                Nombres
                                            </label>
                                            <input
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                autoComplete="given-name"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                Apellidos
                                            </label>
                                            <input
                                                type="text"
                                                name="last-name"
                                                id="last-name"
                                                autoComplete="family-name"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                                Email address
                                            </label>
                                            <input
                                                type="text"
                                                name="email-address"
                                                id="email-address"
                                                autoComplete="email"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                                                Fecha de nacimiento
                                            </label>
                                            <div className="flex items-center justify-center">
                                                <div className="datepicker relative form-floating mb-3 xl:w-96">
                                                    <input type="text"
                                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        placeholder="Select a date" />
                                                    <label htmlFor="floatingInput" className="text-gray-700">Select a date</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="deparamento" className="block text-sm font-medium text-gray-700">
                                                Departamento
                                            </label>
                                            <select
                                                id="departamento"
                                                name="departamento"
                                                autoComplete="departamento-name"
                                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                                <option>Ahuachapan</option>
                                                <option>Cabañas</option>
                                                <option>Chalatenango</option>
                                                <option>Cuscatlán</option>
                                                <option>La Libertad</option>
                                                <option>Morazán</option>
                                                <option>La Paz</option>
                                                <option>Santa Ana</option>
                                                <option>San Miguel</option>
                                                <option>San Salvador</option>
                                                <option>San Vicente</option>
                                                <option>Sonsonate</option>
                                                <option>La Unión</option>
                                                <option>Usulután</option>
                                            </select>
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="municipio" className="block text-sm font-medium text-gray-700">
                                                Munincipio
                                            </label>
                                            <select
                                                id="municipio"
                                                name="municipio"
                                                autoComplete="municipio-name"
                                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                                <option>Ahuachapan</option>
                                                <option>Cabañas</option>
                                                <option>Chalatenango</option>
                                                <option>Cuscatlán</option>
                                                <option>La Libertad</option>
                                                <option>Morazán</option>
                                                <option>La Paz</option>
                                                <option>Santa Ana</option>
                                                <option>San Miguel</option>
                                                <option>San Salvador</option>
                                                <option>San Vicente</option>
                                                <option>Sonsonate</option>
                                                <option>La Unión</option>
                                                <option>Usulután</option>
                                            </select>
                                        </div>
                                        <div className="col-span-3">
                                            <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                                Dirección de vivienda
                                            </label>
                                            <input
                                                type="text"
                                                name="street-address"
                                                id="street-address"
                                                autoComplete="street-address"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                                Facebook
                                            </label>
                                            <div className="mt-1 flex rounded-md shadow-sm">
                                                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                                    http://
                                                </span>
                                                <input
                                                    type="text"
                                                    name="company-website"
                                                    id="company-website"
                                                    className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="www.example.com"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-3">
                                            <fieldset>
                                                <legend className="contents text-base font-medium text-gray-900">Actualmente trabaja</legend>
                                                <div className="mt-4 space-y-4">
                                                    <div className="flex items-center">
                                                        <input
                                                            id="yes-selection"
                                                            name="work-selection"
                                                            type="radio"
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label htmlFor="yes-selection" className="ml-3 block text-sm font-medium text-gray-700">
                                                            Sí
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            id="no-selection"
                                                            name="work-selection"
                                                            type="radio"
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label htmlFor="no-selection" className="ml-3 block text-sm font-medium text-gray-700">
                                                            No
                                                        </label>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div className="col-span-3">
                                            <>
                                                <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                                    ¿Dónde trabaja?
                                                </label>
                                                <input
                                                    type="text"
                                                    name="work-place"
                                                    id="work-place"
                                                    autoComplete="work-place"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="UCA"
                                                />
                                                <br />
                                            </>
                                            <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                                Sueldo actual:
                                            </label>
                                            <input
                                                type="text"
                                                name="work-salary"
                                                id="work-salary"
                                                autoComplete="work-salary"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                placeholder="$xxxx"
                                            />
                                        </div>
                                        <div className="col-span-3">
                                            <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                                Dirección de trabajo
                                            </label>
                                            <input
                                                type="text"
                                                name="work-street-address"
                                                id="work-street-address"
                                                autoComplete="work-street-address"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className="col-span-3">
                                            <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                                Teléfono de trabajo
                                            </label>
                                            <input
                                                type="text"
                                                name="work-phone"
                                                id="work-phone"
                                                autoComplete="work-phone"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                placeholder="XXXX-XXXX"
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <br />
            <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Datos académicos</h3>
                            <p className="mt-1 text-sm text-gray-600">Favor llenar todos los campos.</p>
                        </div>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <form action="#" method="POST">
                            <div className="overflow-hidden shadow sm:rounded-md">
                                <div className="bg-white px-4 py-5 sm:p-9">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-3">
                                            <fieldset>
                                                <legend className="contents text-base font-medium text-gray-900">Tipo de estudio</legend>
                                                <div className="mt-4 space-y-4">
                                                    <div className="flex items-center">
                                                        <input
                                                            id="highschool-selection"
                                                            name="study-selection"
                                                            type="radio"
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label htmlFor="highschool-selection" className="ml-3 block text-sm font-medium text-gray-700">
                                                            Bachillerato Técnico
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            id="highschool-selection"
                                                            name="study-selection"
                                                            type="radio"
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label htmlFor="highschool-selection" className="ml-3 block text-sm font-medium text-gray-700">
                                                            Bachillerato General
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            id="college-selection"
                                                            name="work-selection"
                                                            type="radio"
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label htmlFor="college-selection" className="ml-3 block text-sm font-medium text-gray-700">
                                                            Universidad
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            id="technical-selection"
                                                            name="study-selection"
                                                            type="radio"
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label htmlFor="technical-selection" className="ml-3 block text-sm font-medium text-gray-700">
                                                            Técnico
                                                        </label>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div className="col-span-3">
                                            <>
                                                <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                                    Año o ciclo universitario a cursar:
                                                </label>
                                                <input
                                                    type="text"
                                                    name="cicle"
                                                    id="cicle"
                                                    autoComplete="cicle"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="Ciclo 01"
                                                />
                                                <br />
                                            </>
                                            <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                                Cuota mensual a pagar:
                                            </label>
                                            <input
                                                type="text"
                                                name="work-salary"
                                                id="work-salary"
                                                autoComplete="work-salary"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                placeholder="$xxxx"
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="deparamento" className="block text-sm font-medium text-gray-700">
                                                Institución:
                                            </label>
                                            <select
                                                id="departamento"
                                                name="departamento"
                                                autoComplete="departamento-name"
                                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                                <option>Ahuachapan</option>
                                                <option>Cabañas</option>
                                                <option>Chalatenango</option>
                                                <option>Cuscatlán</option>
                                                <option>La Libertad</option>
                                                <option>Morazán</option>
                                                <option>La Paz</option>
                                                <option>Santa Ana</option>
                                                <option>San Miguel</option>
                                                <option>San Salvador</option>
                                                <option>San Vicente</option>
                                                <option>Sonsonate</option>
                                                <option>La Unión</option>
                                                <option>Usulután</option>
                                            </select>
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="deparamento" className="block text-sm font-medium text-gray-700">
                                                Carrera o técnico:
                                            </label>
                                            <select
                                                id="departamento"
                                                name="departamento"
                                                autoComplete="departamento-name"
                                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                                <option>Ahuachapan</option>
                                                <option>Cabañas</option>
                                                <option>Chalatenango</option>
                                                <option>Cuscatlán</option>
                                                <option>La Libertad</option>
                                                <option>Morazán</option>
                                                <option>La Paz</option>
                                                <option>Santa Ana</option>
                                                <option>San Miguel</option>
                                                <option>San Salvador</option>
                                                <option>San Vicente</option>
                                                <option>Sonsonate</option>
                                                <option>La Unión</option>
                                                <option>Usulután</option>
                                            </select>
                                        </div>
                                        <div className="col-span-3">
                                            <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                                Dirección de la institución
                                            </label>
                                            <input
                                                type="text"
                                                name="work-street-address"
                                                id="work-street-address"
                                                autoComplete="work-street-address"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className="col-span-3">
                                            <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                                Teléfono de institución:
                                            </label>
                                            <input
                                                type="text"
                                                name="work-phone"
                                                id="work-phone"
                                                autoComplete="work-phone"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                placeholder="XXXX-XXXX"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}


export default admisionForm;