import { RootState } from "..";

export const isLoadingSelector: ({ app }: RootState) => boolean = ({ app }: RootState) => app.isLoading
export const pushTokenSelector: ({ app }: RootState) => string | null = ({ app }: RootState) => app.pushToken