const { createApp, reactive, onMounted, onUnmounted, toRefs } = Vue;

const useMouse = () => {
  //#region Reactive References
  const state = reactive({
    x: 0,
    y: 0,
  });
  //#endregion

  //#region Lifecycle Hooks
  onMounted(() => {
    window.addEventListener("mousemove", update);
  });

  onUnmounted(() => {
    window.removeEventListener("mousemove", update);
  });
  //#endregion

  //#region Methods
  function update(e) {
    state.x = e.pageX;
    state.y = e.pageY;
  }
  //#endregion

  return {
    ...toRefs(state),
  };
};

const App = {
  template: `
    <div>
      <p>X Axis: {{ x }}</p>
      <hr />
      <p>Y Axis: {{ y }}</p>
    </div>
  `,
  setup() {
    const { x, y } = useMouse();
    return { x, y };
  },
};

createApp(App).mount("#app");
