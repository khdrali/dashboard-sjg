import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core/index.js";

import { useState } from "react";

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
  calendar?: "primary" | "success" | "danger" | "warning";
}

export default function CalendarComponent() {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState<CalendarEvent["calendar"]>("primary");
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setSelectedDate(selectInfo.startStr);
    setShowModal(true);
  };

  const handleEventAdd = () => {
    if (!title.trim()) return;

    const newEvent: CalendarEvent = {
      id: String(Date.now()),
      title,
      start: selectedDate,
      end: selectedDate,
      allDay: true,
      calendar: type,
    };

    setCalendarEvents((prev) => [...prev, newEvent]);
    setTitle("");
    setType("primary");
    setShowModal(false);
  };

  const renderEventContent = (eventInfo: EventContentArg) => {
    const colorMap: Record<string, string> = {
      danger: "bg-red-500",
      success: "bg-green-500",
      primary: "bg-indigo-600",
      warning: "bg-yellow-400 text-black",
    };

    const calendarColor =
      eventInfo.event.extendedProps.calendar?.toLowerCase() || "primary";
    const colorClass = colorMap[calendarColor] || "bg-gray-400";

    return (
      <div
        className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm text-white font-medium shadow ${colorClass}`}
      >
        <span className="w-2 h-2 rounded-full bg-white/80"></span>
        <span>{eventInfo.event.title}</span>
      </div>
    );
  };

  return (
    <div className="relative rounded-xl border border-gray-200 bg-white shadow-lg p-6">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        selectable
        selectMirror
        dayMaxEvents
        select={handleDateSelect}
        eventClick={(eventClick: EventClickArg) => {
          alert(`Klik event: ${eventClick.event.title}`);
        }}
        events={calendarEvents}
        eventContent={renderEventContent}
        height="auto"
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Tambah Event
            </h2>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">
                Tanggal
              </label>
              <input
                type="text"
                value={selectedDate}
                readOnly
                className="w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-gray-700 text-sm focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Judul</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masukkan judul event"
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Tipe</label>
              <select
                value={type}
                onChange={(e) =>
                  setType(e.target.value as CalendarEvent["calendar"])
                }
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="primary">Primary</option>
                <option value="success">Success</option>
                <option value="danger">Danger</option>
                <option value="warning">Warning</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                Batal
              </button>
              <button
                onClick={handleEventAdd}
                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
