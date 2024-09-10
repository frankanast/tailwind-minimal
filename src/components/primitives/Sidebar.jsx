import NavigationItem from './NavigationItem';
import CustomerLogoImg from '../CustomerLogoImg.jsx';
import userData from "../mockups/userData.js";
import ProfileSettingsDropdown from "./ProfileSettingsDropdown.jsx";

export default function Sidebar({ navigation, superpowers, currentPage, setCurrentPage, closeSidebar }) {
    const handleClick = (name) => {
        setCurrentPage(name);
        if (closeSidebar) closeSidebar(); // Close sidebar for mobile
    };

    return (
        <div className="flex flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
                <CustomerLogoImg />
            </div>

            <nav className="flex flex-1 flex-col">
                <ul className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                                <NavigationItem
                                    key={item.name}
                                    name={item.name}
                                    icon={item.icon}
                                    active={item.name === currentPage}
                                    onClick={() => handleClick(item.name)}
                                />
                            ))}
                        </ul>
                    </li>
                    <li>
                        <div className="text-xs font-semibold leading-6 text-gray-400">Superpowers</div>
                        <ul className="-mx-2 mt-2 space-y-1">
                            {superpowers.map((team) => (
                                <NavigationItem
                                    key={team.name}
                                    name={team.name}
                                    initial={team.initial}
                                    active={team.name === currentPage}
                                    onClick={() => handleClick(team.name)}
                                />
                            ))}
                        </ul>
                    </li>
                    <li className="mt-auto">
                        <ProfileSettingsDropdown variant="desktop" data={userData} />
                    </li>
                </ul>
            </nav>
        </div>
    );
}
