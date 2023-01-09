export default function SpinLoader({ loading }) {
  return (
    <div style={{ display: loading ? "block" : "none" }}>
      <div id="cover-spin"></div>
    </div>
  );
}
