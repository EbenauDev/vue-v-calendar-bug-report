import { defineStore } from "pinia";

let randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
let generateFakeData = () => {
  let status = ["Aula", "Livre", "Interditado", "Bloqueado"];
  let baseEvents = [
    {
      status: "",
      inicio: "",
      fim: "",
      localId: 55,
      descricaoLocal: "Quadra 1 - Beach Futevôlei",
      configuracaoId: 1132,
      realizadaId: 0,
      tipoEspaco: "Simples",
      compartilhamentoId: 0,
    },
    {
      status: "",
      inicio: "",
      fim: "",
      localId: 55,
      descricaoLocal: "Quadra 2 - Beach Futevôlei",
      configuracaoId: 1132,
      realizadaId: 0,
      tipoEspaco: "Simples",
      compartilhamentoId: 0,
    },
    {
      status: "",
      inicio: "",
      fim: "",
      localId: 55,
      descricaoLocal: "Quadra 3 - Beach Futevôlei",
      configuracaoId: 1132,
      realizadaId: 0,
      tipoEspaco: "Simples",
      compartilhamentoId: 0,
    },
    {
      status: "",
      inicio: "",
      fim: "",
      localId: 55,
      descricaoLocal: "Quadra 4 - Beach Futevôlei",
      configuracaoId: 1132,
      realizadaId: 0,
      tipoEspaco: "Simples",
      compartilhamentoId: 0,
    },
    {
      status: "",
      inicio: "",
      fim: "",
      localId: 55,
      descricaoLocal: "Quadra 5 - Beach Futevôlei",
      configuracaoId: 1132,
      realizadaId: 0,
      tipoEspaco: "Simples",
      compartilhamentoId: 0,
    },
  ];

  let events = [];

  let maxDate = new Date("2025-12-31T00:00:00");
  let current = new Date("2025-06-01T00:00:00");
  while (current < maxDate) {
    let begin = new Date(current);
    let end = new Date(current);
    end.setHours(end.getHours() + 1);
    events.push({
      ...baseEvents[randomInt(0, baseEvents.length - 1)],
      status: status[randomInt(0, status.length - 1)],
      inicio: begin.toISOString(),
      fim: end.toISOString(),
    });
    current = end;
  }

  return events;
};

const actions = {
  loadHorarios() {
    return new Promise((resolve, reject) => {
      resolve(generateFakeData());
    });
  },
};

export const quadroHorariosStore = defineStore("quadro_Horarios_Store", {
  actions,
});
