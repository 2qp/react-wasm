import { Component } from "react";
import { Input } from "antd";
const { TextArea } = Input;

type Props = {
  msg: Array<string>;
};

export default class Console extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        <TextArea
          style={{ backgroundColor: "#000000", color: "#4AF626" }}
          readOnly={true}
          rows={4}
          value={this.props.msg.map((msg, index) => msg)}
        />
      </>
    );
  }
}
