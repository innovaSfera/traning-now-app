interface Gym {
  id: number;
  name: string;
  distance: string;
  openNow: boolean;
  type: string;
  image: string;
}

interface Props {
  gyms: Gym[];
}

export default function GymList({ gyms }: Props) {
  return (
    <div className="flex flex-col divide-y divide-stroke dark:divide-dark-3">
      {gyms.map((gym) => (
        <div
          key={gym.id}
          className="flex cursor-pointer gap-3 p-4 hover:bg-gray-100 dark:hover:bg-dark-3"
        >
          <img
            src={gym.image}
            alt={gym.name}
            className="h-16 w-16 rounded-md object-cover"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold text-dark dark:text-white">
              {gym.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {gym.distance} • {gym.openNow ? "Aberto agora" : "Fechado"}
            </p>
            <span className="mt-1 inline-block rounded-md bg-gray-200 px-2 py-1 text-xs text-dark dark:bg-dark-3 dark:text-white">
              {gym.type}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
