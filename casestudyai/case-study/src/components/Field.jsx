export default function Field({ label, required, children }) {
  return <label className="field"><span>{label}{required && <i> *</i>}</span>{children}</label>
}
