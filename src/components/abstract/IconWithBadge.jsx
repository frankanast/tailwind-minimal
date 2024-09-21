export default function IconWithBadge({ icon, total, animated=false }) {
    const Icon = icon
    const badgeStyle = `${animated && "animate-ping"} absolute inline-flex h-full w-full rounded-full bg-chestnut-700 opacity-75`

    return (
        <div className="ml-4 mt-2 relative h-6 w-6">
            {/* Icon */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
                <Icon className="w-6 h-6 text-gray-400 hover:text-gray-500"/>
            </div>
            {/* Badge */}
            <div className="absolute top-0 right-0 z-20 flex items-center justify-center">
                <span className="flex h-3 w-3">
                    <span className={badgeStyle}></span>
                    <span
                        className="relative inline-flex rounded-full h-3 w-3 bg-chestnut-700 text-white items-center justify-center"
                        style={{fontSize: "8px"}}
                    >
                        {total}
                    </span>
                </span>
            </div>
        </div>
    );
}