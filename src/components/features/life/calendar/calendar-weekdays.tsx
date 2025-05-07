// components/calendar/CalendarWeekdays.tsx
const CalendarWeekdays = () => (
  <div className="inline-flex items-center justify-center self-stretch">
    {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
      <div key={day} className="inline-flex flex-1 flex-col items-center justify-center gap-2.5 px-5 py-2">
        <div className="text-center text-base font-normal text-secondary-grey-600">{day}</div>
      </div>
    ))}
  </div>
);

export default CalendarWeekdays;
