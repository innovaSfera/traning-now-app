"use client";
import { useState, useRef, useEffect } from "react";
import InputGroup from "../FormElements/InputGroup";
import { Trash } from "../Layouts/sidebar/icons";
import { ClassRoomService } from "@/services/classroom";
import type { ClassRoom, ExerciseTraining } from "@/types/classroom";

interface Event {
  id: string;
  date: number; // Dia da semana (1-7)
  title: string;
  type: 'classroom' | 'custom';
  classRoomId?: string;
  duracao?: number;
  satisfacao?: string;
  alunoNome?: string;
  personalNome?: string;
  treinoNome?: string;
}

export default function CalendarBox() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [classRoomData, setClassRoomData] = useState<ClassRoom | null>(null); // Dados completos da aula
  const [loadingDetails, setLoadingDetails] = useState(false); // Loading ao buscar detalhes

  // 👉 Referência do container do modal
  const modalRef = useRef<HTMLDivElement>(null);

  // 👉 Carregar aulas (ClassRooms) do aluno logado
  useEffect(() => {
    const loadClassRooms = async () => {
      try {
        setLoading(true);
        
        // Buscar aulas do aluno logado usando o token de autenticação
        // A API pega o ID do aluno automaticamente do token JWT
        const classRooms = await ClassRoomService.getClassRoomsByStudentToken();
        
        // Converter ClassRooms para eventos do calendário
        const classRoomEvents: Event[] = classRooms
          .map((classRoom) => ({
            id: classRoom.id || String(Date.now()),
            date: classRoom.diaSemana || 0,
            title: classRoom.nome || 'Aula sem nome',
            type: 'classroom' as const,
            classRoomId: classRoom.id,
            duracao: classRoom.treino?.duracao,
            satisfacao: classRoom.treino?.satisfacao,
            alunoNome: classRoom.aluno?.nome,
            personalNome: classRoom.personal?.nome,
            treinoNome: classRoom.treino?.nome,
          }))
          .filter(event => event.date >= 1 && event.date <= 7); // Apenas dias válidos (1=Domingo a 7=Sábado)
        
        setEvents(classRoomEvents);
      } catch (error) {
        console.error('Erro ao carregar aulas:', error);
      } finally {
        setLoading(false);
      }
    };

    loadClassRooms();
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

  const handleEdit = async (ev: Event) => {
    // Limpar dados anteriores
    setClassRoomData(null);
    
    if (ev.type === 'custom') {
      // Apenas permite editar eventos customizados
      setEditingEvent(ev);
      setTitle(ev.title);
      setSelectedDate(ev.date);
      setModalOpen(true);
    } else if (ev.type === 'classroom' && ev.classRoomId) {
      // Para aulas, buscar dados completos com exercícios
      setEditingEvent(ev);
      setTitle(ev.title);
      setSelectedDate(ev.date);
      setModalOpen(true);
      
      try {
        setLoadingDetails(true);
        const fullClassRoomData = await ClassRoomService.getClassRoomById(ev.classRoomId);
        setClassRoomData(fullClassRoomData);
      } catch (error) {
        console.error('Erro ao carregar detalhes da aula:', error);
      } finally {
        setLoadingDetails(false);
      }
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
                ev.type === 'classroom' 
                  ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400 hover:bg-blue-500/30' 
                  : 'bg-primary/20 text-primary hover:bg-primary/40 dark:text-white'
              }`}
              title={ev.type === 'classroom' ? `Aula: ${ev.title}${ev.treinoNome ? `\nTreino: ${ev.treinoNome}` : ''}${ev.personalNome ? `\nPersonal: ${ev.personalNome}` : ''}${ev.duracao ? `\nDuração: ${ev.duracao} min` : ''}${ev.satisfacao ? `\nDificuldade: ${ev.satisfacao}` : ''}` : ev.title}
            >
              {ev.type === 'classroom' ? '💪 ' : '📝 '}
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
            <span className="ml-3 text-dark dark:text-white">Carregando suas aulas...</span>
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
            className="w-full max-w-[800px] rounded-lg bg-white p-5 shadow-xl dark:bg-gray-dark"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="w-4/6 text-2xl font-medium text-dark dark:text-white">
                {editingEvent?.type === 'classroom'
                  ? "Informações da Aula"
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

            {editingEvent?.type === 'classroom' ? (
              <div className="space-y-3 max-h-[70vh] overflow-y-auto custom-scrollbar">
                {loadingDetails ? (
                  <div className="flex items-center justify-center p-8">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    <span className="ml-3 text-dark dark:text-white">Carregando detalhes...</span>
                  </div>
                ) : (
                  <>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Nome da Aula</p>
                      <p className="text-lg font-semibold text-dark dark:text-white">{editingEvent.title}</p>
                    </div>
                    {editingEvent.treinoNome && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Treino</p>
                        <p className="text-lg font-semibold text-dark dark:text-white">{editingEvent.treinoNome}</p>
                      </div>
                    )}
                    {editingEvent.personalNome && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Personal Trainer</p>
                        <p className="text-lg font-semibold text-dark dark:text-white">{editingEvent.personalNome}</p>
                      </div>
                    )}
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

                    {/* Exercícios do Treino */}
                    {classRoomData?.treino?.exerciseTrainings && classRoomData.treino.exerciseTrainings.length > 0 && (
                      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                        <h3 className="text-lg font-semibold text-dark dark:text-white mb-3">
                          💪 Exercícios do Treino ({classRoomData.treino.exerciseTrainings.length})
                        </h3>
                        
                        <div className="space-y-3">
                          {classRoomData.treino.exerciseTrainings
                            .sort((a, b) => (a.ordem || 0) - (b.ordem || 0))
                            .map((exerciseTraining, index) => (
                              <div 
                                key={exerciseTraining.id || index}
                                className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                                    {exerciseTraining.ordem || index + 1}
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-dark dark:text-white">
                                      {exerciseTraining.exercise?.nome || 'Exercício sem nome'}
                                    </h4>
                                    
                                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                                      {exerciseTraining.carga && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Carga:</span>
                                          <span className="ml-1 font-medium text-dark dark:text-white">
                                            {exerciseTraining.carga}
                                          </span>
                                        </div>
                                      )}
                                      {exerciseTraining.repeticao && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Repetições:</span>
                                          <span className="ml-1 font-medium text-dark dark:text-white">
                                            {exerciseTraining.repeticao}
                                          </span>
                                        </div>
                                      )}
                                      {exerciseTraining.intervalo && (
                                        <div>
                                          <span className="text-gray-600 dark:text-gray-400">Intervalo:</span>
                                          <span className="ml-1 font-medium text-dark dark:text-white">
                                            {exerciseTraining.intervalo}
                                          </span>
                                        </div>
                                      )}
                                    </div>

                                    {exerciseTraining.observacao && (
                                      <div className="mt-2 rounded bg-yellow-50 p-2 dark:bg-yellow-900/20">
                                        <p className="text-xs text-yellow-800 dark:text-yellow-200">
                                          📝 <strong>Obs:</strong> {exerciseTraining.observacao}
                                        </p>
                                      </div>
                                    )}

                                    {exerciseTraining.exercise?.linkAula && (
                                      <div className="mt-2">
                                        <a
                                          href={exerciseTraining.exercise.linkAula}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                        >
                                          🎥 Ver vídeo do exercício
                                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                          </svg>
                                        </a>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-4 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        ℹ️ Esta é uma aula definida pelo seu personal. Para alterações, entre em contato com ele.
                      </p>
                    </div>
                  </>
                )}
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
              {editingEvent?.type !== 'classroom' && (
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
