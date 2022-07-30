import { Component, ReactNode } from "react";
import reactLogo from "../assets/react2.svg";
import tsLogo from "../assets/ts.svg";
import ffmpegLogo from "../assets/ffmpeg.svg";
import Icon from "@ant-design/icons";

type State = {};

const archive = () => (
  <>
    <img src={reactLogo} />
    <img src={tsLogo} />
    <img src={ffmpegLogo} />
  </>
);

type Props = {};
export default class Icons extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render(): ReactNode {
    return <Icon component={archive} />;
  }
}
