import { Input } from "antd";
const { TextArea } = Input;

interface Props {
  msg: Array<string>;
}

const Console = (props: Props): JSX.Element => {
  return (
    <>
      {" "}
      <TextArea
        style={{ backgroundColor: "#000000", color: "#4AF626" }}
        readOnly={true}
        rows={4}
        value={props.msg.map((msg, index) => msg)}
      />
    </>
  );
};

export { Console };
