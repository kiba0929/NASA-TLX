import { Paper, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useRecoilState } from "recoil";
import { userInfoAnswerState } from "./store/answerState";
import { useEffect, useState } from "react";

interface LocalAnswer {
  date: Date;
  time: string;
  task_num: number;
}

const UserQuestion = () => {
  const [localAnswer, setLocalAnswer] = useState({} as LocalAnswer);
  const [formAnswer, setFormAnswer] = useRecoilState(userInfoAnswerState);
  useEffect(() => {
    if (Object.keys(formAnswer).length == 0) return;
    const localAnswer = {} as LocalAnswer;
    if (formAnswer.join_date) localAnswer.date = new Date(formAnswer.join_date);
    if (formAnswer.join_time) {
      console.log(formAnswer.join_time);
      localAnswer.time = formAnswer.join_time;
    }
    if (formAnswer.task_num) localAnswer.task_num = formAnswer.task_num;
    setLocalAnswer({ ...localAnswer });
  }, []);

  const setDate = (date: Date | null) => {
    if (date == null) return;

    const date_str = date.toLocaleDateString();
    setLocalAnswer((old) => {
      return {
        ...old,
        date: date,
      };
    });
    setFormAnswer((old: any) => {
      return {
        ...old,
        join_date: date_str,
      };
    });
  };

  const setTime = (event: any) => {
    const [hours, minutes] = event.target.value.split(":");
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    if (date == null) return;
    setLocalAnswer((old) => {
      return {
        ...old,
        time: event.target.value,
      };
    });
    setFormAnswer((old: any) => {
      return {
        ...old,
        join_time: `${hours}:${minutes}`,
      };
    });
  };

  const setTaskNum = (event: any) => {
    const num = event.target.value;
    setFormAnswer((old: any) => {
      return {
        ...old,
        task_num: num,
      };
    });
  };

  return (
    <>
      <Paper
        style={{ margin: "20px auto", padding: "20px", maxWidth: "800px" }}
      >
        <div>参加した日付・時間を教えてください</div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <span style={{ margin: "10px" }}>日付</span>
              <DatePicker onChange={setDate} value={localAnswer.date} />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <span style={{ margin: "10px" }}>時間</span>
              <TextField
                onChange={setTime}
                type="time"
                value={localAnswer.time}
                margin="dense"
              />
            </div>
          </LocalizationProvider>
        </div>
      </Paper>
      <Paper
        style={{ margin: "20px auto", padding: "20px", maxWidth: "800px" }}
      >
        <div>何回目のタスクですか？</div>
        <div>
          <label htmlFor="exp-times-1" style={{ margin: "20px 20px 0 0" }}>
            <input
              id="exp-times-1"
              defaultChecked={formAnswer.task_num == 1}
              type="radio"
              name="exp-times"
              value="1"
              onClick={setTaskNum}
            />
            1回目
          </label>
          <label htmlFor="exp-times-2" style={{ margin: "20px 20px 0 0" }}>
            <input
              id="exp-times-2"
              defaultChecked={formAnswer.task_num == 2}
              type="radio"
              name="exp-times"
              value="2"
              onClick={setTaskNum}
            />
            2回目
          </label>
        </div>
      </Paper>
    </>
  );
};

export default UserQuestion;
