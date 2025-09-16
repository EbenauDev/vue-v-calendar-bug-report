<template>
  <div class="app-content">
    <AppPageTitle
      title="Reserva de espaços"
      subtitle="Visualize o quadro de horários e inicie uma reserva."
      :breadcrumbs="breadcrumbs"
    ></AppPageTitle>
    <section class="row m-0">
      <v-row class="m-0 w-100">
        <v-col cols="12" xl="12" lg="12" md="12" class="m-t-10">
          <v-row class="m-0" no-gutters>
            <v-col class="p-t-30 overflow-auto">
              <v-sheet height="64" color="primary">
                <v-toolbar flat color="white" height="64">
                  <template #prepend>
                    <v-btn
                      variant="outlined"
                      class="mr-4"
                      color="grey darken-2"
                      @click="setToday"
                    >
                      Hoje
                    </v-btn>
                  </template>

                  <template #title>
                    <div class="d-flex align-center">
                      <v-btn
                        icon
                        text
                        size="small"
                        color="grey darken-2"
                        @click="prev"
                      >
                        <v-icon size="small"> mdi-chevron-left </v-icon>
                      </v-btn>
                      <div class="text-capitalize p-l-10 p-r-10">
                        <span v-if="$refs.calendar">
                          {{ $refs.calendar.title }}
                        </span>
                      </div>
                      <v-btn
                        icon
                        text
                        size="small"
                        color="grey darken-2"
                        @click="next"
                      >
                        <v-icon size="small"> mdi-chevron-right </v-icon>
                      </v-btn>
                    </div>
                  </template>

                  <v-menu bottom right>
                    <template v-slot:activator="{ props }">
                      <v-btn
                        variant="outlined"
                        color="grey darken-2"
                        v-bind="props"
                      >
                        <span>{{ typeToLabel[type] }}</span>
                        <v-icon right> mdi-menu-down </v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="type = 'month'">
                        <v-list-item-title>Mês</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="type = 'week'">
                        <v-list-item-title>Semana</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="type = '4day'">
                        <v-list-item-title>4 Dias</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="type = 'day'">
                        <v-list-item-title>Dia</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-toolbar>
              </v-sheet>
              <v-sheet height="600">
                <h2>v-model value: {{ focus }}</h2>
                <v-calendar
                  ref="calendar"
                  v-model="focus"
                  color="primary"
                  :type="type"
                  :events="events"
                  :event-overlap-mode="'column'"
                  :event-overlap-threshold="30"
                  :event-color="getEventColor"
                  :weekdays="weekday"
                  :short-intervals="false"
                  :short-weekdays="false"
                  :category-show-all="false"
                  :categories="categories"
                  class="quadro-horarios"
                  @click:date="viewDay"
                  @click:more="viewMoreEvents"
                  @click:event="iniciarReserva"
                  @change="changeEvents"
                >
                  <template v-slot:event="{ event }">
                    <div
                      v-if="type !== 'day'"
                      class="m-l-5 content-summary-day"
                      :title="
                        formatEventTime(event.start) +
                        '-' +
                        formatEventTime(event.end) +
                        ' ' +
                        event.name
                      "
                    >
                      <strong
                        >{{ formatEventTime(event.start) }} -
                        {{ formatEventTime(event.end) }}</strong
                      >
                      {{ event.name }}
                    </div>
                    <div
                      v-if="type === 'day'"
                      class="content-summary-day"
                      :title="
                        formatEventTime(event.start) +
                        '-' +
                        formatEventTime(event.end) +
                        ' ' +
                        event.name
                      "
                    >
                      {{ event.name }}
                      <br />
                      <strong class="m-l-5"
                        >{{ formatEventTime(event.start) }} -
                        {{ formatEventTime(event.end) }}</strong
                      >
                    </div>
                  </template>
                </v-calendar>
              </v-sheet>
            </v-col>
          </v-row>
          <section></section>
        </v-col>
      </v-row>
    </section>
  </div>
