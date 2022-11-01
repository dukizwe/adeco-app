import { RootState } from "..";

export const isLoadingSelector: ({ app }: RootState) => boolean = ({ app }: RootState) => app.isLoading