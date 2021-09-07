function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const audio = document.getElementById('beep');

class App extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "state",






    {
      breakCount: 5,
      sessionCount: 25,
      clockCount: 25 * 60,
      currentTimer: 'Session',
      isPlaying: false });_defineProperty(this, "handlePlayPause",


    () => {
      const { isPlaying } = this.state;

      if (isPlaying) {
        clearInterval(this.loop);

        this.setState({
          isPlaying: false });

      } else
      {
        this.setState({
          isPlaying: true });

        this.loop = setInterval(() => {
          const { clockCount, currentTimer, breakCount, sessionCount } = this.state;

          if (clockCount === 0) {
            this.setState({
              currentTimer: currentTimer === 'Session' ? 'Break' : 'Session',
              clockCount: currentTimer === 'Session' ? breakCount * 60 : sessionCount * 60 });

            audio.play();
          } else
          {
            this.setState({
              clockCount: clockCount - 1 });

          }
        }, 1000);
      }
    });_defineProperty(this, "handleReset",

    () => {
      this.setState({
        breakCount: 5,
        sessionCount: 25,
        clockCount: 25 * 60,
        currentTimer: 'Session',
        isPlaying: false });

      clearInterval(this.loop);
      audio.pause();
      audio.currentTime = 0;
    });_defineProperty(this, "time",


    count => {
      let min = Math.floor(count / 60);
      let sec = count % 60;

      min = min < 10 ? '0' + min : min;
      sec = sec < 10 ? '0' + sec : sec;

      return `${min}:${sec}`;
    });_defineProperty(this, "handleLengthChange",
    (count, timerType) => {
      const {
        sessionCount,
        breakCount,
        isPlaying,
        currentTimer } =
      this.state;

      let newCount;

      if (timerType === 'session') {
        newCount = sessionCount + count;
      } else {
        newCount = breakCount + count;
      }

      if (newCount > 0 && newCount < 61 && !isPlaying) {
        this.setState({
          [`${timerType}Count`]: newCount });


        if (currentTimer.toLowerCase() === timerType) {
          this.setState({
            clockCount: newCount * 60 });

        }
      }
    });this.loop = undefined;}componentWillUnmount() {clearInterval(this.loop);}
  render() {

    const { breakCount, sessionCount, clockCount, currentTimer } = this.state;

    const breakprops = {
      title: 'Break',
      count: breakCount,
      handleDecrease: () => this.handleLengthChange(-1, 'break'),
      handleIncrease: () => this.handleLengthChange(1, 'break') };


    const sessionprops = {
      title: "Session",
      count: sessionCount,
      handleDecrease: () => this.handleLengthChange(-1, 'session'),
      handleIncrease: () => this.handleLengthChange(1, 'session') };


    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { className: "flex" }, /*#__PURE__*/
      React.createElement(SetTimer, breakprops), /*#__PURE__*/
      React.createElement(SetTimer, sessionprops)), /*#__PURE__*/

      React.createElement("div", { className: "clock-container" }, /*#__PURE__*/
      React.createElement("h1", { id: "timer-label" }, currentTimer), /*#__PURE__*/
      React.createElement("span", { id: "time-left" }, this.time(clockCount)), /*#__PURE__*/

      React.createElement("div", { className: "flex" }, /*#__PURE__*/
      React.createElement("button", { id: "start_stop", onClick: this.handlePlayPause }, /*#__PURE__*/
      React.createElement("i", { className: "fas fa-play" }, /*#__PURE__*/React.createElement("i", { className: "fas fa-pause" }))), /*#__PURE__*/


      React.createElement("button", { id: "reset", onClick: this.handleReset }, /*#__PURE__*/
      React.createElement("i", { className: "fas fa-sync-alt" }))))));





  }}

const SetTimer = props => {
  const idx = props.title.toLowerCase();
  return /*#__PURE__*/(
    React.createElement("div", { className: "timer-container" }, /*#__PURE__*/
    React.createElement("h1", { id: `${idx}-label` }, props.title, " Length"), /*#__PURE__*/
    React.createElement("div", { className: "flex button-wrapper" }, /*#__PURE__*/
    React.createElement("button", { id: `${idx}-decrement`, onClick: props.handleDecrease }, /*#__PURE__*/React.createElement("i", { className: "fas fa-arrow-down" })), /*#__PURE__*/
    React.createElement("span", { id: `${idx}-length` }, props.count), /*#__PURE__*/
    React.createElement("button", { id: `${idx}-increment`, onClick: props.handleIncrease }, /*#__PURE__*/React.createElement("i", { className: "fas fa-arrow-up" })))));



};
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));