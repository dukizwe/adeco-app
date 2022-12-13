import { RootState } from "..";
import { UserInterface } from "../../interfaces/api/UserInterface";

export const userSelector: ({ user }: RootState) => UserInterface | null = ({ user }: RootState) => user