</template>
<script>
import { quadroHorariosStore } from "./stores/store";
import _ from "lodash";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default {
  name: "QuadroHorariosReserva",
  setup() {
    return {
      useQuadroHorariosStore: quadroHorariosStore(),
    };
  },
  computed: {
    filtrosFromStore() {
      return this.useQuadroHorariosStore.filtros;
    },
    periodoCalendario() {
      if (!this.focus) return "";
      return this.focus;
    },
  },
  data() {
    return {
      focus: new Date().toISOString().substring(0, 10),
      events: [],
      categories: [],
      type: "month",
      typeToLabel: {
        month: "Mês",
        week: "Semana",
        day: "Dia",
        category: "Dia",
        "4day": "4 Dias",
      },
      status: [
        {
          cor: "green",
          descricao: "Livre",
          valor: "Livre",
        },
        {
          cor: "orange",
          descricao: "Reservado",
          valor: "Reservado",
        },
        {
          cor: "red",
          descricao: "Ocupado",
          valor: "Ocupado",
        },
        {
          cor: "deep-purple",
          descricao: "Bloqueado",
          valor: "Bloqueado",
        },
        {
          cor: "grey darken-1",
          descricao: "Interditado",
          valor: "Interditado",
        },
        {
          cor: "grey lighten-1",
          descricao: "Conflito",
          valor: "Conflito",
        },
        {
          cor: "red darken-4",
          descricao: "Locado",
          valor: "Locado",
        },
        {
          cor: "#47000b",
          descricao: "Reservado para aulas",
          valor: "Aula",
        },
      ],
      weekday: [1, 2, 3, 4, 5, 6, 0],
    };
  },
  created() {},
  methods: {
    format,
    dateFormat(date, mask) {
      if (!date) return "";
      return format(date, mask, { locale: ptBR });
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "category";
    },
    viewMoreEvents({ date }) {
      this.focus = date;
      this.type = "day";
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      console.log(this.$refs.calendar.title);
      this.$refs.calendar.prev();
    },
    next() {
      console.log(this.$refs.calendar.title);
      this.$refs.calendar.next();
    },
    iniciarReserva(nativeEvent, { event }) {
      nativeEvent.stopPropagation();
    },
    formatEventTime(date) {
      return new Date(date).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    },
    changeEvents({ start, end }) {
      this.getEvents({});
    },
    getEvents({ start, end }) {
      if (this.firstLoad) {
        this.firstLoad = false;
        return;
      }
      if (start ? this.filtros.data === start.date : false) return;
      if (start) this.filtros.data = start.date;

      this.useQuadroHorariosStore.loadHorarios(this.filtros).then((res) => {
        const events = [];
        res.forEach((r) => {
          const inicio = new Date(r.inicio);
          const fim = new Date(r.fim);
          events.push({
            title: `${r.descricaoLocal}`,
            start: new Date(inicio),
            end: new Date(fim),
            color: this.setEventColor(r),
            timed: true,
            category: `${r.descricaoLocal}`,
            horario: r,
          });
        });
        this.events = events;
      });
    },
    getEventColor(event) {
      return event.color;
    },
    setEventColor(event) {
      switch (event.status) {
        case "Aula":
          return "#47000b";
        case "Locado":
          return "red darken-4";
        case "Interditado":
          return "grey darken-1";
        case "Conflito":
          return "grey lighten-1";
        case "Livre":
          return "green";
        case "Ocupado":
          return "red";
        case "Reservado":
          return "orange";
        case "Bloqueado":
          return "deep-purple";
        default:
          return "grey darken-1";
      }
    },
  },
};
</script>
<style lang="scss">
.event-day {
  height: 22px;
  margin: 2px 0;
  text-align: center;
  color: #fff;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-theme--dark {
  .v-calendar-category .v-calendar-daily__head,
  .v-calendar-category .v-calendar-daily__intervals-head,
  .v-calendar-category .v-calendar-daily__intervals-body {
    background: #303030;
  }
}
.quadro-horarios {
  .content-summary-day {
    word-wrap: break-word;
    white-space: pre-wrap;
    word-break: break-word;
    max-height: 100%;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .v-calendar-daily_head-weekday {
    font-size: 18px !important;
    font-weight: 600;
  }
  .v-calendar-daily_head-day-label {
    button {
      font-size: 24px !important;
      font-weight: 600;
    }
  }
  .v-calendar-weekly__day {
    .v-event-summary {
      strong {
        display: none !important;
      }
    }
  }
  .v-calendar-daily__day {
    .v-event-summary {
      strong {
        font-size: 12px !important;
      }
      font-size: 0px;
    }
  }
  .v-calendar-category {
    overflow: overlay !important;
  }

  .v-calendar-category .v-calendar-daily__day,
  .v-calendar-category
    .v-calendar-category__columns
    .v-calendar-category__column-header {
    max-width: 150px !important;
    min-width: 150px;
  }
}
</style>
