import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  value: string,
  label: string,
  required: boolean,
  onChange?: (newValue: string) => void,
  type: string,
  placeholder: string, 
  minLength?: number,
};

export const TextField: React.FC<Props> = ({
  value,
  label,
  required = false,
  onChange = () => {},
  type,
  placeholder,
  minLength = 0
}) => {

  const [isValidValue, setIsValidValue] = useState(true);
  const [touched, setToched] = useState(false);
  const hasError = touched && required && !value;


  const handlerOnBlur = () => {
    const tel = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setToched(true);

    if (type === 'email') {
      setIsValidValue (email.test(value.toLowerCase()))
    };

    if (type === 'tel') {
      setIsValidValue(tel.test(value));
    }
  }

  return (
    <div className="
      field 
      animate__animated 
      animate__fadeIn 
      animate__delay"
    >
      <label className="label">{label}</label>
        <div className="control">
          <input 
            className={classNames('input', {
              'is-danger': hasError,
            })} 
            type={type} 
            placeholder={placeholder}
            minLength={minLength}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            required
            onBlur={() => handlerOnBlur()}
          />       
        </div>

        {(type === 'email'
          ? hasError || !isValidValue
          : type === 'tel'
              ? hasError || !isValidValue
              : hasError
          ) && (
            <p className="help is-danger">{`Not valid ${label.toLowerCase()}. Try '${placeholder}'`}</p>
          )
        }
      </div>
  );
};
