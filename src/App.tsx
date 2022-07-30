import "./App.css";
import "antd/dist/antd.css";
import { Component, ReactNode } from "react";
import { FFMPEG } from "./features/ffmpeg";
import Cards from "./components/card";
import Console from "./components/console";
import { UploadChangeParam, UploadFile } from "antd/lib/upload";
import Icons from "./components/icons";

var oldLog = window.console.log;

window.console.log = function (msg: any) {
  messages.push(msg);
  oldLog.apply(null);
};
var messages: any[] = [];

type State = {
  ready: boolean;
  video?: File;
  gif?: string;
  prevLogs?: Array<string>;
  logs: Array<string>;
  videoReady: boolean;
  converted: boolean;
};

type Props = {};

export default class App extends Component<Props, State> {
  state: State = {
    ready: false,
    logs: messages,
    videoReady: false,
    converted: false,
  };

  constructor(props: Props) {
    super(props);
    this.loadFFMPEG();
  }

  async componentDidMount() {
    this.state.ready = true;
    this.logger();
  }

  // FFMPEG Instance
  static ffmpeg = FFMPEG.getInstance();

  async loadFFMPEG() {
    await App.ffmpeg.load();
  }

  logger() {
    App.ffmpeg.ffmpeg.setLogger((message) => {
      this.setState((prevState) => ({
        logs: [message.message, ...prevState.logs],
      }));
    });
  }

  async convert() {
    const a: string = (await App.ffmpeg.toGif(
      this.state.video as File
    )) as string;

    this.setState(() => ({
      gif: a,
      converted: true,
    }));

    if (!a) {
    }
  }

  // Render
  render(): ReactNode {
    return this.state.ready ? (
      <>
        <Cards
          video={this.state.video as File}
          func={(e: UploadChangeParam<UploadFile<any>>) =>
            this.setState(() => ({
              video: e.file.originFileObj,
              videoReady: true,
              converted: false,
            }))
          }
          convert={async () => this.convert()}
          videoReady={this.state.videoReady}
          converted={this.state.converted}
          output={this.state.gif}
        />
        <Console msg={messages} />
        <Icons></Icons>
        <div className="App"></div>
      </>
    ) : (
      <p>Loading...</p>
    );
  }
}
