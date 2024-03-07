import { FC, ReactNode, useEffect, useRef, useState } from "react";
import NasaTLXQuestion from "./NasaTLXQuestion";
import {
  nasaTLXAnswerState,
  userInfoAnswerState,
} from "./store/answerState";
import { useRecoilValue } from "recoil";
import { Button, Divider, Paper } from "@mui/material";
import styled from "@emotion/styled";
import { sub_color } from "./color";
import { setDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";
import UserQuestion from "./UserQuestion";
import { nasa_tlx_list } from "./constraints";

const Container = styled.div`
  min-height: 100vh;
  padding: 10vh 10vw;
  background-color: ${sub_color};
  margin: auto;
`;

function App() {
  const navigate = useNavigate();

  const userinfo_answer = useRecoilValue(userInfoAnswerState);
  const nasa_tlx_result = useRecoilValue(nasaTLXAnswerState);

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const topref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page_log = localStorage.getItem("page");
    if (page_log) setPage(parseInt(page_log));
    setLoading(true);
  }, []);

  useEffect(() => {
    if (loading) localStorage.setItem("page", page.toString());
  }, [page, loading]);

  const toBeforePage = () => {
    if (page > 0) setPage((page) => page - 1);
    topref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toAfterPage = () => {
    // ユーザの情報の回答ページ
    if (page == 0) {
      if (Object.keys(userinfo_answer).length < 3) {
        alert("全ての質問に回答してください。");
        return;
      }
    }
    // nasa-tlx の回答ページ
    if (page == 1) {
      if (nasa_tlx_result.length !== nasa_tlx_list.length) {
        alert("全ての質問に回答してください。");
        return;
      }
    }
    setPage((page) => page + 1);
    topref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendAnswer = async () => {
    if (
      nasa_tlx_result.length !== nasa_tlx_list.length
    ) {
      alert("回答が完了していません。");
      return;
    }
    const doc_id = new Date().toISOString();
    try {
      await setDoc(doc(db, "answers", doc_id), {
        user_info: userinfo_answer,
        nasa_tlx: nasa_tlx_result,
        timestamp: new Date(),
      });
      console.log("Document written with ID: ", doc_id);
      // alert("送信が完了しました。");
      navigate("/end");
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("送信に失敗しました。");
    }
  };

  const pages = [
    <UserQuestion />,
    <>
      <Paper
        style={{
          margin: "20px auto",
          padding: "20px",
          maxWidth: "800px",
        }}
      >
        <div>
          赤い線を動かして、以下の質問に回答してください。
          <br />
          クリックすると赤い線が現れます。
          ドラッグで赤い線を動かすことも可能です。
        </div>
        <NasaTLXQuestion
          id={-1}
          name="記入例"
          description=""
          min="小さい"
          max="大きい"
        />
      </Paper>
      {nasa_tlx_list.map((nasa_tlx) => {
        return (
          <Paper
            style={{
              margin: "20px auto",
              padding: "20px",
              maxWidth: "800px",
            }}
            key={nasa_tlx.id}
          >
            <NasaTLXQuestion {...nasa_tlx} />
          </Paper>
        );
      })}
    </>,
  ];

  const lastPage = pages.length - 1;

  return (
    <Container>
      <Paper
        ref={topref}
        elevation={3}
        style={{
          margin: page == 1 ? "20px auto" : "20px auto",
          padding: "10px",
          maxWidth: "800px",
        }}
      >
        アンケート
      </Paper>
      {pages.map((p, i) => {
        return <Page isShow={page === i}>{p}</Page>;
      })}

      <Divider />
      <div style={{ margin: "20px auto", maxWidth: "800px", display: "flex" }}>
        {(page > 0 && (
          <Paper
            style={{ margin: "10px", padding: "10px", width: "50%" }}
            onClick={toBeforePage}
          >
            <Button> {"<<"} 前へ</Button>
          </Paper>
        )) || (
          <div style={{ margin: "10px", padding: "10px", width: "50%" }}></div>
        )}
        {page === lastPage ? (
          <Paper style={{ margin: "10px", padding: "10px", width: "50%" }}>
            <Button onClick={sendAnswer}>送信</Button>
          </Paper>
        ) : (
          <Paper
            style={{ margin: "10px", padding: "10px", width: "50%" }}
            onClick={toAfterPage}
          >
            <Button>次へ {">>"}</Button>
          </Paper>
        )}
      </div>
    </Container>
  );
}

const Page: FC<{ isShow: boolean; children: ReactNode }> = ({
  children,
  isShow,
}) => {
  return <div style={{ display: isShow ? "block" : "none" }}>{children}</div>;
};

export default App;
