import React, { useEffect } from 'react';
import { WidgetProps } from '../../types';
import { implementWidget } from '../../utils/widget';
import { Switch } from '@chakra-ui/react';

export const BooleanField: React.FC<WidgetProps> = props => {
  const { value, onChange } = props;

  useEffect(() => {
    if (value !== undefined && typeof value !== 'boolean') {
      onChange(false);
    }
  }, [value, onChange]);

  return (
    <Switch isChecked={value} onChange={evt => onChange(evt.currentTarget.checked)} />
  );
};

export default implementWidget({
  version: 'core/v1',
  metadata: {
    name: 'BooleanField',
  },
})(BooleanField);
