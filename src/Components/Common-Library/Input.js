import React, { Component } from 'react'
import { Input } from 'antd'
import FormItem from './FormItem'

export class InputItem extends Component {
  constructor(){
    super()
  }

  onBlur = ()=>{
    this.props.onBlur && this.props.onBlur()
  }

  onChange = (e)=>{
    this.props.InputProps.onChange && this.props.InputProps.onChange(e.target.value)
    this.props.onAfterChange && this.props.onAfterChange(e.target.value)
  }

  render(){
    const { disabled, type, InputProps } = this.props
    const { ...rest } = InputProps
    const help = InputProps.help ? InputProps.help : ""
    return (
      <FormItem validateStatus={help?"error":null}  help={help}>
        <Input size='small' {...rest} type={type} disabled={disabled} onChange={this.onChange} onBlur={this.onBlur} />
      </FormItem>
    )
  }
}