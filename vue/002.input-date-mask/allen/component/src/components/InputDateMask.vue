<script setup lang="ts">
import InputMask from "primevue/inputmask";
import DatePicker from "primevue/datepicker";
import Button from "primevue/button";
import Popover from "primevue/popover";
import Toast from "primevue/toast";
import { Form } from "@primevue/forms";
import { ref, computed, reactive, watch } from "vue";
import { useToast } from "primevue/usetoast";
import { format, parse, isValid } from "date-fns";

const props = defineProps<{
  modelValue: Date | null;

  label?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: Date | null): void;
  (e: "value-change", value: Date | null): void;
}>();

const toast = useToast();

const date = ref<Date | null>(props.modelValue);
const op = ref();
const dateFormat = ref<string>("");

const toggle = (event: Event) => {
  if (op.value) {
    op.value?.toggle(event);
  }
};

const placeholder = computed(() => {
  if (props.label) {
    return props.label.toLowerCase();
  }
});

const mask = computed(() => {
  if (props.label) {
    const parts = props.label.split("/");
    return parts.map((part) => "9".repeat(part.length)).join("/");
  }
});

const formattedDate = computed<string>({
  get() {
    if (!date.value || !isValid(date.value)) return "";
    return format(date.value, props.label ?? "");
  },
  set(newValue: string) {
    if (!newValue || newValue.includes("_")) {
      date.value = null;
      return;
    }

    const parsed = parse(newValue, props.label ?? "", new Date());

    // if (!isValid(parsed) || format(parsed, "dd/MM/yyyy") !== newValue) {
    //   date.value = null;
    //   toast.add({
    //     severity: "error",
    //     summary: "Invalid Date",
    //     detail: "Please enter a valid date in the format DD/MM/YYYY.",
    //     life: 3000,
    //   });
    //   formattedDate.value = "";
    //   return;
    // } else {
    date.value = parsed;
    // }
  },
});

watch(
  () => props.modelValue,
  (newValue) => {
    date.value = newValue;
  }
);

watch(date, (newValue) => {
  emit("update:modelValue", newValue);
  emit("value-change", newValue);
});
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-4">
    <Toast />
    <div class="flex gap-2">
      <div class="flex flex-col gap-2">
        <label>{{ placeholder?.toUpperCase() }}</label>
        <div class="flex gap-2">
          <InputMask v-model="formattedDate" :mask="mask" :placeholder="placeholder" />
          <Button ref="btn" icon="pi pi-calendar" @click="toggle" />
        </div>
      </div>
    </div>
    <Popover ref="op">
      <DatePicker v-model="date" placeholder="Select Date" inline showButtonBar />
    </Popover>

    <div>
      date:
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
  </div>
</template>
