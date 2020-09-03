import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';
import formatValue from '../../utils/formatValue';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  multiline?: boolean;
  containerStyle?: {};
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
  max?: number;
}

const CurrencyInput: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, multiline, value, containerStyle = {}, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  function checkValue(value: string): string {
    const VALID = /^[1-9]{1}[0-9]*$/;
    const valueAbsTrunc = Math.trunc(Math.abs(Number(value)));
    if (
      Number(value) !== valueAbsTrunc ||
      !Number.isFinite(value) ||
      Number.isNaN(value)
    ) {
      throw new Error(`Invalid value property.`);
    }

    const valueDisplay = (Number(value) / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    if (!VALID.test(valueDisplay)) {
      return '';
    }
    const nextValue = parseInt(valueDisplay, 10);
    const max = Number.MAX_SAFE_INTEGER;

    if (nextValue > max) {
      return '';
    }

    return valueDisplay;
  }

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        let valueDisplay = checkValue(value);
        inputValueRef.current.value = formatValue(Number(valueDisplay));
        inputElementRef.current.setNativeProps({
          text: formatValue(Number(valueDisplay)),
        });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container style={containerStyle} isFocused={isFocused} isErrored={!!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#1f4ecf' : '#666360'}
      />

      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(CurrencyInput);
