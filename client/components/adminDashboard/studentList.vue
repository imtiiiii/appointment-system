<template>
  <div>
    <div
      v-for="(student, index) of students"
      :key="index"
      style="margin: 30px 20px"
    >
      <div style="background-color: #9cb0ba; padding: 10px 20px">
        <h4>name: {{ student.first_name + " " + student.last_name }}</h4>
        <hr />
        <h4>email:{{ student.email }}</h4>
        <hr />
        <h4>identity:{{ student.user_type }}</h4>
        <hr />
        <h4 v-if="student.user_type === 'student'">
          Student id: {{ student.student_id }}
        </h4>

        <div style="margin: 30px 0px">
          <button
            v-on:click.once="update(student.id)"
            class="update"
            style="background-color: #42cc8c; width: 100px; padding: 15px 0px"
          >
            Update
          </button>
          <button
            v-on:click.once="erase(student.id)"
            class="reject"
            style="background-color: #ff531d; width: 100px; padding: 15px 0px"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      students: null,
    };
  },
  async created() {
    const students = await this.callApi("get", "/dashboard/student-list/");
    if (students.status === 200) {
      this.students = students.data;
      console.log(this.students);
    }
  },
  methods: {
    async erase(id) {
      const dlt = await this.callApi("delete", "/auth/delete", {
        id,
      });
      if (dlt.status !== 200) {
        this.e("something went wrong.Try again");
      } else {
        this.s("successfull");
      }
    },
    update(id) {
      this.$router.push(`/profile/${id}`);
    },
  },
};
</script>

<style>
</style>