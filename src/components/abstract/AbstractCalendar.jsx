// TODO: Complete abstraction
// import {useEffect, useState} from 'react'
// import {
//     addMonths,
//     eachDayOfInterval,
//     endOfMonth,
//     format,
//     isSameMonth,
//     isToday,
//     isWithinInterval,
//     startOfMonth,
//     subMonths
// } from 'date-fns'
// import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/20/solid'
// import classNames from "../../utils/classNames.js"
//
// export default function AbstractCalendar( { dateClickHandler } ) {
//     const [currentMonth, setCurrentMonth] = useState(new Date())
//     const [selectedRange, setSelectedRange] = useState( [null, null])
//
//     // useEffect(() => {
//     //     setSelectedRange([checkInDate, checkOutDate])
//     // }, [checkInDate, checkOutDate])
//     //
//     // // Show the month where dates are
//     // useEffect(() => {
//     //     if (checkInDate) {
//     //         setCurrentMonth(checkInDate) // Show the month of check-in date
//     //     } else if (checkOutDate) {
//     //         setCurrentMonth(checkOutDate) // Show the month of check-out date if only it is selected
//     //     }
//     // }, [checkInDate, checkOutDate])
//
//     const handlePreviousMonth = () => {
//         setCurrentMonth(subMonths(currentMonth, 1))
//     }
//
//     const handleNextMonth = () => {
//         setCurrentMonth(addMonths(currentMonth, 1))
//     }
//
//     // const handleDateClick = (date) => {
//     //     if (!checkInDate || (checkInDate && checkOutDate)) {
//     //         setCheckInDate(date)
//     //         setCheckOutDate(null)
//     //         setSelectedRange([date, null])
//     //
//     //     } else {
//     //         if (date < checkInDate) {
//     //             // If the new date is earlier than the current check-in date, invert them
//     //             setCheckOutDate(checkInDate)
//     //             setCheckInDate(date)
//     //             setSelectedRange([date, checkInDate])
//     //         } else {
//     //             setCheckOutDate(date)
//     //             setSelectedRange([checkInDate, date])
//     //         }
//     //     }
//     // }
//
//     const getDaysInMonth = (month) => {
//         const daysInMonth = eachDayOfInterval({
//             start: startOfMonth(month),
//             end: endOfMonth(month),
//         })
//
//         const firstDayOfWeek = format(startOfMonth(month), 'i') - 1
//         const prevMonth = subMonths(month, 1)
//         const nextMonth = addMonths(month, 1)
//
//         const daysBefore = Array.from({ length: firstDayOfWeek }).map((_, idx) => new Date(prevMonth.getFullYear(), prevMonth.getMonth(), endOfMonth(prevMonth).getDate() - firstDayOfWeek + idx + 1))
//         const daysAfterCount = 42 - (daysBefore.length + daysInMonth.length)
//         const daysAfter = Array.from({ length: daysAfterCount }).map((_, idx) => new Date(nextMonth.getFullYear(), nextMonth.getMonth(), idx + 1))
//
//         return [...daysBefore, ...daysInMonth, ...daysAfter]
//     }
//
//     const renderCalendarDays = (month) => {
//         const days = getDaysInMonth(month)
//
//         return days.map((day, dayIdx) => {
//             const isCurrentMonth = isSameMonth(day, month)
//             const isStartDay = selectedRange[0] && day && isSameMonth(day, month) && day.getTime() === selectedRange[0].getTime()
//             const isEndDay = selectedRange[1] && day && isSameMonth(day, month) && day.getTime() === selectedRange[1].getTime()
//             const isSelected = selectedRange[0] && selectedRange[1] && day && isWithinInterval(day, { start: selectedRange[0], end: selectedRange[1] })
//
//             return (
//                 <button
//                     key={dayIdx}
//                     type="button"
//                     onClick={dateClickHandler}
//                     className={classNames(
//                         isCurrentMonth ? 'bg-white text-gray-900' : 'bg-gray-50 text-gray-400',
//                         isSelected && 'bg-yellow-200 text-gray-900',
//                         isStartDay && 'bg-yellow-500 hover:bg-yellow-400 text-white font-semibold',
//                         isEndDay && 'bg-yellow-500 hover:bg-yellow-400 text-white font-semibold',
//
//                         // Rounded corners for dates at the beginning/end of top/bottom row
//                         dayIdx === 0 && 'rounded-tl-lg',  // Top-left corner
//                         dayIdx === 6 && 'rounded-tr-lg',  // Top-right corner of first row
//                         dayIdx === 35 && 'rounded-bl-lg', // Bottom-left corner of last row
//                         dayIdx === 41 && 'rounded-br-lg', // Bottom-right corner of last row
//                         'relative py-1.5 hover:bg-gray-100 focus:z-10',
//                     )}
//                 >
//                     <time
//                         dateTime={format(day, 'yyyy-MM-dd')}
//                         className={classNames(
//                             isToday(day) && 'bg-indigo-500 font-semibold text-white',
//                             'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
//                         )}
//                     >
//                         {format(day, 'd')}
//                     </time>
//                 </button>
//             )
//         })
//     }
//
//     return (
//         <div className="relative grid grid-cols-1 gap-x-14 md:grid-cols-2">
//             <button
//                 type="button"
//                 onClick={handlePreviousMonth}
//                 className="absolute -left-1.5 -top-1 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
//             >
//                 <span className="sr-only">Previous month</span>
//                 <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
//             </button>
//             <button
//                 type="button"
//                 onClick={handleNextMonth}
//                 className="absolute -right-1.5 -top-1 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
//             >
//                 <span className="sr-only">Next month</span>
//                 <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
//             </button>
//             {[currentMonth, addMonths(currentMonth, 1)].map((month, idx) => (
//                 <section key={idx} className={classNames(idx === 1 && 'hidden md:block', 'text-center')}>
//                     <h2 className="text-sm font-semibold text-gray-900">{format(month, 'MMMM yyyy')}</h2>
//                     <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
//                         <div>M</div>
//                         <div>T</div>
//                         <div>W</div>
//                         <div>T</div>
//                         <div>F</div>
//                         <div>S</div>
//                         <div>S</div>
//                     </div>
//                     <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
//                         {renderCalendarDays(month)}
//                     </div>
//                 </section>
//             ))}
//         </div>
//     )
// }
