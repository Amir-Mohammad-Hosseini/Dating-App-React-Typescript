export default interface InputType {
  text: string;
  name: string;
  type: string;
  isForgotPassword?: boolean;
  placeholder: string;
}
export interface RangeInputType {
  text: string;
  name: string;
  min:number
  max:number
  extraDescription : string
  defaultValue?: string;
}