/* eslint-disable import/no-anonymous-default-export */
import React, { Fragment } from 'react';
import { Field, FormSpy } from 'react-final-form';

class MyFieldAdapter extends React.Component {
  componentDidUpdate(prevProps) {
    // eslint-disable-next-line react/destructuring-assignment, react/prop-types
    if (this.props.meta.active && this.props.onChange) {
      // eslint-disable-next-line react/destructuring-assignment, react/prop-types
      this.props.onChange(this.props.input.value, prevProps.input.value);
    }
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment, react/prop-types
    return this.props.children;
  }
}

// Wrap the ExternalModificationDetector in a Field
// eslint-disable-next-line react/prop-types
export default ({ name, onChange, ...rest }) => (
  <Field
    name={name}
    subscription={{ value: true, active: true }}
    render={(props) => (
      <MyFieldAdapter
        {...props}
        onChange={onChange}
      >
        <Field
          name={name}
          {...rest}
        />
      </MyFieldAdapter>
    )}
  />
);
