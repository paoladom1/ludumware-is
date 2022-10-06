import React, { ReactNode } from "react";
import Menulateral from "./Menulateral";

type MyProps = {
    // using interface is also ok
    children: ReactNode;
};

class Layout extends React.Component<MyProps>{
    constructor(props: any) {
        super(props);
    }

    render(): ReactNode {
        return (

            <div className="flex flex-wrap bg-gray-100 w-full h-screen">
                {/* Se trae el componente Menu lateral */}
                <Menulateral />
                <div className="w-5/6 max-h-screen overflow-y-auto">
                    <div className="p-4 text-gray-500">
                        {this.props.children}
                    </div>
                </div>
            </div>

        );
    }
}

export default Layout;