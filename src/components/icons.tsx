import { FC } from "react";

import Icon from "@ant-design/icons";

interface Props {
  icons: FC;
}

const Icons = (props: Props): JSX.Element => {
  return <Icon component={props.icons} />;
};

export { Icons };
