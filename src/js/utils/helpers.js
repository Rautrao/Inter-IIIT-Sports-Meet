/**
 * helpers.js - Utility functions and mock data.
 * Mock data mirrors expected API response shape for seamless backend wiring.
 */

export const mockData = {
  sports: [
    { id: 1, name: 'Cricket', icon: '🏏', category: 'Team', teams: 18, status: 'upcoming' },
    { id: 2, name: 'Football', icon: '⚽', category: 'Team', teams: 16, status: 'upcoming' },
    { id: 3, name: 'Basketball', icon: '🏀', category: 'Team', teams: 14, status: 'upcoming' },
    { id: 4, name: 'Volleyball', icon: '🏐', category: 'Team', teams: 14, status: 'upcoming' },
    { id: 5, name: 'Table Tennis', icon: '🏓', category: 'Individual', teams: 20, status: 'upcoming' },
    { id: 6, name: 'Badminton', icon: '🏸', category: 'Individual', teams: 20, status: 'upcoming' },
    { id: 7, name: 'Chess', icon: '♟️', category: 'Individual', teams: 22, status: 'upcoming' },
    { id: 8, name: 'Athletics', icon: '🏃', category: 'Individual', teams: 22, status: 'upcoming' },
  ],
  institutes: [
    { id: 1, name: 'IIITDM Jabalpur', abbr: 'IIITDM-J', city: 'Jabalpur', isHost: true },
    { id: 2, name: 'IIIT Hyderabad', abbr: 'IIIT-H', city: 'Hyderabad', isHost: false },
    { id: 3, name: 'IIIT Allahabad', abbr: 'IIITA', city: 'Allahabad', isHost: false },
    { id: 4, name: 'IIIT Bangalore', abbr: 'IIITB', city: 'Bangalore', isHost: false },
    { id: 5, name: 'IIIT Delhi', abbr: 'IIITD', city: 'Delhi', isHost: false },
    { id: 6, name: 'IIIT Gwalior', abbr: 'IIITG', city: 'Gwalior', isHost: false },
    { id: 7, name: 'IIIT Kota', abbr: 'IIITK', city: 'Kota', isHost: false },
    { id: 8, name: 'IIIT Pune', abbr: 'IIITP', city: 'Pune', isHost: false },
  ],
  schedule: [
    {
      day: 1, date: '2025-10-01',
      events: [
        { time: '09:00', sport: 'Cricket', teams: 'IIITDM-J vs IIIT-H', venue: 'Main Ground', status: 'upcoming' },
        { time: '10:00', sport: 'Badminton', teams: 'IIITA vs IIITB', venue: 'Sports Hall A', status: 'upcoming' },
        { time: '14:00', sport: 'Football', teams: 'IIITD vs IIITG', venue: 'Football Ground', status: 'upcoming' },
        { time: '16:00', sport: 'Table Tennis', teams: 'IIITK vs IIITP', venue: 'TT Hall', status: 'upcoming' },
      ]
    },
    {
      day: 2, date: '2025-10-02',
      events: [
        { time: '09:00', sport: 'Basketball', teams: 'IIITDM-J vs IIITA', venue: 'Basketball Court', status: 'upcoming' },
        { time: '11:00', sport: 'Volleyball', teams: 'IIIT-H vs IIITB', venue: 'Volleyball Court', status: 'upcoming' },
        { time: '15:00', sport: 'Chess', teams: 'All Teams', venue: 'Chess Hall', status: 'upcoming' },
        { time: '17:00', sport: 'Athletics', teams: 'All Teams', venue: 'Athletic Track', status: 'upcoming' },
      ]
    },
  ],
  medalTally: [
    { rank: 1, institute: 'IIIT Hyderabad', abbr: 'IIIT-H', gold: 5, silver: 3, bronze: 2, total: 10 },
    { rank: 2, institute: 'IIITDM Jabalpur', abbr: 'IIITDM-J', gold: 4, silver: 4, bronze: 3, total: 11 },
    { rank: 3, institute: 'IIIT Allahabad', abbr: 'IIITA', gold: 3, silver: 2, bronze: 4, total: 9 },
    { rank: 4, institute: 'IIIT Bangalore', abbr: 'IIITB', gold: 2, silver: 3, bronze: 2, total: 7 },
    { rank: 5, institute: 'IIIT Delhi', abbr: 'IIITD', gold: 1, silver: 3, bronze: 3, total: 7 },
  ],
};

export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
};

export const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
};
