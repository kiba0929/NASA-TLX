import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// データの永続化
const { persistAtom } = recoilPersist({
	key: "recoil-persist",
	storage: sessionStorage
});

export interface AnswerState {
  id: number;
  answer: number;
}

export interface UserInfoState {
  join_date: string;
  join_time: string;
  task_num: number;
}

export const userInfoAnswerState = atom<UserInfoState>({
  key: 'userinfo-answers', // unique ID (with respect to other atoms/selectors)
  default: {} as UserInfoState, // default value (aka initial value)
  effects_UNSTABLE: [persistAtom], // データの永続化
});

export const nasaTLXAnswerState = atom<AnswerState[]>({
  key: 'nasa-tlx-answers', // unique ID (with respect to other atoms/selectors)
  default: [] as AnswerState[], // default value (aka initial value)
  effects_UNSTABLE: [persistAtom], // データの永続化
});
