import React from 'react';

const SelectComponent = ({ name, className, onChange, value, children }) => (
    <select name={name} className={className} onChange={onChange} value={value}>
        {children}
    </select>
);

export default SelectComponent;
