import { Handle } from 'reactflow';

export const PrimaryNode = ({
  id,
  title,
  fields = [],
  handles = [],
  children,
  state,
  setState,
  containerStyle = {},
  containerRef = null,
}) => {
  const handleChange = (key, value) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: 200,
        border: '1px solid black',
        padding: 8,
        boxSizing: 'border-box',
        ...containerStyle,
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{title}</div>

      {fields.map(({ label, key, type, options, inputProps = {} }) => (
        <label key={key} style={{ display: 'block', marginBottom: 4 }}>
          {label}:
          {type === 'select' ? (
            <select
              value={state[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              {...inputProps}
            >
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              value={state[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              {...inputProps}
            />
          )}
        </label>
      ))}

      {children}

      {handles.map((h) => (
        <Handle
          key={h.id}
          type={h.type}
          position={h.position}
          id={`${id}-${h.id}`}
          style={h.style || {}}
        />
      ))}
    </div>
  );
};
