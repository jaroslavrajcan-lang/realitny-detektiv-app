export enum ViewState {
  LANDING = 'LANDING',
  FORM = 'FORM',
  QR = 'QR'
}

export interface NavProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export interface LandingProps {
  onNavigate: (view: ViewState) => void;
}
