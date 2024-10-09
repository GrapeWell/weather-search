export interface Props {
  radioList: { key: string; name: string }[];
  setActiveKey: (key: string) => void;
  activeKey: string;
}
