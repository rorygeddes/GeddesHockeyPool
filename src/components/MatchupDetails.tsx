import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface Team {
  id: string;
  name: string;
  abbreviation: string;
  logo: string;
  conference: 'Eastern' | 'Western';
}

interface Pick {
  userName: string;
  selectedTeam: Team;
  games: number;
}

interface MatchupDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  homeTeam: Team;
  awayTeam: Team;
  picks: Pick[];
}

export default function MatchupDetails({
  isOpen,
  onClose,
  homeTeam,
  awayTeam,
  picks,
}: MatchupDetailsProps) {
  const homeTeamPicks = picks.filter(pick => pick.selectedTeam.id === homeTeam.id);
  const awayTeamPicks = picks.filter(pick => pick.selectedTeam.id === awayTeam.id);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-4">
                      <img src={homeTeam.logo} alt={homeTeam.name} className="h-16 w-16" />
                      <span className="text-2xl font-semibold">vs</span>
                      <img src={awayTeam.logo} alt={awayTeam.name} className="h-16 w-16" />
                    </div>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500"
                      onClick={onClose}
                    >
                      <span className="sr-only">Close</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-8">
                    {/* Home Team Picks */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                        <img src={homeTeam.logo} alt={homeTeam.name} className="h-8 w-8" />
                        <span>{homeTeam.name}</span>
                      </h3>
                      <div className="space-y-2">
                        {homeTeamPicks.map((pick, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="font-medium">{pick.userName}</span>
                            <span>in {pick.games}</span>
                          </div>
                        ))}
                        {homeTeamPicks.length === 0 && (
                          <p className="text-gray-500 text-sm">No picks for {homeTeam.name}</p>
                        )}
                      </div>
                    </div>

                    {/* Away Team Picks */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                        <img src={awayTeam.logo} alt={awayTeam.name} className="h-8 w-8" />
                        <span>{awayTeam.name}</span>
                      </h3>
                      <div className="space-y-2">
                        {awayTeamPicks.map((pick, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="font-medium">{pick.userName}</span>
                            <span>in {pick.games}</span>
                          </div>
                        ))}
                        {awayTeamPicks.length === 0 && (
                          <p className="text-gray-500 text-sm">No picks for {awayTeam.name}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 