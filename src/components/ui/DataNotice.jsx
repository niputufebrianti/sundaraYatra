import Alert from "./Alert";

export default function DataNotice({ warning }) {
  if (!warning) return null;
  return <Alert jenis="warning">{warning}</Alert>;
}
