<script setup lang="ts">
const icon = useTemplateRef<HTMLElement>("icon");
const router = useRouter();

if (import.meta.client) {
  // 遷移直後は View Transition とスクロール復元を挟むため、角度が動くまで数フレーム待つ
  const catchUpWindow = 1000;
  let angleBeforeNavigation = 0;
  let watching = false;

  const unregisterBefore = router.beforeEach(() => {
    if (icon.value) {
      angleBeforeNavigation = Number.parseFloat(getComputedStyle(icon.value).rotate) || 0;
    }
  });

  const unregisterAfter = router.afterEach(() => {
    const target = icon.value;
    if (!target) return;

    const startAngle = angleBeforeNavigation;
    const rootStyle = getComputedStyle(document.documentElement);
    const deadline = performance.now() + catchUpWindow;
    watching = true;

    const step = () => {
      if (!watching) return;
      const difference = startAngle - (Number.parseFloat(getComputedStyle(target).rotate) || 0);
      // 見た目の角度は 360 度周期なので、最短の向きに回して余計な一回転を避ける
      const delta = (((difference % 360) + 540) % 360) - 180;
      if (Math.abs(delta) < 1) {
        if (performance.now() < deadline) requestAnimationFrame(step);
        else watching = false;
        return;
      }
      watching = false;
      target.animate([{ rotate: `${delta}deg` }, { rotate: "0deg" }], {
        duration:
          Number.parseFloat(rootStyle.getPropertyValue("--header-icon-catch-up-duration")) * 1000,
        easing: rootStyle.getPropertyValue("--header-icon-catch-up-easing"),
        composite: "add",
      });
    };

    requestAnimationFrame(step);
  });

  onUnmounted(() => {
    watching = false;
    unregisterBefore();
    unregisterAfter();
  });
}
</script>

<template>
  <header>
    <div class="header-inner">
      <NuxtLink to="/">
        <div class="logo">
          <img ref="icon" src="/icon.webp" alt="" width="56" height="56" class="logo-icon" />
          <span class="wordmark">newt239<span class="wordmark-suffix">.dev</span></span>
        </div>
      </NuxtLink>
      <ThemeChanger />
    </div>
  </header>
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  right: 0;
  left: auto;
  z-index: 100;
  width: 100%;
  padding: 0.75rem 0;
  color: rgb(var(--text));
  background-color: rgb(var(--bg) / 72%);
  border-color: rgb(var(--border));
  border-style: solid;
  border-width: 0 0 var(--border-width-hairline);
  backdrop-filter: blur(12px) saturate(1.4);
  view-transition-name: site-header;

  .header-inner {
    display: flex;
    flex-flow: row nowrap;
    gap: min(1rem, 3vw);
    align-items: center;
    max-width: var(--container-max-width);
    padding-inline: var(--container-padding-inline);
    margin: 0 auto;
    container-type: inline-size;
  }

  a {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: space-between;
    min-width: 0;
    color: rgb(var(--text));
    border-radius: var(--radius-sm);

    .logo {
      display: flex;
      gap: min(0.75rem, 3vw);
      align-items: center;
      min-width: 0;
      transition: var(--transition);

      @media (hover: hover) {
        &:hover {
          opacity: 0.5;
        }
      }

      @media (hover: none) {
        &:active {
          opacity: 0.5;
        }
      }

      .logo-icon {
        display: block;
        flex-shrink: 0;
        width: var(--header-icon-size);
        height: var(--header-icon-size);
        border-radius: var(--radius-round);
        corner-shape: round;

        @supports (animation-timeline: scroll()) {
          @media (prefers-reduced-motion: no-preference) {
            animation-name: header-icon-spin;
            animation-timing-function: var(--header-icon-spin-easing);
            animation-timeline: scroll(root block);
          }
        }
      }

      .wordmark {
        min-width: 0;
        margin: 0;
        font-size: var(--wordmark-font-size);
        font-weight: 800;
      }

      @container (max-width: 15em) {
        .logo-icon {
          display: none;
        }

        .wordmark-suffix {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip-path: inset(50%);
        }
      }
    }
  }
}

@supports not (backdrop-filter: blur(1px)) {
  header {
    background-color: rgb(var(--bg));
  }
}

@keyframes header-icon-spin {
  to {
    rotate: var(--header-icon-spin-turns);
  }
}
</style>
