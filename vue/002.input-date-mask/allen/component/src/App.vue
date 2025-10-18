<script setup lang="ts">
import { ref, watch } from "vue";
import InputDateMask from "./components/InputDateMask.vue";
import * as z from "zod/v4";

const date = ref<Date | null>(new Date(1989, 5, 4));
const dateError = ref<string | null>(null);

// 定义 zod schema
const dateSchema = z
  .instanceof(Date)
  .refine((d) => !isNaN(d.getTime()), { message: "请输入有效日期" });

// 校验方法
function validateDate(val: Date | null) {
  if (val === null) {
    dateError.value = "日期不能为空";
    return false;
  }
  const result = dateSchema.safeParse(val);
  if (!result.success) {
    dateError.value =
      result.error.issues && result.error.issues.length > 0
        ? result.error.issues[0].message
        : "请输入有效日期";
    return false;
  }
  dateError.value = null;
  return true;
}

function handleDateChange(val: Date | null) {
  validateDate(val);
}
</script>

<template>
  <main class="flex flex-col items-center p-12 gap-4">
    <InputDateMask v-model="date" @value-change="handleDateChange" :label="'yyyy/MM/dd'" />
    <div v-if="dateError" class="text-red-500">{{ dateError }}</div>
    <div>
      父组件的 date:
      {{
        date
          ?.toLocaleDateString("en", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
          .replace(",", "")
      }}
    </div>
  </main>
</template>

<style scoped></style>
