"use client";
import { useState, useRef, useEffect } from "react";
import InputGroup from "../FormElements/InputGroup";
import { Trash } from "../Layouts/sidebar/icons";
import { getTrainingsByStudentId } from "@/services/training";

interface Event {
  id: string;
  date: number; // Dia da semana (1-7)
  title: string;
  type: 'training' | 'custom';
  trainingId?: string;
  duracao?: number;
  satisfacao?: string;
}

export default function CalendarBox() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  // 👉 Referência do container do modal
  const modalRef = useRef<HTMLDivElement>(null);

  // 👉 Carregar treinos do aluno
  useEffect(() => {
    const loadTrainings = async () => {
      try {
        setLoading(true);
        // Obter studentId do localStorage ou contexto de autenticação
        const studentId = localStorage.getItem('userId');
        
        if (studentId) {
          const trainings = await getTrainingsByStudentId(studentId);
          
          // Converter treinos para eventos do calendário
          const trainingEvents: Event[] = trainings.map((training) => ({
            id: training.id || String(Date.now()),
            date: training.diaSemana || 0,
            title: training.nome,
            type: 'training' as const,
            trainingId: training.id,
            duracao: training.duracao,
            satisfacao: training.satisfacao,
          })).filter(event => event.date >= 1 && event.date <= 7); // Apenas dias válidos
          
          setEvents(trainingEvents);
        }
      } catch (error) {
        console.error('Erro ao carregar treinos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTrainings();
  }, []);

  // 👉 Fecha modal ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setModalOpen(false);
      }
    };

    if (modalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalOpen]);

  const handleDayClick = (day: number) => {
    setSelectedDate(day);
    setTitle("");
    setEditingEvent(null);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!selectedDate || !title.trim()) return;
    if (editingEvent && editingEvent.type === 'custom') {
      setEvents(
        events.map((ev) => (ev.id === editingEvent.id ? { ...ev, title } : ev)),
      );
    } else if (!editingEvent) {
      // Apenas permite adicionar eventos customizados
      setEvents([...events, { 
        id: String(Date.now()), 
        date: selectedDate, 
        title,
        type: 'custom'
      }]);
    }
    setModalOpen(false);
  };

  const handleEdit = (ev: Event) => {
    // Apenas permite editar eventos customizados
    if (ev.type === 'custom') {
      setEditingEvent(ev);
      setTitle(ev.title);
      setSelectedDate(ev.date);
      setModalOpen(true);
    } else {
      // Para treinos, apenas mostra informações
      setEditingEvent(ev);
      setTitle(ev.title);
      setSelectedDate(ev.date);
      setModalOpen(true);
    }
  };

  const handleDelete = (ev: Event) => {
    // Apenas permite deletar eventos customizados
    if (ev.type === 'custom') {
      setEvents(events.filter((e) => e.id !== ev.id));
    }
    setModalOpen(false);
  };

  const renderDay = (dayOfWeek: number, dayLabel: string) => {
    const dayEvents = events.filter((ev) => ev.date === dayOfWeek);
    return (
      <td
        key={dayOfWeek}
        onClick={() => handleDayClick(dayOfWeek)}
        className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 md:p-6 xl:h-31"
      >
        <span className="font-medium text-dark dark:text-white">{dayLabel}</span>
        <div className="mt-2 space-y-1">
          {dayEvents.map((ev) => (
            <div
              key={ev.id}
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(ev);
              }}
              className={`text-xs rounded px-2 py-1 font-medium cursor-pointer ${
                ev.type === 'training' 
                  ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400 hover:bg-blue-500/30' 
                  : 'bg-primary/20 text-primary hover:bg-primary/40 dark:text-white'
              }`}
              title={ev.type === 'training' ? `Treino: ${ev.title}\nDuração: ${ev.duracao || 0} min\nDificuldade: ${ev.satisfacao || 'N/A'}` : ev.title}
            >
              {ev.type === 'training' ? '🏋️ ' : '📝 '}
              {ev.title}
            </div>
          ))}
        </div>
      </td>
    );
  };

  const weekDays = [
    { number: 1, label: 'Domingo' },
    { number: 2, label: 'Segunda' },
    { number: 3, label: 'Terça' },
    { number: 4, label: 'Quarta' },
    { number: 5, label: 'Quinta' },
    { number: 6, label: 'Sexta' },
    { number: 7, label: 'Sábado' },
  ];

  return (
    <>
      <div className="w-full max-w-full rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        {loading ? (
          <div className="flex items-center justify-center p-10">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <span className="ml-3 text-dark dark:text-white">Carregando treinos...</span>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="grid grid-cols-7 rounded-t-[10px] bg-primary text-white">
                {weekDays.map((day, i) => (
                  <th
                    key={day.number}
                    className={`flex h-15 items-center justify-center p-1 text-body-xs font-medium sm:text-base xl:p-5 ${
                      i === 0 ? "rounded-tl-[10px]" : ""
                    } ${i === 6 ? "rounded-tr-[10px]" : ""}`}
                  >
                    <span className="hidden lg:block">{day.label}</span>
                    <span className="block lg:hidden">{day.label.slice(0, 3)}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="grid grid-cols-1 sm:grid-cols-7">
                {weekDays.map((day) => renderDay(day.number, day.label))}
              </tr>
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">
          {/* ✅ Modal com ref */}
          <div
            ref={modalRef}
            className="w-full max-w-150 rounded-lg bg-white p-5 shadow-xl dark:bg-gray-dark"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="w-4/6 text-2xl font-medium text-dark dark:text-white">
                {editingEvent?.type === 'training'
                  ? "Informações do Treino"
                  : editingEvent
                  ? "Editar evento"
                  : `Adicionar evento - ${weekDays.find(d => d.number === selectedDate)?.label || ''}`}
              </h2>

              {editingEvent && editingEvent.type === 'custom' && (
                <button
                  onClick={() => handleDelete(editingEvent)}
                  className="w-auto rounded-lg bg-red-600 p-3 text-white hover:bg-red-700"
                >
                  <Trash />
                </button>
              )}
            </div>

            {editingEvent?.type === 'training' ? (
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Nome do Treino</p>
                  <p className="text-lg font-semibold text-dark dark:text-white">{editingEvent.title}</p>
                </div>
                {editingEvent.duracao && (
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Duração</p>
                    <p className="text-lg font-semibold text-dark dark:text-white">{editingEvent.duracao} minutos</p>
                  </div>
                )}
                {editingEvent.satisfacao && (
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Dificuldade</p>
                    <p className="text-lg font-semibold text-dark dark:text-white">{editingEvent.satisfacao}</p>
                  </div>
                )}
                <div className="mt-4 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    ℹ️ Este é um treino definido pelo seu personal. Para alterações, entre em contato com ele.
                  </p>
                </div>
              </div>
            ) : (
              <InputGroup
                required
                label="Evento"
                placeholder="Qual evento?"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            )}

            <div className="mt-6 flex flex-wrap justify-start gap-2">
              {editingEvent?.type !== 'training' && (
                <button
                  onClick={handleSave}
                  className="w-full rounded-lg bg-primary px-4 py-2 text-white lg:w-auto"
                >
                  Confirmar
                </button>
              )}
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
