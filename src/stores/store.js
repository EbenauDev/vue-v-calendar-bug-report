import { defineStore } from "pinia";
import { fakeData } from "./data";


const actions = {
  loadHorarios() {
    return new Promise((resolve, reject) => {
      resolve(fakeData);
    });
  },
};

export const quadroHorariosStore = defineStore("quadro_Horarios_Store", {
  actions,
});
