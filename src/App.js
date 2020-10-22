import React, { useState } from "react";
// FullCalendarコンポーネント。
import FullCalendar from "@fullcalendar/react";
// FullCalendarで週表示を可能にするモジュール。
import timeGridPlugin from "@fullcalendar/timegrid";
// FullCalendarで月表示を可能にするモジュール。
import dayGridPlugin from "@fullcalendar/daygrid";
// FullCalendarで日付や時間が選択できるようになるモジュール。
import interactionPlugin from "@fullcalendar/interaction";
/**
 * 開始時間などを入力する際に、カレンダーから入力できるようにするためのライブラリとしてDatePickerを使用。
 * DatePickerコンポーネント、ロケール設定用のモジュール。
 */
import DatePicker, { registerLocale } from "react-datepicker";
// DatePickerのロケールを設定に使用。
import ja from "date-fns/locale/ja";
/**
 * Material-UIを通して、Styleを適用するためのモジュール。
 * - createStyles: 型推論を解決してくれるモジュール。
 * - makeStyles: StyleをHookAPIで適用させるモジュール。
 */
import { createStyles, makeStyles } from "@material-ui/core/styles";

// Style
const useStyles = makeStyles(() =>
  createStyles({
    cover: {
      opacity: 0,
      visibility: "hidden",
      position: "fixed",
      width: "100%",
      height: "100%",
      zIndex: 1000,
      top: 0,
      left: 0,
      background: "rgba(0, 0, 0, 0.3)",
    },
    form: {
      opacity: 0,
      visibility: "hidden",
      position: "fixed",
      top: "30%",
      left: "40%",
      fontWeight: "bold",
      background: "rgba(255, 255, 255)",
      width: "400px",
      height: "300px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2000,
    },
    inView: {
      // cover, formを表示する時に適用するStyle。
      opacity: 1,
      visibility: "visible",
    },
  })
);
// DatePickerのロケールを日本に設定。
registerLocale("ja", ja);

// 追加するイベントの型。
// interface myEventsType {
//   id: number
//   title: string
//   start: Date
//   end: Date
// }

const SampleCalendar = (props) => {
  const classes = useStyles();

  /**
   * 予定を追加する際にCalendarオブジェクトのメソッドを使用する必要がある。
   * (CalendarオブジェクトはRef経由でアクセスする必要がある。)
   */
  const ref = React.createRef();

  const [inputTitle, setInputTitle] = useState(""); // フォームに入力されたタイトル。
  const [inputStart, setInputStart] = useState(new Date()); // イベントの開始時刻。
  const [inputEnd, setInputEnd] = useState(new Date()); // イベントの終了時刻。
  const [inView, setInView] = useState(false); // イベント登録フォームの表示有無。(trueなら表示する。)
  const [myEvents, setMyEvents] = useState([]); // 登録されたイベントが格納されていく。myEventsTypタイプの配列。

  /**
   * カレンダーがクリックされた時にイベント登録用のフォームを表示する。
   * それぞれのフォームが下記の状態で表示される。
   *  - タイトル: 空欄
   *  - 開始: クリックしたカレンダーの開始時間
   *  - 終了: クリックしたカレンダーの終了時間
   */
  const handleCLick = (info) => {
    /**
     * infoにはカレンダーに登録されたイベントが入ってくる。そのイベントのIDを元にmyEvents
     * に格納されたイベントを取り出してStateに保存する。
     */
    const event = myEvents[info.event.id];
    const title = event.title;
    const start = event.start;
    const end = event.end;

    setInputTitle(title);
    setInputStart(start);
    setInputEnd(end);
    setInView(true);
  };

  /**
   * カレンダーから登録された予定をクリックした時にイベント変更用のフォームを表示する。
   * それぞれのフォームが下記の状態で表示される。
   *  - タイトル: 選択した予定のタイトル
   *  - 開始: 選択した予定の開始時間
   *  - 終了: 選択した予定の終了時間
   */
  const handleSelect = (selectinfo) => {
    const start = new Date(selectinfo.start);
    const end = new Date(selectinfo.end);
    start.setHours(start.getHours());
    end.setHours(end.getHours());

    setInputTitle("");
    setInputStart(start);
    setInputEnd(end);
    setInView(true);
  };

  /**
   * カレンダーに予定を追加する。
   */
  const onAddEvent = () => {
    const startTime = inputStart;
    const endTime = inputEnd;

    if (startTime >= endTime) {
      alert("開始時間と終了時間を確認してください。");
      return;
    }
    const event = {
      id: myEvents.length,
      title: inputTitle,
      start: startTime,
      end: endTime,
    };

    // Stateにイベントを追加する。ここで登録されたイベントは、予定を変更するときなどに使用する。
    setMyEvents([...myEvents, event]);

    // カレンダーに予定を登録して表示するための処理。
    ref.current.getApi().addEvent(event);
  };

  /**
   * ここからはフォームを構成する要素。
   */
  //フォームが表示された時に、グレー背景でフォーム以外を非アクティブ化に見えるようにするための要素。
  const coverElement = (
    <div
      onClick={() => setInView(false)}
      className={inView ? `${classes.cover} ${classes.inView}` : classes.cover}
    />
  );

  const titleElement = (
    <div>
      <label>タイトル</label>
      <input
        type="text"
        value={inputTitle}
        name="inputTitle"
        onChange={(e) => {
          // タイトルが入力されたら、その値をStateに登録する。
          setInputTitle(e.target.value);
        }}
      />
    </div>
  );

  const startTimeElement = (
    <div>
      <label>開始</label>
      <DatePicker
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
        }}
      />
    </div>
  );

  const endTimeElement = (
    <div>
      <label>終了</label>
      <DatePicker
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
        }}
      />
    </div>
  );

  const btnElement = (
    <div>
      <input
        type="button"
        value="キャンセル"
        onClick={() => {
          setInView(false);
        }}
      />
      <input type="button" value="保存" onClick={() => onAddEvent()} />
    </div>
  );

  const formElement = (
    <div
      className={inView ? `${classes.form} ${classes.inView}` : classes.form}
    >
      <form>
        <div>予定を入力</div>
        {titleElement}
        {startTimeElement}
        {endTimeElement}
        {btnElement}
      </form>
    </div>
  );
  return (
    <div>
      {coverElement}
      {formElement}
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
    </div>
  );
};

export default SampleCalendar;
