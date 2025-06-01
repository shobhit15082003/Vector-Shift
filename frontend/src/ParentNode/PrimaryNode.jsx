import { useState } from 'react';
import { Handle } from 'reactflow';
import { Position } from 'reactflow';

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
      className={`
        w-[200px] sm:w-[220px] border border-gray-300 dark:border-gray-600 p-2
        bg-white dark:bg-gray-800 rounded-lg shadow-sm
        transition-colors duration-200
        max-sm:w-[180px] max-sm:p-1.5
      `}
      style={containerStyle}
    >
      <div className="font-bold text-gray-800 dark:text-gray-100 mb-1 max-sm:text-sm">
        {title}
      </div>

      {fields.map(({ label, key, type, options, inputProps = {} }) => (
        <label key={key} className="block mb-1 text-sm text-gray-700 dark:text-gray-300 max-sm:text-xs">
          {label}
          {type === 'select' ? (
            <select
              className={`
                w-full mt-1 p-1 border border-gray-300 dark:border-gray-600 rounded
                bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
                focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                max-sm:text-xs max-sm:p-0.5
              `}
              value={state[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              {...inputProps}
            >
              {options.map((opt) => (
                <option key={opt} value={opt} className="dark:bg-gray-700">
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              className={`
                w-full mt-1 p-1 border border-gray-300 dark:border-gray-600 rounded
                bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
                focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                max-sm:text-xs max-sm:p-0.5
              `}
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
          className={`
            w-3 h-3 bg-blue-500 dark:bg-blue-400
            border-2 border-white dark:border-gray-800
            hover:bg-blue-600 dark:hover:bg-blue-500
            transition-colors duration-200
            max-sm:w-2.5 max-sm:h-2.5
          `}
          style={h.style || {}}
        />
      ))}
    </div>
  );
};

export const ToggleNode = ({ id, data }) => {
  const [state, setState] = useState({
    isEnabled: data?.isEnabled ?? true,
  });

  return (
    <PrimaryNode
      id={id}
      title="Toggle Node"
      state={state}
      setState={setState}
      fields={[
        { 
          label: 'Enabled', 
          key: 'isEnabled', 
          type: 'select', 
          options: ['true', 'false'],
          inputProps: { className: 'capitalize max-sm:text-xs' }
        },
      ]}
      handles={[
        { type: 'source', position: Position.Right, id: 'output' },
        { type: 'target', position: Position.Left, id: 'input' },
      ]}
    />
  );
};