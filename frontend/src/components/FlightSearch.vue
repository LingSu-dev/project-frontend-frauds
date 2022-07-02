<script lang="ts" setup>
import { reactive, ref } from "vue";

const formRef = ref(null);

// do not use same name with ref
const form = reactive({
  departureAirport: "",
  arrivalAirport: "",
  departureDate: "",
  returnDate: "",
});

const rules = reactive({
  departureAirport: [
    {
      required: true,
      message: "Please select Departure Airport",
      trigger: "change",
    },
  ],
  arrivalAirport: [
    {
      required: true,
      message: "Please select Arrival Airport",
      trigger: "change",
    },
  ],
  departureDate: [
    {
      required: true,
      message: "Please enter Departure Date",
      trigger: "change",
    },
  ],
  returnDate: [
    {
      required: true,
      message: "Please enter Return Date",
      trigger: "change",
    },
  ],
});

const onSubmit = async (formElement) => {
  if (!formElement) return;
  await formElement.validate((valid, fields) => {
    if (valid) formElement.resetFields();
    else console.log("error submit!", fields);
  });
};
</script>

<template>
  <el-form
    :model="form"
    :rules="rules"
    ref="formRef"
    class="flight-search-form"
    label-width="130px"
    size="large"
  >
    <el-form-item label="Leaving" prop="departureAirport">
      <el-autocomplete
        style="width: 100%"
        :fetch-suggestions="() => {}"
        v-model="form.departureAirport"
        placeholder="Departure Airport"
      />
    </el-form-item>
    <el-form-item label="Arriving" prop="arrivalAirport">
      <el-autocomplete
        style="width: 100%"
        :fetch-suggestions="() => {}"
        v-model="form.arrivalAirport"
        placeholder="Arrival Airport"
      />
    </el-form-item>
    <el-form-item label="Departure Date" prop="departureDate">
      <el-date-picker
        v-model="form.departureDate"
        type="date"
        value-format="X"
        placeholder="Departure Date"
      />
    </el-form-item>
    <el-form-item label="Return Date" prop="returnDate">
      <el-date-picker
        v-model="form.returnDate"
        type="date"
        value-format="X"
        placeholder="Return Date"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit(formRef)">Search</el-button>
    </el-form-item>
  </el-form>
</template>

<style>
.flight-search-form {
  color: aliceblue;
}
</style>