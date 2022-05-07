<template>
  <div
    style="
      background-color: #9cb0ba;
      margin: 10px 20px;
      padding: 20px 10px;
      height: 400vh;
    "
  >
    <div>
      <profile-details v-bind:userId="id"></profile-details>
    </div>
    <hr />
    <h3 style="text-align: center; margin-bottom: 80px">
      Look for available appointment scheducles:
    </h3>
    <div class="available-bookings">
      <div>
        <client-only>
          <date-picker :inline="true" v-model="date_today" format="D" />
        </client-only>
      </div>
      <div v-if="date_today !== null && slots.length !== 0" class="slot">
        <div v-for="(slot, index) of slots" :key="index">
          <button
            v-on:click="slotId(slot.id)"
            class="update"
            style="background-color: #42cc8c; width: 100%; padding: 15px 0px"
          >
            {{ slot.start_time }}-{{ slot.end_time }}
          </button>
          <div v-if="choosedSlotId === slot.id">
            <div class="_log_input_group">
              <Input
                placeholder="agenda in short"
                size="large"
                type="text"
                v-model="agenda"
              ></Input>
              <!-- *********** -->
              <button
                v-on:click="sendReq(choosedSlotId, id)"
                class="update"
                style="background-color: #e182af; padding: 15px 10px"
              >
                send request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import profileDetails from "../../components/profileDetails.vue";
import moment from "moment";
moment().format();
export default {
  components: { profileDetails },
  data() {
    return {
      id: this.$route.params.id,
      date_today: null,
      slots: [],
      agenda: "",
      choosedSlotId: null,
    };
  },
  created() {
    // console.log("created", this.date_today);
  },
  methods: {
    slotId(id) {
      this.choosedSlotId = id;
      console.log("slot id called", this.choosedSlotId);
    },
    async sendReq(timeSlotId, teacherId) {
      let date = moment(this.date_today).toString();
      let day = moment(this.date_today).isoWeekday();
      const data = {
        timeSlotId,
        date,
        studentId: this.$store.state.authUser.id,
        agenda: this.agenda,
      };
      if (this.agenda === null || this.agenda === "") {
        return this.e("mention your agenda for meeting");
      }
      const req = await this.callApi("post", "/appointments/request", data);
      if (req.status === 200) {
        this.s("request sent ");
        this.agenda = "";
      } else {
        this.e("something went wrong, try again");
      }
    },
  },
  watch: {
    timings: function () {
      // console.log(" im from watch date  = ", this.date_today);
    },
  },
  computed: {
    async timings() {
      if (this.date_today !== null) {
        let date = moment(this.date_today).format("DD MMM YYYY");
        let day = moment(this.date_today).isoWeekday();
        console.log(date.toString());
        console.log(day.toString());
        const data = {
          teacher_id: this.id,
          day_id: day,
        };
        const slots = await this.callApi(
          "get",
          `time-slots?teacher_id=${this.id}&day_id=${day}`
        );
        this.slots = slots.data;
        console.log(this.slots);
        console.log(this.choosedSlotId);
      }
    },
  },
};
</script>

<style>
.available-bookings {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-row-gap: 26px;
}
.slot {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 20px;
  grid-column-gap: 20px;
}
</style>