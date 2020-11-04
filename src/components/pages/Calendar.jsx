import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { registerLocale } from "react-datepicker";
import styled from "styled-components";

// DatePickerのロケールを設定に使用。
import ja from "date-fns/locale/ja";
import EventModal from "../templates/EventModal";
const Modal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: left;
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
  const ref = React.createRef();
  const [inputTitle, setInputTitle] = useState("");
  const [inputStart, setInputStart] = useState(new Date());
  const [inputEnd, setInputEnd] = useState(new Date());
  const [inView, setInView] = useState(false);
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
    setInputTitle("aaa");
    setInputStart(start);
    setInputEnd(end);
    setInView(true);
  };
  const on_add_event = () => {
    // const startTime = inputStart;
    // const endTime = inputEnd;
    // if (startTime >= endTime) {
    //   alert("開始時間と終了時間を確認してください。");
    //   return;
    // }
    // const aa = new Date("Mon Nov 02 2020 09:00:00 GMT+0900 (日本標準時)");
    const event = {
      id: myEvents.length,
      title: inputTitle,
      start: new Date(inputStart),
      end: new Date(inputEnd),
    };
    console.log(event);
    console.log(ref);
    setMyEvents([...myEvents, event]);
    ref.current.getApi().addEvent(event);
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
        ref={ref}
        eventClick={handleCLick}
        select={handleSelect}
      />
      <Modal>
        <EventModal
          inputTitle={inputTitle}
          setInputTitle={setInputTitle}
          inputStart={inputStart}
          setInputStart={setInputStart}
          inputEnd={inputEnd}
          setInputEnd={setInputEnd}
          inView={inView}
          setInView={setInView}
          on_add_event={on_add_event}
        />
      </Modal>
    </div>
  );
};

export default Calendar;
