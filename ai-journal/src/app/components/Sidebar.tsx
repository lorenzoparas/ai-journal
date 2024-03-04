import { Card } from "@material-tailwind/react";
import Logo from '../../../public/prompt.png';
import Image from "next/image";

const Sidebar = () => {
    return (
      <Card className="h-full p-4 shadow-blue-gray-900/5 w-max">
        <Image src={Logo} className="h-5 w-5" alt='logo' />
      </Card>
    );
};

export default Sidebar;