import React from "react";
import DatePicker from "react-datepicker";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const Wrapper = styled.div`
  width: 400px;
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

export default function EventModal({
  inputTitle,
  setInputTitle,
  inputStart,
  setInputStart,
  inputEnd,
  setInputEnd,
  inView,
  setInView,
  onAddEvent,
}) {
  const handleClose = () => {
    setInView(false);
  };
  const { register, handleSubmit, errors } = useForm();
  const on_submit = (data) => {};
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
              type="text"
              value={inputTitle}
              name="inputTitle"
              id="standard-basic"
              label="タイトル"
            />
            {/* <DatePicker
              locale="ja"
              dateFormat="yyyy/MM/d HH:mm"
              selected={inputStart}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={10}
              todayButton="today"
              name="inputStart"
              onChange={(time) => {
                setInputStart(time);
                console.log(time);
              }}
            /> */}
            {/* <DatePicker
              locale="ja"
              dateFormat="yyyy/MM/d HH:mm"
              selected={inputEnd}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={10}
              todayButton="today"
              name="inputEnd"
              onChange={(time) => {
                setInputEnd(time);
                console.log(time);
              }}
              /> */}
            <TextField
              id="datetime-local"
              label="Next appointment"
              type="datetime-local"
              defaultValue="2020-11-02T10:30"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setInputStart(e.target.value);
                console.log(e.target.value);
              }}
            />
            <TextField
              id="datetime-local"
              label="Next appointment"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(time) => {
                setInputEnd(time);
              }}
            />
            <input type="button" value="保存" onClick={() => onAddEvent()} />
          </form>
        </Wrapper>
      </Fade>
    </Modal>
  );
}
