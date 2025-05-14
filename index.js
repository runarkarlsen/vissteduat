// index.js

// index.js
const temaer = [
  "Nettverksprotokoll", "HTTP/HTTPS", "FTP", "SMTP", "DNS", "DHCP", "SSH", "TCP/IP", "POP3/IMAP",
  "UDP", "ARP", "Telnet", "SNMP", "ICMP", "NTP", "RIP/OSPF", "Feilsøkingskommandoer", 
  "Hvordan en datamaskin og telefon er bygd opp", "Bits og byte", "Hjemmenettverk", 
  "Internettets historie", "Servere", "Skytjenester", "Virtualisering", "OSI/TCP-IP-modellen", 
  "Datadomener", "Feilsøking", "Digitale trusler", "Personvern", "HMS i IT", 
  "Backup for små bedrifter", "VLAN", "Bærekraft og IT",
  "Frontend og backend", "Kunstig intelligens (AI)", "Algoritmer", "Teknologi og demokrati",
  "Maskinlæring", "Åpen kildekode vs proprietær", "Kryptering", "Digitale tvillinger", "Tilgjengelighet og inkludering"
];

let tilgjengeligeTemaer = [...temaer];

function trekkTemaer() {
  const resultatEl = document.getElementById("resultat");
  const meldingEl = document.getElementById("sluttmelding");

  if (tilgjengeligeTemaer.length < 3) {
    meldingEl.style.display = "block";
    return;
  }

  const valgt = [];
  for (let i = 0; i < 3; i++) {
    const index = Math.floor(Math.random() * tilgjengeligeTemaer.length);
    valgt.push(tilgjengeligeTemaer.splice(index, 1)[0]);
  }

  resultatEl.innerHTML = valgt.map(t => `<li>${t}</li>`).join('');
  visTilgjengeligeTemaer();
}

function visTilgjengeligeTemaer() {
  const liste = document.getElementById("temaListe");
  liste.innerHTML = '';
  const midtpunkt = Math.ceil(tilgjengeligeTemaer.length / 2);
  const kolonne1 = tilgjengeligeTemaer.slice(0, midtpunkt);
  const kolonne2 = tilgjengeligeTemaer.slice(midtpunkt);

  const kolonneHTML = (liste) => '<div>' + liste.map(t => `<div>${t}</div>`).join('') + '</div>';
  liste.innerHTML = kolonneHTML(kolonne1) + kolonneHTML(kolonne2);
}

window.onload = visTilgjengeligeTemaer;
