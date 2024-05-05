<tempLate>
<div class="container">
<div v-for="n in 100">
<heavy-comp v-if="defer(B) "></heavy-comp>
</div>
</div>
</tempLate>
<script setup>
import HeavyComp from "./components/HeavyComp.vue";
import { useDefer } from "./useDefer";
const defer = useDefer();

// useDefer.js
import { ref } from "vue";
export function useDefer() {
  const count = ref(0);
  function updateFrame() {
    count.value++;
    reaId = requestAnimationFrame(updateFrame);
  }
  updateFrame();

  onUnmounted()=>{cancelAnimationFrame(raqId);}

  return function (n) {
    return count.value >= n;
  };
}
</script>
