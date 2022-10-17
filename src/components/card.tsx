import {
  DownloadOutlined,
  UploadOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Card, Skeleton, Upload, Image, message } from "antd";
import {
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/lib/upload/interface";

const { Meta } = Card;

interface Props {
  video: File | null;
  videoReady: boolean;
  converted: boolean;
  output: string;
  func: (e: UploadChangeParam<UploadFile<File>>) => void;
  convert: () => void;
}

const upload: UploadProps = {
  name: "file",
  action: "d",
};

const Cards = (props: Props): JSX.Element => {
  return (
    <>
      <Card
        style={{ width: 300, marginTop: 16 }}
        actions={[
          // Accessing parent setState from child

          <Upload
            showUploadList={false}
            {...upload}
            onChange={(e) => props.func(e)}
          >
            <UploadOutlined />
          </Upload>,

          <SendOutlined onClick={props.convert} key="convert" />,
          <DownloadOutlined
            onClick={
              props.converted
                ? () => download(props.output, "output_Gif")
                : error
            }
            key="save"
          />,
        ]}
      >
        <>
          {!props.videoReady ? (
            <Skeleton.Node fullSize={true} active></Skeleton.Node>
          ) : !props.converted ? (
            <video
              controls
              width="250"
              src={URL.createObjectURL(props.video as File)}
            ></video>
          ) : (
            <Image src={props.output} width="250" />
          )}
        </>
      </Card>
    </>
  );
};

const download = (url: string, filename: string): void => {
  fetch(url).then(async function (t) {
    let a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", filename);
    a.click();
  });
};

const error = () => {
  message.error("file isn't converted yet");
};

export { Cards };
