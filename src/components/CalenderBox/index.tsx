"use client";
import { useState } from "react";
import InputGroup from "../FormElements/InputGroup";
import { Trash } from "../Layouts/sidebar/icons";

interface Event {
  id: number;
  date: number;
  title: string;
}

export default function CalendarBox() {
  const [events, setEvents] = useState<Event[]>([
    { id: 1, date: 1, title: "Redesign Website" },
    { id: 2, date: 25, title: "App Design" },
  ]);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const handleDayClick = (day: number) => {
    setSelectedDate(day);
    setTitle("");
    setEditingEvent(null);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!selectedDate || !title.trim()) return;
    if (editingEvent) {
      setEvents(
        events.map((ev) => (ev.id === editingEvent.id ? { ...ev, title } : ev)),
      );
    } else {
      setEvents([...events, { id: Date.now(), date: selectedDate, title }]);
    }
    setModalOpen(false);
  };

  const handleEdit = (ev: Event) => {
    setEditingEvent(ev);
    setTitle(ev.title);
    setSelectedDate(ev.date);
    setModalOpen(true);
  };

  const handleDelete = (ev: Event) => {
    setEvents(events.filter((e) => e.id !== ev.id));
    setModalOpen(false);
  };

  const renderDay = (day: number) => {
    const dayEvents = events.filter((ev) => ev.date === day);
    return (
      <td
        key={day}
        onClick={() => handleDayClick(day)}
        className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31"
      >
        <span className="font-medium text-dark dark:text-white">{day}</span>
        {dayEvents.map((ev) => (
          <div
            key={ev.id}
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(ev);
            }}
            className="text-md mt-2 flex items-center rounded bg-primary/20 px-2 py-0.5 font-medium text-primary hover:bg-primary/40 dark:text-white"
          >
            {ev.title}
          </div>
        ))}
      </td>
    );
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const rows = [];
  for (let i = 0; i < days.length; i += 7) {
    rows.push(days.slice(i, i + 7));
  }

  return (
    <>
      <div className="w-full max-w-full rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-7 rounded-t-[10px] bg-primary text-white">
              {[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ].map((day, i) => (
                <th
                  key={i}
                  className={`flex h-15 items-center justify-center p-1 text-body-xs font-medium sm:text-base xl:p-5 ${
                    i === 0 ? "rounded-tl-[10px]" : ""
                  } ${i === 6 ? "rounded-tr-[10px]" : ""}`}
                >
                  <span className="hidden lg:block">{day}</span>
                  <span className="block lg:hidden">{day.slice(0, 3)}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((week, idx) => (
              <tr key={idx} className="grid grid-cols-1 sm:grid-cols-7">
                {week.map((day) => renderDay(day))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">
          <div className="w-full max-w-150 rounded-lg bg-white p-5 shadow-xl dark:bg-gray-dark">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-medium text-dark dark:text-white w-4/6">
                {editingEvent
                  ? "Editar evento"
                  : `Adicionar evento - Dia ${selectedDate}`}
              </h2>

              {editingEvent && (
                <button
                  onClick={() => handleDelete(editingEvent)}
                  className="rounded-lg bg-red-600 p-3 text-white hover:bg-red-700 w-auto"
                >
                  <Trash />
                </button>
              )}
            </div>

            <InputGroup
              required
              label="Evento"
              placeholder="Qual evento?"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div className="mt-6 flex flex-wrap justify-start gap-2">
              <button
                onClick={handleSave}
                className="w-full rounded-lg bg-primary px-4 py-2 text-white lg:w-auto"
              >
                Confirmar
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="w-full rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 lg:w-auto"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
