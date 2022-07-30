import React, { Component, ReactNode } from "react";
import {
  DownloadOutlined,
  createFromIconfontCN,
  UploadOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Card, Skeleton, Switch, Upload, Image } from "antd";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";

const { Meta } = Card;

type Props = {
  video: File;
  videoReady: boolean;
  converted: boolean;
  output?: string;
  func: (e: UploadChangeParam<UploadFile<any>>) => void;
  convert: () => void;
};

type State = {
  loading: boolean;
};

export default class Cards extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  state: State = {
    loading: true,
  };

  onChange(): void {
    this.setState((state) => ({
      loading: !state.loading,
    }));
  }

  download(url: string, filename: string): void {
    fetch(url).then(async function (t) {
      var a = document.createElement("a");
      a.href = url;
      a.setAttribute("download", filename);
      a.click();
    });
  }

  render(): ReactNode {
    return (
      <>
        <Card
          style={{ width: 300, marginTop: 16 }}
          actions={[
            // Accessing parent setState from child

            <Upload
              showUploadList={false}
              name="file"
              action={"d"}
              onChange={(e) => this.props.func(e)}
            >
              <UploadOutlined />
            </Upload>,

            <SendOutlined onClick={this.props.convert} key="convert" />,
            <DownloadOutlined
              onClick={() =>
                this.download(this.props.output as string, "output_Gif")
              }
              key="save"
            />,
          ]}
        >
          <>
            {!this.props.videoReady ? (
              <Skeleton.Node fullSize={true} active></Skeleton.Node>
            ) : !this.props.converted ? (
              <video
                controls
                width="250"
                src={URL.createObjectURL(this.props.video as File)}
              ></video>
            ) : (
              <Image src={this.props.output} width="250" />
            )}
          </>
        </Card>
      </>
    );
  }
}

/*


{this.props.video && (
    <video
      controls
      width="250"
      src={URL.createObjectURL(this.props.video as File)}
    ></video>
  )}

*/
