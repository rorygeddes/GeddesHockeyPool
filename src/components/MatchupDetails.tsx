import Image from 'next/image';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useState } from 'react';
import type { Team } from '@/lib/teams';

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
  const [selectedTeam, setSelectedTeam] = useState<'home' | 'away'>('home');

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
                    <button
                      onClick={() => setSelectedTeam('home')}
                      className={`flex-1 p-4 rounded-l-lg ${
                        selectedTeam === 'home'
                          ? 'bg-gray-100 border-b-2 border-blue-500'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <div className="relative w-8 h-8">
                          <Image
                            src={homeTeam.logo}
                            alt={homeTeam.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="font-semibold">{homeTeam.name}</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setSelectedTeam('away')}
                      className={`flex-1 p-4 rounded-r-lg ${
                        selectedTeam === 'away'
                          ? 'bg-gray-100 border-b-2 border-blue-500'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <div className="relative w-8 h-8">
                          <Image
                            src={awayTeam.logo}
                            alt={awayTeam.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="font-semibold">{awayTeam.name}</span>
                      </div>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {selectedTeam === 'home' ? (
                      homeTeamPicks.length > 0 ? (
                        homeTeamPicks.map((pick, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <div className="flex items-center gap-2">
                              <div className="relative w-6 h-6">
                                <Image
                                  src={pick.selectedTeam.logo}
                                  alt={pick.selectedTeam.name}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                              <span>{pick.userName}</span>
                            </div>
                            <span className="text-gray-600">in {pick.games}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-gray-500">No picks for {homeTeam.name}</p>
                      )
                    ) : awayTeamPicks.length > 0 ? (
                      awayTeamPicks.map((pick, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <div className="flex items-center gap-2">
                            <div className="relative w-6 h-6">
                              <Image
                                src={pick.selectedTeam.logo}
                                alt={pick.selectedTeam.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <span>{pick.userName}</span>
                          </div>
                          <span className="text-gray-600">in {pick.games}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500">No picks for {awayTeam.name}</p>
                    )}
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