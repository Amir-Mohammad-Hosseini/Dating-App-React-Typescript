export default interface LoadingOverlayType {
  show: boolean;
  size?: "sm" | "md" | "lg";
};

export interface PageLoaderType {
  label?: string;
};

export type SpinnerSize = "sm" | "md" | "lg";


export interface SpinnerType {
  size?: SpinnerSize;
  className?: string;
};