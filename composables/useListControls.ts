import type { LocationQuery } from "vue-router";

export const useListControls = <T>(
  fromQuery: (query: LocationQuery) => T,
  toQuery: (state: T) => Record<string, string>
) => {
  const route = useRoute();
  const router = useRouter();
  const applied = ref(fromQuery(route.query)) as Ref<T>;
  const draft = ref(fromQuery(route.query)) as Ref<T>;

  watch(
    () => route.query,
    (query) => {
      applied.value = fromQuery(query);
      draft.value = fromQuery(query);
    }
  );

  const dirty = computed(
    () =>
      new URLSearchParams(toQuery(draft.value)).toString() !==
      new URLSearchParams(toQuery(applied.value)).toString()
  );
  const hasConditions = computed(
    () => new URLSearchParams(toQuery(applied.value)).toString() !== ""
  );

  const apply = async () => {
    const update = async () => {
      const query = toQuery(draft.value);
      applied.value = fromQuery(query);
      await router.replace({ query });
      await nextTick();
    };
    if (!("startViewTransition" in document)) {
      await update();
      return;
    }
    const transition = document.startViewTransition({ types: ["list-filter"], update });
    await Promise.allSettled([transition.finished]);
    await transition.updateCallbackDone;
  };

  return { applied, draft, dirty, hasConditions, apply };
};
