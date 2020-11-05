import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { registerLocale } from "react-datepicker";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import styled from "styled-components";
// DatePickerのロケールを設定に使用。
import ja from "date-fns/locale/ja";
// import EventModal from "../templates/EventModal";
const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: left;
`;
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
// DatePickerのロケールを日本に設定。
registerLocale("ja", ja);

// 追加するイベントの型。
// interface myEventsType {
//   id: number
//   title: string
//   start: Date
//   end: Date
// }

const Calendar = (props) => {
  const calendarRef = React.createRef();
  const { register, handleSubmit } = useForm();
  const [inputTitle, setInputTitle] = useState("");
  const [inputStart, setInputStart] = useState(new Date());
  const [inputEnd, setInputEnd] = useState(new Date());
  const [inView, setInView] = useState(false);
  const [event, setEvent] = useState();
  const [myEvents, setMyEvents] = useState([]);

  const handleCLick = (info) => {
    const event = myEvents[info.event.id];
    const title = event.title;
    const start = event.start;
    const end = event.end;
    setInputTitle(title);
    setInputStart(start);
    setInputEnd(end);
    setInView(true);
  };
  const handleSelect = (selectinfo) => {
    const start = new Date(selectinfo.start).toISOString().substr(0, 16);
    const end = new Date(selectinfo.end).toISOString().substr(0, 16);
    // console.log(start);
    // console.log(end);
    // setInputTitle("aaa");
    setInputStart(start);
    setInputEnd(end);
    setInView(true);
  };
  const handleClose = () => {
    setInView(false);
  };
  // const on_submit = (data) => {
  //   setInputTitle(data.title);
  //   setInputStart(new Date(data.startTime));
  //   setInputEnd(new Date(data.endTime));
  //   console.log(data.title);
  //   on_add_event();
  // };
  const on_add_event = (data) => {
    // const startTime = inputStart;
    // const endTime = inputEnd;
    // if (startTime >= endTime) {
    //   alert("開始時間と終了時間を確認してください。");
    //   return;
    // }
    // const aa = new Date("Mon Nov 02 2020 09:00:00 GMT+0900 (日本標準時)");
    setInputTitle(data.title);
    setInputStart(new Date(data.startTime));
    setInputEnd(new Date(data.endTime));

    // const event = {
    //   id: myEvents.length,
    //   title: inputTitle,
    //   start: new Date(inputStart),
    //   end: new Date(inputEnd),
    // };
    setEvent({
      id: myEvents.length,
      title: data.title,
      start: new Date(inputStart),
      end: new Date(inputEnd),
    });
    console.log(event);
    // console.log(calendarRef);
    setMyEvents([...myEvents, event]);
    console.log(myEvents);
    calendarRef.current.getApi().addEvent(event);
    setInView(false);
  };
  return (
    <div>
      <FullCalendar
        locale="ja" // ロケール設定。
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]} // 週表示、月表示、日付等のクリックを可能にするプラグインを設定。
        initialView="timeGridWeek" // カレンダーの初期表示設定。この場合、週表示。
        slotDuration="00:30:00" // 週表示した時の時間軸の単位。
        selectable={true} // 日付選択を可能にする。interactionPluginが有効になっている場合のみ。
        businessHours={{
          // ビジネス時間の設定。
          daysOfWeek: [1, 2, 3, 4, 5], // 0:日曜 〜 7:土曜
          startTime: "00:00",
          endTIme: "24:00",
        }}
        weekends={true} // 週末を強調表示する。
        titleFormat={{
          // タイトルのフォーマット。(詳細は後述。※1)
          year: "numeric",
          month: "short",
        }}
        headerToolbar={{
          // カレンダーのヘッダー設定。(詳細は後述。※2)
          start: "title",
          center: "prev, next, today",
          end: "dayGridMonth,timeGridWeek",
        }}
        events={[
          {
            title: "event 1",
            start: "2020-11-01T10:00:00",
            end: "2020-11-01T11:00:00",
          },
          { title: "event 2", date: "2020-11-02" },
        ]}
        ref={calendarRef}
        eventClick={handleCLick}
        select={handleSelect}
      />
      <ModalWrapper>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={inView}
          onClose={handleClose}
          closeAfterTransition
        >
          <Fade in={inView}>
            <Wrapper>
              <form onSubmit={handleSubmit(on_add_event)}>
                <Title>
                  <TitleText>予定を入力</TitleText>
                </Title>
                <TextField
                  name="title"
                  type="text"
                  id="standard-basic"
                  label="タイトル"
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
                  onClick={handleSubmit(on_add_event)}
                />
              </form>
            </Wrapper>
          </Fade>
        </Modal>
      </ModalWrapper>
    </div>
  );
};

export default Calendar;
