
const temaer = [
  "Nettverksprotokoll",
  "HTTP/HTTPS",
  "FTP",
  "SMTP",
  "DNS",
  "DHCP",
  "SSH",
  "TCP/IP",
  "POP3/IMAP",
  "UDP",
  "ARP",
  "Telnet",
  "SNMP",
  "ICMP",
  "NTP",
  "RIP/OSPF",
  "Feilsøkingskommandoer",
  "Hvordan en datamaskin og telefon er bygd opp",
  "Bits og byte",
  "Hjemmenettverk",
  "Internettets historie",
  "Servere",
  "Skytjenester",
  "Virtualisering",
  "OSI/TCP-IP-modellen",
  "Datadomener",
  "Feilsøking",
  "Digitale trusler",
  "Personvern",
  "HMS i IT",
  "Backup for små bedrifter",
  "VLAN",
  "Bærekraft og IT",
  "Frontend og backend",
  "Kunstig intelligens (KI)",
  "Algoritmer",
  "Teknologi og demokrati",
  "Maskinlæring",
  "Åpen kildekode vs proprietær",
  "Kryptering",
  "Digitale tvillinger",
  "Tilgjengelighet og inkludering",
  "Edge computing",
  "Internet of Things",
  "APIer",
];

let bruktTemaer = [];

const elever = [
  "Tobias",
  "Oskar",
  "Lukas",
  "Andreas",
  "Erik",
  "Lars",
  "Max",
  "Patrik",
  "Alex",
  "William",
  "Damian",
  "Gabriel",
  "Armandas",
  "Sofiia",
  "Sarawut",
];

let currentStudentIndex = 0;
const assignments = {};

function trekkTemaer() {
  const resultatEl = document.getElementById("resultat");
  const meldingEl = document.getElementById("sluttmelding");

  const tilgjengeligeTemaer = temaer.filter((t) => !bruktTemaer.includes(t));

  if (tilgjengeligeTemaer.length < 3) {
    meldingEl.style.display = "block";
    return;
  }

  const valgt = [];
  for (let i = 0; i < 3; i++) {
    const index = Math.floor(Math.random() * tilgjengeligeTemaer.length);
    const tema = tilgjengeligeTemaer[index];
    valgt.push(tema);
    bruktTemaer.push(tema);
    tilgjengeligeTemaer.splice(index, 1);
  }

  resultatEl.innerHTML = valgt.map((t) => `<li>${t}</li>`).join("");
  visTilgjengeligeTemaer();
}

function assignNextStudent() {
  const meldingEl = document.getElementById("sluttmelding");
  const currentStudentEl = document.getElementById("currentStudent");
  const currentTopicsEl = document.getElementById("currentTopics");
  const assignmentsEl = document.getElementById("studentAssignments");
  const assignButton = document.getElementById("assignButton");

  if (currentStudentIndex >= elever.length) {
    alert(
      "Alle elever er tatt. Trykk F5 eller Enter for å starte tildeling helt på nytt."
    );
    currentStudentEl.innerHTML = "";
    currentTopicsEl.innerHTML = "";
    assignButton.disabled = true;
    return;
  }

  const tilgjengeligeTemaer = temaer.filter((t) => !bruktTemaer.includes(t));

  if (tilgjengeligeTemaer.length < 3) {
    alert(
      "Ikke nok temaer til å tildele 3 til hver elev. Trykk F5 for å starte på nytt."
    );
    assignButton.disabled = true;
    return;
  }

  const valgt = [];
  for (let i = 0; i < 3; i++) {
    const index = Math.floor(Math.random() * tilgjengeligeTemaer.length);
    const tema = tilgjengeligeTemaer[index];
    valgt.push(tema);
    bruktTemaer.push(tema);
    tilgjengeligeTemaer.splice(index, 1);
  }

  const elev = elever[currentStudentIndex];
  assignments[elev] = valgt;

  // Display current student and topics
  currentStudentEl.innerHTML = `<h3>Elev: ${elev}</h3>`;
  currentTopicsEl.innerHTML = `<ul>${valgt
    .map((t) => `<li>${t}</li>`)
    .join("")}</ul>`;

  // Append to accumulated assignments list
  const elevDiv = document.createElement("div");
  elevDiv.classList.add("elev-assignments");
  elevDiv.innerHTML = `<h4>${elev}</h4><ul>${valgt
    .map((t) => `<li>${t}</li>`)
    .join("")}</ul>`;
  assignmentsEl.appendChild(elevDiv);

  currentStudentIndex++;
  visTilgjengeligeTemaer();
}

window.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const assignButton = document.getElementById("assignButton");
    if (!assignButton.disabled) {
      assignNextStudent();
    } else {
      location.reload();
    }
  }
  if (event.key === "F5") {
    location.reload();
  }
});

function visTilgjengeligeTemaer() {
  const liste = document.getElementById("temaListe");
  liste.innerHTML = "";
  const midtpunkt = Math.ceil(temaer.length / 2);
  const kolonne1 = temaer.slice(0, midtpunkt);
  const kolonne2 = temaer.slice(midtpunkt);

  const kolonneHTML = (liste) =>
    "<div>" +
    liste
      .map(
        (t) =>
          `<div class="${
            bruktTemaer.includes(t) ? "strikethrough" : ""
          }">${t}</div>`
      )
      .join("") +
    "</div>";
  liste.innerHTML = kolonneHTML(kolonne1) + kolonneHTML(kolonne2);
}

window.onload = visTilgjengeligeTemaer;
