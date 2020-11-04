import React from "react";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { useForm } from "react-hook-form";
// import DatePicker from "react-datepicker";
// import Input from "@material-ui/core/Input";

const Wrapper = styled.div`
  width: 420px;
  padding: 10px;
  margin: 0 auto;
  background-color: white;
  position: relative;
  top: 350px;
  border-radius: 10px;
`;
const Title = styled.div`
  border-bottom: solid 1px black;
`;
const TitleText = styled.h2`
  margin: 0;
`;
const Datepick = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;

export default function EventModal({
  inputTitle,
  setInputTitle,
  inputStart,
  setInputStart,
  inputEnd,
  setInputEnd,
  inView,
  setInView,
  on_add_event,
}) {
  const handleClose = () => {
    setInView(false);
  };
  const { register, handleSubmit } = useForm();
  const on_submit = (data) => {
    setInputTitle(data.title);
    setInputStart(new Date(data.startTime));
    setInputEnd(new Date(data.endTime));

    on_add_event();
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={inView}
      onClose={handleClose}
      closeAfterTransition
    >
      <Fade in={inView}>
        <Wrapper>
          <form onSubmit={handleSubmit(on_submit)}>
            <Title>
              <TitleText>予定を入力</TitleText>
            </Title>
            <TextField
              name="title"
              type="text"
              id="standard-basic"
              label="タイトル"
              autoComplete="title"
              autoFocus
              inputRef={register}
            />
            <Datepick>
              <TextField
                name="startTime"
                id="datetime-local"
                label="開始日時"
                type="datetime-local"
                defaultValue={inputStart}
                InputLabelProps={{
                  shrink: true,
                }}
                inputRef={register}
              />
              <TextField
                name="endTime"
                id="datetime-local"
                label="終了日時"
                type="datetime-local"
                defaultValue={inputEnd}
                InputLabelProps={{
                  shrink: true,
                }}
                inputRef={register}
              />
            </Datepick>
            <input
              type="button"
              value="保存"
              onClick={handleSubmit(on_submit)}
            />
          </form>
        </Wrapper>
      </Fade>
    </Modal>
  );
}
