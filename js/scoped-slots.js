const { createApp, h } = Vue;

const Mouse = {
  data() {
    return {
      x: 0,
      y: 0,
    };
  },
  methods: {
    update(e) {
      this.x = e.pageX;
      this.y = e.pageY;
    },
  },
  mounted() {
    window.addEventListener("mousemove", this.update);
  },
  unmounted() {
    window.removeEventListener("mousemove", this.update);
  },
  /* template: `
    <slot :x="x" :y="y" />
  `, */
  render() {
    return h("div", null, [
      this.$slots.default &&
        this.$slots.default({
          x: this.x,
          y: this.y,
        }),
    ]);
  },
};

const App = {
  template: `
    <Mouse v-slot="{ x, y }">
      <p>X Axis: {{ x }}</p>
      <hr />
      <p>Y Axis: {{ y }}</p>
    </Mouse>
  `,
  components: {
    Mouse,
  },
};

createApp(App).mount("#app");
