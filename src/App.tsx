import "./App.css";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import { FFMPEG } from "./features/ffmpeg";
import { Cards } from "./components/card";
import { Console } from "./components/console";
import { UploadChangeParam, UploadFile } from "antd/lib/upload";
import { Icons } from "./components/icons";
import { Images } from "./components/images";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
let oldLog = window.console.log;

window.console.log = function (msg: any) {
  messages.push(msg);
  oldLog.apply(null);
};
let messages: string[] = [];

interface Logs {
  logs: Array<string> | null;
}

const App = (): JSX.Element => {
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState<File | null>(null);
  const [videoReady, setVReady] = useState(false);
  const [logs, setLogs] = useState<Logs>({ logs: null });
  const [status, setStatus] = useState(false);
  const [url, setUrl] = useState<string>("");

  const ffmpeg = FFMPEG.getInstance();

  // functions
  const load = async (): Promise<void> => {
    await ffmpeg.load();
    setReady(true);
  };

  const convert = async () => {
    const a: string = await ffmpeg.toGif(video as File);

    setUrl(a);
    setStatus(true);
  };

  useEffect(() => {
    load();
  }, []);

  return ready ? (
    <>
      <Cards
        video={video}
        func={(e: UploadChangeParam<UploadFile<any>>) => {
          setVideo(e.file.originFileObj as File);
          setVReady(true);
        }}
        convert={async () => convert()}
        videoReady={videoReady}
        converted={status}
        output={url}
      />
      <Console msg={messages} />
      <Icons icons={Images}></Icons>
      <div className="App"></div>
    </>
  ) : (
    <Spin indicator={antIcon} />
  );
};

export { App };
