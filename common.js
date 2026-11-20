
const KEY = 'rituali_benessere_public_demo_v1';

const defaults = [
  { id: 'e1', date: '2027-01-15' },
  { id: 'e2', date: '2027-02-12' },
  { id: 'e3', date: '2027-03-19' },
  { id: 'e4', date: '2027-04-16' }
];

const standard = [
  ['10:30', 'Scrub viso e corpo Frutti Rossi', 'Bagno turco', 12],
  ['11:30', 'Maschera viso', 'Sauna infrarossi', 6],
  ['12:30', 'Aufguss balsamico', 'Sauna', 18],
  ['13:15', 'Maschera viso', 'Sauna infrarossi', 6],
  ['14:00', 'Maschera viso', 'Area esterna', 15],
  ['15:45', 'Aufguss balsamico', 'Sauna', 18],
  ['16:30', 'Maschera viso', 'Area esterna', 15],
  ['17:15', 'Savonage con sapone nero marocchino', 'Bagno turco', 12],
  ['18:00', 'Maschera viso', 'Sauna infrarossi', 6],
  ['19:15', 'Aufguss balsamico', 'Sauna', 18]
];

function getPublic() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {
      events: defaults,
      standard
    };
  } catch {
    return { events: defaults, standard };
  }
}

function savePublic(v) {
  localStorage.setItem(KEY, JSON.stringify(v));
}

function d(s) {
  const [y, m, dd] = s.split('-').map(Number);
  return new Date(y, m - 1, dd);
}

function iso(x) {
  return [
    x.getFullYear(),
    String(x.getMonth() + 1).padStart(2, '0'),
    String(x.getDate()).padStart(2, '0')
  ].join('-');
}

function addDays(s, n) {
  const x = d(s);
  x.setDate(x.getDate() + n);
  return iso(x);
}

function fmt(s, weekday = false) {
  return d(s).toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...(weekday ? { weekday: 'long' } : {})
  });
}

function today() {
  return iso(new Date());
}

function getNextEvents(data) {
  return [...data.events]
    .filter(e => e.date >= today())
    .sort((a, b) => a.date.localeCompare(b.date));
}

function getProgram(data, event) {
  return event?.program || data.standard;
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

