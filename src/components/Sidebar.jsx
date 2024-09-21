import 'react'
import CustomerLogoImg from "./abstract/CustomerLogoImg.jsx";
import NavigationItem from "./NavigationItem.jsx";
import ProfileSettingsDropdown from "./ProfileSettingsDropdown.jsx";
import userData from "../assets/mockups/userData.js";

const sidebarStyle = {
    open: "flex grow flex-col gap-y-5 h-full overflow-y-auto bg-white px-6 pb-4 border-r border-gray-200",
    closed: "flex grow flex-col gap-y-5 h-full overflow-y-auto bg-white px-0 pb-4 border-r border-gray-200",
}

export default function Sidebar({ navigation, superpowers, currentPage, setCurrentPage, closeSidebar, isOpen }) {
    const handleClick = (name) => {
        setCurrentPage(name);
        if (closeSidebar) closeSidebar(); // Close sidebar for mobile
    };

    return (
        <div className={isOpen ? sidebarStyle.open : sidebarStyle.closed}>
            <div className="flex h-16 shrink-0 items-center">
                <CustomerLogoImg/>
            </div>
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
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
                        <div className="text-xs font-semibold leading-6 text-gray-400">
                            Superpowers
                        </div>
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
                </ul>
                <li className="mt-auto">
                    <ProfileSettingsDropdown variant="desktop" data={userData}/>
                </li>
            </nav>
        </div>
    )
}