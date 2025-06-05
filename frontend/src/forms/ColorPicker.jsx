import React from 'react';

const colors = [
  'purple', 'blue', 'green', 'red', 'indigo', 'pink', 'yellow', 'teal'
];

export default function ColorPicker({ selectedColor, onColorChange }) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <p className="text-sm text-gray-600">Select Accent Color:</p>
      {colors.map(color => (
        <button
          key={color}
          className={`w-6 h-6 rounded-full bg-${color}-500 border-2 ${selectedColor === color ? 'border-black' : 'border-transparent'}`}
          onClick={() => onColorChange(color)}
          title={color}
        />
      ))}
    </div>
  );
}
